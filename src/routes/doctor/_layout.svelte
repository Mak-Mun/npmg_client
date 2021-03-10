<script lang="ts">
	import Sidebar from '../../components/Sidebar.svelte';
    import  List from '../../types/sidebar_items';
	let list: List[] = [new List("/doctor/","Dashboard"),new List("/doctor/gorillas","Gorillas"),new List("/doctor/rangers","Rangers"),new List("/doctor/gorillas","Doctors"),new List("/doctor/reports","Reports"),new List("/doctor/store","Store"),new List("/doctor/settings","Settings")];
</script>
<style>
	main {
		padding: 10px;
		margin: 5px;
		box-sizing: border-box;
	}
</style>

<div class="min-h-screen flex flex-row bg-gray-100">
<Sidebar list={list}/> 
<main>
	<slot></slot>
</main>
</div>