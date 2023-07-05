<script lang="ts">
	import CubePiece from '$lib/components/cube-piece.svelte';
	import { createCubeData, key } from '$lib/cube-context';
	import {
		DEG30,
		DEG360,
		DEG45,
	} from '$lib/utils/matrix';
	import { setContext } from 'svelte';

	const cubeData = createCubeData();

	setContext(key, cubeData);

	let rotationX = DEG360 - DEG30;
	let rotationY = DEG45;
	let rotationZ = 0;
</script>

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

{#if false}
	<label for="angleX" />
	<input id="angleX" type="range" min={-DEG360} max={DEG360} step="0.01" bind:value={rotationX} />

	<label for="angleY" />
	<input id="angleY" type="range" min={-DEG360} max={DEG360} step="0.01" bind:value={rotationY} />

	<label for="angleZ" />
	<input id="angleZ" type="range" min={-DEG360} max={DEG360} step="0.01" bind:value={rotationZ} />

	<button
		on:click={() => {
			cubeData.rotate(['top'], false);
		}}>RotateTopF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['top'], true);
		}}>RotateTopR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['middleY'], false);
		}}>RotateMidYF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['middleY'], true);
		}}>RotateMidYR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['down'], false);
		}}>RotateBotF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['down'], true);
		}}>RotateBotR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['front'], false);
		}}>RotateFrontF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['front'], true);
		}}>RotateFrontR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['middleZ'], false);
		}}>RotateMidZF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['middleZ'], true);
		}}>RotateMidZR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['back'], false);
		}}>RotateBackF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['back'], true);
		}}>RotateBackR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['left'], false);
		}}>RotateLeftF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['left'], true);
		}}>RotateLeftR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['middleX'], false);
		}}>RotateMidF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['middleX'], true);
		}}>RotateMidR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['right'], false);
		}}>RotateRightF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['right'], true);
		}}>RotateRightR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['top', 'middleY', 'down'], false);
		}}>RotateCubeYF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['top', 'middleY', 'down'], true);
		}}>RotateCubeYR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['front', 'middleZ', 'back'], false);
		}}>RotateCubeZF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['front', 'middleZ', 'back'], true);
		}}>RotateCubeZR</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['left', 'middleX', 'right'], false);
		}}>RotateCubeXF</button
	>
	<button
		on:click={() => {
			cubeData.rotate(['left', 'middleX', 'right'], true);
		}}>RotateCubeXR</button
	>
{/if}

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
