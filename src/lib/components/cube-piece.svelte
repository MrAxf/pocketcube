<script lang="ts">
	import { getContext } from 'svelte';
	import CubeFace from './cube-face.svelte';
	import { key, type CubeContextData } from '$lib/cube-context';

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

	const { cubeFaces, rotateTween, facesRotating } = getContext<CubeContextData>(key);

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
			rotationY = rotateTween
		} else if (
			(z === 1 && $facesRotating.includes('front')) ||
			(z === 0 && $facesRotating.includes('middleZ')) ||
			(z === -1 && $facesRotating.includes('back'))
		) {
			rotationZ = rotateTween
		} else if (
			(x === -1 && $facesRotating.includes('left')) ||
			(x === 0 && $facesRotating.includes('middleX')) ||
			(x === 1 && $facesRotating.includes('right'))
		) {
			rotationX = -rotateTween
		}
	});
</script>

<div
	class="cube-piece"
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
