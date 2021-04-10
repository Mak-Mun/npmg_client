<script lang="ts">
  
</script>

<svelte:head>
  <title>Tasks</title>
</svelte:head>
<div class="flex flex-col justify-center bg-white p-6">
    <h1 class="font-bold text-xl">Daily Task Assignment View</h1>
    <div class="flex w-full mt-2">
        <div class="w-7/12 flex flex-col items-center mx-auto">
        <div class="w-full flex mt-4 bg-primaryGreen text-white rounded-md py-6">
        <p class="font-semibold mx-4 text-xl">Family:</p>
        <p class="font-semibold mx-2 cursor-pointer text-xl">Kwitonda</p>
           </div>
           <div class="w-full mt-2">
               <h1 class="font-bold my-2 text-center text-tiny border-b-2 border-black">Full Task Assignment</h1>
               <table class="w-full justify-between mt-4">
                <thead class="w-full">
                  <tr
                    class="justify-between"
                  >
                    <th class="p-2 text-center w-1/7"></th>
                    <th class="p-2 text-center w-1/7 text-green-500">Group</th>
                    <th class="p-2 text-center w-1/7">Gorilla Family</th>
                  </tr>
                </thead>
                <tbody
                  class="limitedTable overflow-y-auto"
                >
                    <tr
                      class="mt-3 justify-between bg-white border-b-2 cursor-pointer border-green-200"
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
