<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { List } from '$lib/types/sidebar_items';

	let list: List[] = [
		{
			name: 'Dashboard',
			url: '/dashboard'
		},
		{
			name: 'Tasks',
			url: '/tasks'
		},
		{
			name: 'Gorillas',
			url: '/gorillas'
		},
		{
			name: 'Rangers',
			url: '/rangers'
		},
		{
			name: 'Doctors',
			url: '/doctors'
		},
		{
			name: 'Kwitizina',
			url: '/kwitizina'
		},
		{
			name: 'Reports',
			url: '/reports'
		},
		{
			name: 'Settings',
			url: '/settings'
		}
	];
</script>

<div class="min-h-screen grid grid-cols-layout  bg-gray-100">
	<aside>
		<Sidebar bind:list />
	</aside>

	<div class="flex flex-col">
		<Nav />
		<slot />
	</div>
</div>
