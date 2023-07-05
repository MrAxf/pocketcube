<script lang="ts">
	import CubePiece from '$lib/components/cube-piece.svelte';
	import { DEG30, DEG360, DEG45 } from '$lib/utils/matrix';

	let rotationX = DEG360 - DEG30;
	let rotationY = DEG45;
	let rotationZ = 0;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="cube"
	style="
        --rotation-x: {rotationX}rad;
        --rotation-y: {rotationY}rad;
        --rotation-z: {rotationZ}rad;
    "
>
	<!-- Top  -->
	<CubePiece x={-1} y={-1} z={-1} />
	<CubePiece x={-1} y={-1} z={0} />
	<CubePiece x={-1} y={-1} z={1} />
	<CubePiece x={0} y={-1} z={-1} />
	<CubePiece x={0} y={-1} z={0} />
	<CubePiece x={0} y={-1} z={1} />
	<CubePiece x={1} y={-1} z={-1} />
	<CubePiece x={1} y={-1} z={0} />
	<CubePiece x={1} y={-1} z={1} />

	<!-- Mid -->
	<CubePiece x={-1} y={0} z={-1} />
	<CubePiece x={-1} y={0} z={0} />
	<CubePiece x={-1} y={0} z={1} />
	<CubePiece x={0} y={0} z={-1} />
	<CubePiece x={0} y={0} z={1} />
	<CubePiece x={1} y={0} z={-1} />
	<CubePiece x={1} y={0} z={0} />
	<CubePiece x={1} y={0} z={1} />

	<!-- Bot -->
	<CubePiece x={-1} y={1} z={-1} />
	<CubePiece x={-1} y={1} z={0} />
	<CubePiece x={-1} y={1} z={1} />
	<CubePiece x={0} y={1} z={-1} />
	<CubePiece x={0} y={1} z={0} />
	<CubePiece x={0} y={1} z={1} />
	<CubePiece x={1} y={1} z={-1} />
	<CubePiece x={1} y={1} z={0} />
	<CubePiece x={1} y={1} z={1} />
</div>

<style lang="postcss">
	.cube {
		position: absolute;
		transform-origin: center;
		transform-style: preserve-3d;
		width: var(--cube-size);
		height: var(--cube-size);
		--rotation-x: 0deg;
		--rotation-y: 0deg;
		--rotation-z: 0deg;
		transform: translateX(calc(50vw - calc(var(--cube-size) / 2)))
			translateY(calc(50vh - calc(var(--cube-size) / 2))) rotateX(var(--rotation-x))
			rotateY(var(--rotation-y)) rotateZ(var(--rotation-z));
	}
</style>
