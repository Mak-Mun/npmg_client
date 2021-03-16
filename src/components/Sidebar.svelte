<script lang="ts">
  import type List from "../types/sidebar_items"
  export let list: List[]
</script>

<div
  class="flex flex-col w-56 bg-white  overflow-hidden h-screen justify-between"
>
  <div class="">
    <div class="flex items-center justify-center h-20 shadow-md">
      <a href="/">
        <h1 class="text-3xl uppercase text-red-500">NPMG</h1>
      </a>
    </div>
    <ul class="flex flex-col py-4">
      {#each list as item}
        <li>
          <a
            href={item.url}
            class="flex flex-row items-center h-12 transform  text-gray-800 hover:text-motherGreen"
          >
            <span
              class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-800"
              ><i class="bx bx-home" /></span
            >
            <span class="text-sm font-medium">{item.name}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="">
    <h1
      class="text-red-500 font-semibold bg-logout px-4 py-2 text-center bottom-0 cursor-pointer"
    >
      <a href="/auth/login">Logout</a>
    </h1>
  </div>
</div>

<style>
  .bg-logout {
    background-color: #f0a500;
    color: white;
  }
</style>
