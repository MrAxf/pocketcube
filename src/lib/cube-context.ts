import { tweened, type Tweened } from 'svelte/motion';
import { writable, type Writable } from 'svelte/store';
import type { CubeLayer } from '../types/cube';
import nearestMultipleOf90 from './utils/nearesMultipleOf90';
import repeat from './utils/repeat';

interface CubePiece {
	rotationX: number;
	rotationY: number;
	rotationZ: number;
}

interface CubeContextData {
	cubeFaces: Writable<{ [key: string]: string[][] }>;
	facesRotating: Writable<CubeLayer[]>;
	rotateTween: Tweened<number>;
	rotate: (faces: CubeLayer[], reverse: boolean, duration?: number) => void;
	rotateDrag: (faces: CubeLayer[], rotation: number) => void;
}

const key = Symbol();

const createCubeData = (): CubeContextData => {
	const cubeFaces = writable({
		top: [
			['top', 'top', 'top'],
			['top', 'top', 'top'],
			['top', 'top', 'top']
		],
		down: [
			['down', 'down', 'down'],
			['down', 'down', 'down'],
			['down', 'down', 'down']
		],
		front: [
			['front', 'front', 'front'],
			['front', 'front', 'front'],
			['front', 'front', 'front']
		],
		back: [
			['back', 'back', 'back'],
			['back', 'back', 'back'],
			['back', 'back', 'back']
		],
		left: [
			['left', 'left', 'left'],
			['left', 'left', 'left'],
			['left', 'left', 'left']
		],
		right: [
			['right', 'right', 'right'],
			['right', 'right', 'right'],
			['right', 'right', 'right']
		]
	});

	const facesRotating = writable<CubeLayer[]>([]);

	let isRotating = false;

	const rotateTween = tweened(0, {
		duration: 0
	});

	const rotateFns = Object.freeze({
		top(reverse = false) {
			cubeFaces.update((cubeFaces) => {
				const newCubeFaces = structuredClone(cubeFaces);
				const {
					right: [r0],
					front: [f0],
					left: [l0],
					back: [b0],
					top: [t0, t1, t2]
				} = cubeFaces;
				const { front, left, back, right } = newCubeFaces;

				if (reverse) {
					newCubeFaces.top = [
						[t2[0], t1[0], t0[0]],
						[t2[1], t1[1], t0[1]],
						[t2[2], t1[2], t0[2]]
					];
					[front[0], left[0], back[0], right[0]] = [r0, f0, l0, b0];
				} else {
					newCubeFaces.top = [
						[t0[2], t1[2], t2[2]],
						[t0[1], t1[1], t2[1]],
						[t0[0], t1[0], t2[0]]
					];
					[front[0], left[0], back[0], right[0]] = [l0, b0, r0, f0];
				}

				return newCubeFaces;
			});
		},
		middleY(reverse = false) {
			cubeFaces.update((cubeFaces) => {
				const newCubeFaces = structuredClone(cubeFaces);

				const {
					right: [, r1],
					front: [, f1],
					left: [, l1],
					back: [, b1]
				} = cubeFaces;
				const { front, left, back, right } = newCubeFaces;

				if (reverse) {
					[front[1], left[1], back[1], right[1]] = [r1, f1, l1, b1];
				} else {
					[front[1], left[1], back[1], right[1]] = [l1, b1, r1, f1];
				}

				return newCubeFaces;
			});
		},
		down(reverse = false) {
			cubeFaces.update((cubeFaces) => {
				const newCubeFaces = structuredClone(cubeFaces);

				const {
					right: [, , r2],
					front: [, , f2],
					left: [, , l2],
					back: [, , b2],
					down: [d0, d1, d2]
				} = cubeFaces;
				const { front, left, back, right } = newCubeFaces;

				if (reverse) {
					newCubeFaces.down = [
						[d0[2], d1[2], d2[2]],
						[d0[1], d1[1], d2[1]],
						[d0[0], d1[0], d2[0]]
					];
					[front[2], left[2], back[2], right[2]] = [r2, f2, l2, b2];
				} else {
					newCubeFaces.down = [
						[d2[0], d1[0], d0[0]],
						[d2[1], d1[1], d0[1]],
						[d2[2], d1[2], d0[2]]
					];
					[front[2], left[2], back[2], right[2]] = [l2, b2, r2, f2];
				}

				return newCubeFaces;
			});
		},
		front(reverse = false) {
			cubeFaces.update((cubeFaces) => {
				const newCubeFaces = structuredClone(cubeFaces);
				const {
					front: [f0, f1, f2],
					right: [r0, r1, r2],
					top: [, , t2],
					left: [l0, l1, l2],
					down: [d0]
				} = cubeFaces;
				const { top, left, down, right } = newCubeFaces;

				if (reverse) {
					newCubeFaces.front = [
						[f0[2], f1[2], f2[2]],
						[f0[1], f1[1], f2[1]],
						[f0[0], f1[0], f2[0]]
					];

					top[2] = [r0[0], r1[0], r2[0]];
					[left[0][2], left[1][2], left[2][2]] = [t2[2], t2[1], t2[0]];
					down[0] = [l0[2], l1[2], l2[2]];
					[right[0][0], right[1][0], right[2][0]] = [d0[2], d0[1], d0[0]];
				} else {
					newCubeFaces.front = [
						[f2[0], f1[0], f0[0]],
						[f2[1], f1[1], f0[1]],
						[f2[2], f1[2], f0[2]]
					];

					top[2] = [l2[2], l1[2], l0[2]];
					[left[0][2], left[1][2], left[2][2]] = d0;
					down[0] = [r2[0], r1[0], r0[0]];
					[right[0][0], right[1][0], right[2][0]] = t2;
				}
				return newCubeFaces;
			});
		},
		middleZ(reverse = false) {
			cubeFaces.update((cubeFaces) => {
				const newCubeFaces = structuredClone(cubeFaces);
				const {
					right: [r0, r1, r2],
					top: [, t1],
					left: [l0, l1, l2],
					down: [, d1]
				} = cubeFaces;
				const { top, left, down, right } = newCubeFaces;

				if (reverse) {
					top[1] = [r0[1], r1[1], r2[1]];
					[left[0][1], left[1][1], left[2][1]] = [t1[2], t1[1], t1[0]];
					down[1] = [l0[1], l1[1], l2[1]];
					[right[0][1], right[1][1], right[2][1]] = [d1[2], d1[1], d1[0]];
				} else {
					top[1] = [l2[1], l1[1], l0[1]];
					[left[0][1], left[1][1], left[2][1]] = d1;
					down[1] = [r2[1], r1[1], r0[1]];
					[right[0][1], right[1][1], right[2][1]] = t1;
				}
				return newCubeFaces;
			});
		},
		back(reverse = false) {
			cubeFaces.update((cubeFaces) => {
				const newCubeFaces = structuredClone(cubeFaces);
				const {
					back: [b0, b1, b2],
					right: [r0, r1, r2],
					top: [t0],
					left: [l0, l1, l2],
					down: [, , d2]
				} = cubeFaces;
				const { top, left, down, right } = newCubeFaces;

				if (reverse) {
					newCubeFaces.back = [
						[b2[0], b1[0], b0[0]],
						[b2[1], b1[1], b0[1]],
						[b2[2], b1[2], b0[2]]
					];

					top[0] = [r0[2], r1[2], r2[2]];
					[left[0][0], left[1][0], left[2][0]] = [t0[2], t0[1], t0[0]];
					down[2] = [l0[0], l1[0], l2[0]];
					[right[0][2], right[1][2], right[2][2]] = [d2[2], d2[1], d2[0]];
				} else {
					newCubeFaces.back = [
						[b0[2], b1[2], b2[2]],
						[b0[1], b1[1], b2[1]],
						[b0[0], b1[0], b2[0]]
					];

					top[0] = [l2[0], l1[0], l0[0]];
					[left[0][0], left[1][0], left[2][0]] = d2;
					down[2] = [r2[2], r1[2], r0[2]];
					[right[0][2], right[1][2], right[2][2]] = t0;
				}
				return newCubeFaces;
			});
		},
		left(reverse = false) {
			cubeFaces.update((cubeFaces) => {
				const newCubeFaces = structuredClone(cubeFaces);
				const {
					left: [l0, l1, l2],
					front: [f0, f1, f2],
					back: [b0, b1, b2],
					top: [t0, t1, t2],
					down: [d0, d1, d2]
				} = cubeFaces;
				const { top, down, back, front } = newCubeFaces;

				if (reverse) {
					newCubeFaces.left = [
						[l0[2], l1[2], l2[2]],
						[l0[1], l1[1], l2[1]],
						[l0[0], l1[0], l2[0]]
					];

					[front[0][0], front[1][0], front[2][0]] = [d0[0], d1[0], d2[0]];
					[down[0][0], down[1][0], down[2][0]] = [b2[2], b1[2], b0[2]];
					[back[0][2], back[1][2], back[2][2]] = [t2[0], t1[0], t0[0]];
					[top[0][0], top[1][0], top[2][0]] = [f0[0], f1[0], f2[0]];
				} else {
					newCubeFaces.left = [
						[l2[0], l1[0], l0[0]],
						[l2[1], l1[1], l0[1]],
						[l2[2], l1[2], l0[2]]
					];

					[front[0][0], front[1][0], front[2][0]] = [t0[0], t1[0], t2[0]];
					[down[0][0], down[1][0], down[2][0]] = [f0[0], f1[0], f2[0]];
					[back[0][2], back[1][2], back[2][2]] = [d2[0], d1[0], d0[0]];
					[top[0][0], top[1][0], top[2][0]] = [b2[2], b1[2], b0[2]];
				}
				return newCubeFaces;
			});
		},
		middleX(reverse = false) {
			cubeFaces.update((cubeFaces) => {
				const newCubeFaces = structuredClone(cubeFaces);
				const {
					front: [f0, f1, f2],
					back: [b0, b1, b2],
					top: [t0, t1, t2],
					down: [d0, d1, d2]
				} = cubeFaces;
				const { top, down, back, front } = newCubeFaces;

				if (reverse) {
					[front[0][1], front[1][1], front[2][1]] = [d0[1], d1[1], d2[1]];
					[down[0][1], down[1][1], down[2][1]] = [b2[1], b1[1], b0[1]];
					[back[0][1], back[1][1], back[2][1]] = [t2[1], t1[1], t0[1]];
					[top[0][1], top[1][1], top[2][1]] = [f0[1], f1[1], f2[1]];
				} else {
					[front[0][1], front[1][1], front[2][1]] = [t0[1], t1[1], t2[1]];
					[down[0][1], down[1][1], down[2][1]] = [f0[1], f1[1], f2[1]];
					[back[0][1], back[1][1], back[2][1]] = [d2[1], d1[1], d0[1]];
					[top[0][1], top[1][1], top[2][1]] = [b2[1], b1[1], b0[1]];
				}
				return newCubeFaces;
			});
		},
		right(reverse = false) {
			cubeFaces.update((cubeFaces) => {
				const newCubeFaces = structuredClone(cubeFaces);
				const {
					right: [r0, r1, r2],
					front: [f0, f1, f2],
					back: [b0, b1, b2],
					top: [t0, t1, t2],
					down: [d0, d1, d2]
				} = cubeFaces;
				const { top, down, back, front } = newCubeFaces;

				if (reverse) {
					newCubeFaces.right = [
						[r2[0], r1[0], r0[0]],
						[r2[1], r1[1], r0[1]],
						[r2[2], r1[2], r0[2]]
					];

					[front[0][2], front[1][2], front[2][2]] = [d0[2], d1[2], d2[2]];
					[down[0][2], down[1][2], down[2][2]] = [b2[0], b1[0], b0[0]];
					[back[0][0], back[1][0], back[2][0]] = [t2[2], t1[2], t0[2]];
					[top[0][2], top[1][2], top[2][2]] = [f0[2], f1[2], f2[2]];
				} else {
					newCubeFaces.right = [
						[r0[2], r1[2], r2[2]],
						[r0[1], r1[1], r2[1]],
						[r0[0], r1[0], r2[0]]
					];

					[front[0][2], front[1][2], front[2][2]] = [t0[2], t1[2], t2[2]];
					[down[0][2], down[1][2], down[2][2]] = [f0[2], f1[2], f2[2]];
					[back[0][0], back[1][0], back[2][0]] = [d2[2], d1[2], d0[2]];
					[top[0][2], top[1][2], top[2][2]] = [b2[0], b1[0], b0[0]];
				}
				return newCubeFaces;
			});
		}
	});

	const rotate = async (faces: CubeLayer[], reverse = false, duration = 500) => {
		if (isRotating) return;
		isRotating = true;
		facesRotating.set(faces);
		await rotateTween.set(reverse ? -90 : 90, { duration });
		rotateTween.set(0);
		try {
			faces.forEach((face) => {
				rotateFns[face](reverse);
			});
		} catch (error) {
			console.error(error, faces, rotateFns);

		} finally {
			facesRotating.set([]);
			isRotating = false;
		}
	};

	const rotateDrag = async (faces: CubeLayer[], rotation: number) => {
		if (isRotating) return;
		isRotating = true;
		const toRotation = nearestMultipleOf90(rotation);
		const reverse = rotation < 0;
		const rotations = Math.abs(toRotation / 90);
		await rotateTween.set(toRotation, { duration: (Math.abs(toRotation - rotation) * 50) / 9 });
		rotateTween.set(0);
		faces.forEach((face) => {
			repeat(() => {
				rotateFns[face](reverse);
			}, rotations);
		});
		facesRotating.set([]);
		isRotating = false;
	};

	return {
		cubeFaces,
		facesRotating,
		rotateTween,
		rotate,
		rotateDrag
	};
};

export { key, createCubeData };
export type { CubePiece, CubeContextData };
