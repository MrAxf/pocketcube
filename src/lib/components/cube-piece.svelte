<script lang="ts">
	import { getContext } from 'svelte';
	import CubeFace from './cube-face.svelte';
	import { key, type CubeContextData } from '$lib/cube-context';

    export let front = false
    export let back = false
    export let top = false
    export let down = false
    export let left = false
    export let right = false

    let translateX = (Number(right) - Number(left))
    let translateY = (Number(down) - Number(top))
    let translateZ = (Number(front) - Number(back))

	const { getPiece } = getContext<CubeContextData>(key)
	let piece = getPiece([front, back, top, down, left, right])
</script>

<div
	class="cube-piece" style="
        --translationX: calc(var(--cube-size) * {translateX});
        --translationY: calc(var(--cube-size) * {translateY});
        --translationZ: calc(var(--cube-size) * {translateZ});

		--rotationX: {$piece?.rotationX || 0}rad;
        --rotationY: {$piece?.rotationY || 0}rad;
        --rotationZ: {$piece?.rotationZ || 0}rad;
    "
>
	<CubeFace showSticker={top} orientation="top" />
	<CubeFace showSticker={down} orientation="down" />
	<CubeFace showSticker={front} orientation="front" />
	<CubeFace showSticker={back} orientation="back" />
	<CubeFace showSticker={left} orientation="left" />
	<CubeFace showSticker={right} orientation="right" />
</div>

<style lang="postcss">
	.cube-piece {
		position: absolute;
		transform-origin: center;
		transform-style: preserve-3d;
		width: var(--cube-size);
		height: var(--cube-size);
        transform:
			rotateX(var(--rotationX)) 
			rotateY(var(--rotationY)) 
			rotateZ(var(--rotationZ)) 
			translate3d(var(--translationX), var(--translationY), var(--translationZ));
	}
</style>
