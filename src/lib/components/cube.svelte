<script lang="ts">
	import CubePiece from '$lib/components/cube-piece.svelte';
	import { createCubeData, key } from '$lib/cube-context';
	import {
	DEG180,
		DEG30,
		DEG360,
		DEG45,
		DEG90,
		anglesFromMatrix,
		multiply,
		rotation3Dmatrix
	} from '$lib/utils/matrix';
	import { setContext } from 'svelte';

	const cubeData = createCubeData();

	setContext(key, cubeData);

	let rotationX = DEG360 - DEG30;
	let rotationY = DEG45;
	let rotationZ = 0;

	const rotateTop =
		(reverse: 1 | -1 = 1) =>
		() => {
			cubeData.pieces.forEach((value, key) => {
				if (key.includes('t'))
					value.update((old) => {
						const angles = anglesFromMatrix(
							multiply(
								rotation3Dmatrix(old.rotationX, old.rotationY, old.rotationZ),
								rotation3Dmatrix(0, DEG45 * reverse, 0),
							)
						);
						console.log(angles);
						
						return angles
					});
			});
		};
</script>

<div
	class="cube"
	style="
        --rotation-x: {rotationX}rad;
        --rotation-y: {rotationY}rad;
        --rotation-z: {rotationZ}rad;
    "
>
	<CubePiece front top left />
	<CubePiece front top />
	<CubePiece front top right />
	<CubePiece front left />
	<CubePiece front />
	<CubePiece front right />
	<CubePiece front down left />
	<CubePiece front down />
	<CubePiece front down right />
	<CubePiece top left />
	<CubePiece top />
	<CubePiece top right />
	<CubePiece left />
	<CubePiece right />
	<CubePiece down left />
	<CubePiece down />
	<CubePiece down right />
	<CubePiece back top left />
	<CubePiece back top />
	<CubePiece back top right />
	<CubePiece back left />
	<CubePiece back />
	<CubePiece back right />
	<CubePiece back down left />
	<CubePiece back down />
	<CubePiece back down right />
</div>

<label for="angleX" />
<input id="angleX" type="range" min="0" max={DEG360} step="0.01" bind:value={rotationX} />

<label for="angleY" />
<input id="angleY" type="range" min="0" max={DEG360} step="0.01" bind:value={rotationY} />

<label for="angleZ" />
<input id="angleZ" type="range" min="0" max={DEG360} step="0.01" bind:value={rotationZ} />

<button on:click={rotateTop()}>Rotate top</button>
<button on:click={rotateTop(-1)}>Rotate top Reverse</button>

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
		transform: translateX(50vw) translateY(50vh) rotateX(var(--rotation-x))
			rotateY(var(--rotation-y)) rotateZ(var(--rotation-z));
	}
</style>
