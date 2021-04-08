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
        <th class="p-4 text-center w-1/7">Numbering</th>
        <th class="p-4 text-center w-1/7">Group name</th>
        <th class="p-4 text-center w-1/7">Families and Gorillas</th>
      </tr>
    </thead>
    <tbody
      class="limitedTable overflow-y-auto"
    >
        <tr
          class="mt-3 justify-between bg-white border-b-2 cursor-pointer"
        >
          <td class="text-center p-4 w-1/7"
            >1</td
          >
          <td class="text-center p-4 w-1/7">Horrible</td>
          <td class="text-center p-4 w-1/7">Kwitonda</td>
        </tr>
    </tbody>
  </table>
  <div class="w-full flex">
    <div class="w-11/12"></div>
    <div class="w-1/12">
      <p>+</p>
    </div>
  </div>
</div>

<style>
</style>
