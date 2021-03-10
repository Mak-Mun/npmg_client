<script lang="ts">
  import type List from '../types/sidebar_items';
   export let list: List[];
</script>

<style>
	
</style>




  <div class="flex flex-col w-56 bg-white  overflow-hidden">
    <div class="flex items-center justify-center h-20 shadow-md">
      <h1 class="text-3xl uppercase text-indigo-500">Logo</h1>
    </div>
    <ul class="flex flex-col py-4">
      {#each list as item}
      <li>
        <a href={item.url} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
          <span class="text-sm font-medium">{item.name}</span>
        </a>
      </li>
      {/each}
	      </ul>
  </div>
