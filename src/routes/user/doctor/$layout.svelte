<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';

	const list = [
		{
			name: 'Home',
			url: '/doctor'
		},
		{
			name: 'drug',
			url: '/doctor/drug'
		},
		{
			name: 'ranger',
			url: '/doctor/ranger'
		},
		{
			name: 'gorilla',
			url: '/doctor/gorilla'
		}
	];
</script>

<svelte:head>
	<title>Doctor | npmg</title>
</svelte:head>

<main class="bg-deemWhite grid grid-cols-layout">
	<Sidebar {list} />
	<slot />
</main>
