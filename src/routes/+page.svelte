<script lang="ts">
	import Cube from '$lib/components/cube.svelte';
	import { createCubeData, key } from '$lib/cube-context';
	import { setContext } from 'svelte';
	import type { CubeLayer } from '../types/cube';
	const cubeData = createCubeData();

	setContext(key, cubeData);
	const { rotateTween, facesRotating, rotateDrag } = cubeData;

	function onMouseDown(ev: MouseEvent | TouchEvent) {
		if ($facesRotating.length > 0) return;
		let axis: 'A' | 'B' | undefined = undefined;
		let movementX = 0;
		let movementY = 0;
		let posibleLayersA: CubeLayer[] = ['top', 'middleY', 'down'],
			posibleLayersB: CubeLayer[];
		let yMultiplier = 1;
		let axisCalculator = (evMovementX: number, evMovementY: number) => {
			movementX += Math.abs(evMovementX);
			movementY += Math.abs(evMovementY);
			if (movementX > 10 || movementY > 10) {
				axis = movementX >= movementY ? 'A' : 'B';
				$facesRotating = axis === 'A' ? posibleLayersA : posibleLayersB;
			}
		};
		let clientX = 0

		let prevTochPosition = [0, 0];

		if (ev instanceof MouseEvent) {
			clientX = ev.clientX
		} else if (ev instanceof TouchEvent) {
			prevTochPosition = [ev.touches[0].clientX, ev.touches[0].clientY];
			clientX = ev.touches[0].clientX
		}
		
		if (clientX / globalThis.innerWidth < 0.5) {
			posibleLayersB = ['back', 'middleZ', 'front'];
			yMultiplier = -1;
		} else {
			posibleLayersB = ['left', 'middleX', 'right'];
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
				rotateTween.update((curr) => curr + movement / 5);
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

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main
	class="w-screen h-screen"
	on:mousedown|preventDefault|stopPropagation={onMouseDown}
	on:touchstart|preventDefault|stopPropagation={onMouseDown}
>
	<Cube />
</main>

<style>
	main {
		transform-style: preserve-3d;
		perspective: 3000px;
	}
</style>
