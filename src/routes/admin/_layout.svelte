<script lang="ts">
	import Sidebar from '../../components/Sidebar.svelte';
	import  List from '../../types/sidebar_items';
	let list: List[] = [new List("/admin","Dashboard"),new List("/admin/gorillas","Gorillas"),new List("/admin/rangers","Rangers"),new List("/admin/gorillas","Doctors"),new List("/admin/kwitizina","Kwitizina"),new List("/admin/reports","Reports"),new List("/admin/settings","Settings")];
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