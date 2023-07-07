<script lang="ts">
	import { DEG180, DEG270, DEG90 } from "$lib/utils/matrix";
	import type { FaceOrientation } from "../../types/cube";

	export let orientation: FaceOrientation;
	export let sticker: string | undefined

	let rotationX = 0;
	let rotationY = 0;

	switch (orientation) {
		case 'top':
			rotationX = DEG90;
			break;

		case 'down':
			rotationX = DEG270;
			break;

		case 'back':
			rotationY = DEG180;
			break;

		case 'left':
			rotationY = DEG270;
			break;

		case 'right':
			rotationY = DEG90;
			break;

		default:
			break;
	}
</script>

<div
	class="cube-face"
	style="
        --rotation-x: {rotationX}rad;
        --rotation-y: {rotationY}rad;
    "
	data-face={orientation}
>
	{#if sticker}
		<div class="cube-sticker" style="--sticker-color: var(--cube-color-{sticker})" />
	{/if}
</div>

<style lang="postcss">
	.cube-face {
		position: absolute;
		background-color: var(--cube-background);
		width: var(--cube-size);
		height: var(--cube-size);
		--rotation-x: 0rad;
		--rotation-y: 0rad;
		--rotation-z: 0rad;
        transform-origin: center;
        transform-style: preserve-3d;
		transform: rotateX(var(--rotation-x)) rotateY(var(--rotation-y)) translateZ(calc(var(--cube-size) / 2));

		& .cube-sticker {
			pointer-events: none;
			width: 80%;
			height: 80%;
			margin: 10%;
			--sticker-color: green;
			background-color: var(--sticker-color);
			border-radius: 10%;
		}
	}
</style>
