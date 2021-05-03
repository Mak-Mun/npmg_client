<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import TopNav from '$lib/TopNav.svelte';
	import  List from '$lib/types/sidebar_items';
	let list: List[] = [new List("/user","Dashboard"),new List("/user/tasks","Tasks"),new List("/user/gorillas","Gorillas"),new List("/user/rangers","Rangers"),new List("/user/doctors","Doctors"),new List("/user/kwitizina","Kwitizina"),new List("/user/reports","Reports"),new List("/user/settings","Settings")];
</script>
<style>
main {
		padding: 10px;
		margin: 5px;
		box-sizing: border-box;
	}
</style>

<div class="min-h-screen flex flex-row bg-gray-100">
<Sidebar bind:list={list}/> 
<!-- 0788574971 vet national park -->
<div class="flex flex-col w-screen h-screen overflow-y-auto">
<TopNav/>
<main class="float-left">
	<slot></slot>
</main>
</div>
</div>
