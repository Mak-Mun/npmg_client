<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import TopNav from '$lib/TopNav.svelte';
	import List from '$lib/types/sidebar_items';
	let list: List[] = [
		new List('/', 'Dashboard'),
		new List('/tasks', 'Tasks'),
		new List('/gorillas', 'Gorillas'),
		new List('/rangers', 'Rangers'),
		new List('/doctors', 'Doctors'),
		new List('/kwitizina', 'Kwitizina'),
		new List('/reports', 'Reports'),
		new List('/settings', 'Settings')
	];
</script>

<div class="min-h-screen flex flex-row bg-gray-100">
	<Sidebar bind:list />
	<!-- 0788574971 vet national park -->
	<div class="flex flex-col w-screen h-screen overflow-y-auto">
		<TopNav />
		<main class="float-left">
			<slot />
		</main>
	</div>
</div>

<style>
	main {
		padding: 10px;
		margin: 5px;
		box-sizing: border-box;
	}
</style>
