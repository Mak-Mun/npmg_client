<script lang="ts">
	import Sidebar from '../../components/Sidebar.svelte';
	import TopNav from '../../components/TopNav.svelte';
	export let segment: string;
	import  List from '../../types/sidebar_items';
	let list: List[] = [new List("/admin","Dashboard"),new List("/admin/tasks","Tasks"),new List("/admin/gorillas","Gorillas"),new List("/admin/rangers","Rangers"),new List("/admin/doctors","Doctors"),new List("/admin/kwitizina","Kwitizina"),new List("/admin/reports","Reports"),new List("/admin/settings","Settings")];
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
<div class="flex flex-col w-screen h-screen overflow-y-auto">
<TopNav/>
<main class="float-left">
	<slot {segment}></slot>
</main>
</div>
</div>
