<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';

	const list = [
		{
			name: 'Home',
			url: '/doctor'
		},
		{
			name: 'Durgs',
			url: '/doctor/drugs'
		}
	];
</script>

<svelte:head>
	<title>Docker | npmg</title>
</svelte:head>

<main class="bg-deemWhite">
	<Sidebar {list} />
	<slot />
</main>
