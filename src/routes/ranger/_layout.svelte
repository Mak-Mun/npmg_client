<script lang="ts">
	let list: string[] = ["Dashboard","Gorillas","Rangers","Kwitizina","Reports","Settings","Logout"];
	import Sidebar from '../../components/Sidebar.svelte';
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
<Sidebar list={list}/> 
<main>
	<slot></slot>
</main>
</div>