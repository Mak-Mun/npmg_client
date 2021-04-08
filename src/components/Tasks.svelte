<script lang="ts">
  
</script>

<svelte:head>
  <title>Tasks</title>
</svelte:head>
<div class="flex flex-col justify-center bg-white p-6">
  <h1 class="font-bold w-full text-xl">Daily task assignment</h1>
  <table class="w-full justify-between mt-0">
    <thead class="w-full">
      <tr
        class="justify-between"
      >
        <th class="p-4 text-center w-1/7"></th>
        <th class="p-4 text-center w-1/7">Family name</th>
        <th class="p-4 text-center w-1/7">Number of members</th>
        <th class="p-4 text-center w-1/7">Head father</th>
        <th class="p-4 text-center w-1/7">Date founded</th>
      </tr>
    </thead>
    <tbody
      class="limitedTable overflow-y-auto"
    >
        <tr
          class="mt-3 justify-between bg-white border-b-2 cursor-pointer"
        >
          <td class="text-center p-4 py-8 w-1/7">{int}</td>
          <td class="text-center p-4 w-1/7"
            >Gahinga</td
          >
          <td class="text-center p-4 w-1/7"> {Math.round((int*int/(int+1))+5*int)}</td>
          <td class="text-center p-4 w-1/7">Amahoro</td>
          <td class="text-center p-4 w-1/7">December 2017</td>
        </tr>
    </tbody>
  </table>
</div>

<style>
</style>
