<script lang="ts">
	import  List from '../../types/sidebar_items';
	import TopNav from '../../components/TopNav.svelte';
	let list: List[] = [new List("/ranger/","Dashboard"),new List("/ranger/gorillas","Gorillas"),new List("/ranger/rangers","Rangers"),new List("/ranger/kwitizina","Kwitizina"),new List("/ranger/reports","Reports"),new List("/ranger/settings","Settings")];
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
	<Sidebar list={list}/> 
	<div class="flex flex-col w-screen">
	<TopNav/>
	<main class="float-left">
		<slot></slot>
	</main>
	</div>
	</div>
	