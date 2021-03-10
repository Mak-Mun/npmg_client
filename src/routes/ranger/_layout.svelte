<script lang="ts">
	let list: string[] = ["Dashboard","Gorillas","Rangers","Kwitizina","Reports","Settings","Logout"];
	import Sidebar from '../../components/Sidebar.svelte';
</script>
<style>
main {
		padding: 10px;
		margin: 5px;
		box-sizing: border-box;
	}
</style>

<div class="min-h-screen flex flex-row bg-gray-100">
<Sidebar/> 
<main>
	<slot></slot>
</main>
</div>