<script lang="ts">
	import AdminSidebar from '../components/Sidebar.svelte';
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<div class="min-h-screen flex flex-row bg-gray-100">
<AdminSidebar/>
<main>
	<slot></slot>
</main>
</div>