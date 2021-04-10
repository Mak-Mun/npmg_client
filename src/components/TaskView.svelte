<script lang="ts">
  
</script>

<svelte:head>
  <title>Tasks</title>
</svelte:head>
<div class="flex flex-col justify-center bg-white p-6">
    <h1 class="font-bold text-xl">Daily Task Assignment View</h1>
    <div class="flex w-full mt-4">
        <div class="w-7/12 flex flex-col items-center mx-auto">
        <div class="w-full flex">
        <p class="font-semibold mx-4">Assigned Family:</p>
        <p class="font-semibold mx-2">Kwitonda</p>
           </div>
           <div class="w-full">
               <h1 class="font-semibold my-2">Full Task Assignment</h1>
               <table class="w-full justify-between mt-4">
                <thead class="w-full">
                  <tr
                    class="justify-between"
                  >
                    <th class="p-2 text-center w-1/7"></th>
                    <th class="p-2 text-center w-1/7">Group name</th>
                    <th class="p-2 text-center w-1/7">Families and Gorillas</th>
                  </tr>
                </thead>
                <tbody
                  class="limitedTable overflow-y-auto"
                >
                    <tr
                      class="mt-3 justify-between bg-white border-b-2 cursor-pointer"
                    >
                      <td class="text-center p-2 w-2/7"
                        >1</td
                      >
                      <td class="text-center p-2 w-2/7">Horrible</td>
                      <td class="text-center p-2 w-2/7">Kwitonda</td>
                    </tr>
                    <tr
                      class="mt-3 justify-between bg-white border-b-2 cursor-pointer"
                    >
                      <td class="text-center p-2 w-1/7"
                        >1</td
                      >
                      <td class="text-center p-2 w-1/7">Horrible</td>
                      <td class="text-center p-2 w-1/7">Kwitonda</td>
                    </tr>
                </tbody>
              </table>
           </div>
        </div>
        <div class="w-5/12 flex flex-col items-center mx-auto">
            <h2 class="font-semibold my-2 border-b-2 border-green-600 text-green-600">Kwitonda Members</h2>
        </div>
    </div>
</div>

<style>
</style>
