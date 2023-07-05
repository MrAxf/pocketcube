<script lang="ts">
	import { getContext } from 'svelte';
	import CubeFace from './cube-face.svelte';
	import { key, type CubeContextData } from '$lib/cube-context';
	import type { CubeLayer } from '../../types/cube';

	export let x = 0;
	export let y = 0;
	export let z = 0;

	let rotationX = 0;
	let rotationY = 0;
	let rotationZ = 0;

	const facesOrientations = ['top', 'down', 'front', 'back', 'left', 'right'] as (
		| 'top'
		| 'down'
		| 'front'
		| 'back'
		| 'left'
		| 'right'
	)[];

	const { cubeFaces, rotateTween, facesRotating, rotateDrag } = getContext<CubeContextData>(key);

	let faces: (string | undefined)[] = [];

	cubeFaces.subscribe((cubeFaces) => {
		faces = [
			y === -1 ? cubeFaces.top[z + 1][x + 1] : undefined, //Top
			y === 1 ? cubeFaces.down[2 - (z + 1)][x + 1] : undefined, //Down
			z === 1 ? cubeFaces.front[y + 1][x + 1] : undefined, //Front
			z === -1 ? cubeFaces.back[y + 1][2 - (x + 1)] : undefined, //Back
			x === -1 ? cubeFaces.left[y + 1][z + 1] : undefined, //left
			x === 1 ? cubeFaces.right[y + 1][2 - (z + 1)] : undefined //right
		];
	});

	rotateTween.subscribe((rotateTween) => {
		if (
			(y === -1 && $facesRotating.includes('top')) ||
			(y === 0 && $facesRotating.includes('middleY')) ||
			(y === 1 && $facesRotating.includes('down'))
		) {
			rotationY = rotateTween;
		} else if (
			(z === 1 && $facesRotating.includes('front')) ||
			(z === 0 && $facesRotating.includes('middleZ')) ||
			(z === -1 && $facesRotating.includes('back'))
		) {
			rotationZ = rotateTween;
		} else if (
			(x === -1 && $facesRotating.includes('left')) ||
			(x === 0 && $facesRotating.includes('middleX')) ||
			(x === 1 && $facesRotating.includes('right'))
		) {
			rotationX = -rotateTween;
		}
	});

	function onMouseDown(ev: Event) {
		if ($facesRotating.length > 0) return;
		let axis: 'A' | 'B' | undefined = undefined;
		let movementX = 0;
		let movementY = 0;
		let face = (ev.target as HTMLDivElement).getAttribute('data-face');
		let posibleLayerA: CubeLayer, posibleLayerB: CubeLayer;
		let yMultiplier = 1;
		let axisCalculator = (evMovementX: number, evMovementY: number) => {
			movementX += Math.abs(evMovementX);
			movementY += Math.abs(evMovementY);
			if (movementX > 10 || movementY > 10) {
				axis = movementX >= movementY ? 'A' : 'B';
				$facesRotating = [axis === 'A' ? posibleLayerA : posibleLayerB];
			}
		};
		if (face === 'left') {
			posibleLayerA = ['top', 'middleY', 'down'][y + 1] as CubeLayer;
			posibleLayerB = ['back', 'middleZ', 'front'][z + 1] as CubeLayer;
			yMultiplier = -1;
		} else if (face === 'front') {
			posibleLayerA = ['top', 'middleY', 'down'][y + 1] as CubeLayer;
			posibleLayerB = ['left', 'middleX', 'right'][x + 1] as CubeLayer;
		} else if (face === 'top') {
			posibleLayerA = ['back', 'middleZ', 'front'][z + 1] as CubeLayer;
			posibleLayerB = ['left', 'middleX', 'right'][x + 1] as CubeLayer;
			axisCalculator = (evMovementX: number, evMovementY: number) => {
				movementX += evMovementX;
				movementY += evMovementY;
				if (Math.abs(movementX) > 10 || Math.abs(movementY) > 10) {
					axis = movementX * movementY < 0 ? 'A' : 'B';
					$facesRotating = [axis === 'A' ? posibleLayerA : posibleLayerB];
				}
			};
		}
		let prevTochPosition = [0, 0];

		if (ev instanceof TouchEvent) {
			prevTochPosition = [
				ev.touches[0].clientX,
				ev.touches[0].clientY
			]
		}

		const onMouseMove = (ev: MouseEvent | TouchEvent) => {
			let evMovementX = 0;
			let evMovementY = 0;
			if (ev instanceof MouseEvent) {
				ev.preventDefault();

				evMovementX = ev.movementX;
				evMovementY = ev.movementY;
			} else if (ev instanceof TouchEvent) {
				evMovementX = ev.touches[0].clientX - prevTochPosition[0];
				evMovementY = ev.touches[0].clientY - prevTochPosition[1];
			}
			if (!axis) {
				axisCalculator(evMovementX, evMovementY);
			} else {
				const movement = axis === 'A' ? evMovementX : yMultiplier * evMovementY;
				rotateTween.update((curr) => curr + movement / 2.5);
			}
			if (ev instanceof TouchEvent) {
				prevTochPosition = [ev.touches[0].clientX, ev.touches[0].clientY];
			}
		};
		const onMouseUp = (ev: Event) => {
			ev.preventDefault();
			rotateDrag($facesRotating, $rotateTween);
			if (ev instanceof MouseEvent) {
				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp);
			} else {
				document.removeEventListener('touchmove', onMouseMove);
				document.removeEventListener('touchend', onMouseUp);
			}
		};

		if (ev instanceof MouseEvent) {
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		} else {
			document.addEventListener('touchmove', onMouseMove);
			document.addEventListener('touchend', onMouseUp);
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:mousedown|preventDefault|stopPropagation={onMouseDown}
	on:touchstart|preventDefault|stopPropagation={onMouseDown}
	class="cube-piece cursor-pointer"
	style="
        --translationX: calc(var(--cube-size) * {x});
        --translationY: calc(var(--cube-size) * {y});
        --translationZ: calc(var(--cube-size) * {z});

		--rotationX: {rotationX}deg;
        --rotationY: {rotationY}deg;
        --rotationZ: {rotationZ}deg;
    "
>
	{#each faces as face, i}
		<CubeFace sticker={face} orientation={facesOrientations[i]} />
	{/each}
</div>

<style lang="postcss">
	.cube-piece {
		position: absolute;
		transform-origin: center;
		transform-style: preserve-3d;
		width: var(--cube-size);
		height: var(--cube-size);
		transform: rotateX(var(--rotationX)) rotateY(var(--rotationY)) rotateZ(var(--rotationZ))
			translate3d(var(--translationX), var(--translationY), var(--translationZ));
	}
</style>
