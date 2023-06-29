<script>
	import Cube from '$lib/components/cube.svelte';
</script>

<main class="w-screen h-screen transfor">
	<Cube />
</main>

<style>
	main {
		transform-style: preserve-3d;
		perspective: 3000px;
	}
</style>
