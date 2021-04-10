<script lang="ts">
  
</script>

<svelte:head>
  <title>Tasks</title>
</svelte:head>
<div class="flex flex-col justify-center bg-white p-6">
    <h1 class="font-bold text-xl">Daily Task Assignment View</h1>
    <div class="md:flex w-full mt-2">
        <div class="md:w-7/12 flex flex-col items-center mx-auto px-4">
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
                    <th class="p-2 text-center w-1/7">Group</th>
                    <th class="p-2 text-center w-1/7">Gorilla Family</th>
                  </tr>
                </thead>
                <tbody
                  class="limitedTable overflow-y-auto"
                >
                    <tr
                      class="mt-3 justify-between bg-white cursor-pointer border-b border-black"
                    >
                      <td class="text-center p-2 w-2/7"
                        >1</td
                      >
                      <td class="text-center p-2 w-2/7">Horrible</td>
                      <td class="text-center p-2 w-2/7">Kwitonda</td>
                    </tr>
                    <tr
                      class="mt-3 justify-between bg-white cursor-pointer border-b border-black"
                    >
                      <td class="text-center p-2 w-2/7"
                        >2</td
                      >
                      <td class="text-center p-2 w-2/7">Horrible</td>
                      <td class="text-center p-2 w-2/7">Kwitonda</td>
                    </tr>
                    <tr
                      class="mt-3 justify-between bg-white cursor-pointer border-b border-black"
                    >
                      <td class="text-center p-2 w-2/7"
                        >3</td
                      >
                      <td class="text-center p-2 w-2/7">Horrible</td>
                      <td class="text-center p-2 w-2/7">Kwitonda</td>
                    </tr>
                    <tr
                      class="mt-3 justify-between bg-white cursor-pointer border-b border-black"
                    >
                      <td class="text-center p-2 w-1/7"
                        >4</td
                      >
                      <td class="text-center p-2 w-1/7">Horrible</td>
                      <td class="text-center p-2 w-1/7">Kwitonda</td>
                    </tr>
                </tbody>
              </table>
           </div>
        </div>
        <div class="md:w-5/12 flex flex-col items-center mx-auto px-4 shadow rounded sm:mt-6 md:mt-0 sm:pb-4 md:pb-0">
            <h2 class="font-semibold my-2 border-b-2 border-green-600 text-green-600 cursor-pointer">Kwitonda Members</h2>
            <table class="w-full justify-between mt-4 mx-2">
                <thead class="w-full">
                  <tr
                    class="justify-between"
                  >
                    <th class="p-2 text-center w-1/7"></th>
                    <th class="p-2 text-center w-1/7">Gorilla</th>
                    <th class="p-2 text-center w-1/7">Family</th>
                  </tr>
                </thead>
                <tbody
                  class="limitedTable overflow-y-auto"
                >
                    <tr
                      class="mt-3 justify-between bg-white cursor-pointer border-b border-black"
                    >
                      <td class="text-center p-2 w-2/7"
                        >1</td
                      >
                      <td class="text-center p-2 w-2/7">Amahoro</td>
                      <td class="text-center p-2 w-2/7">Kwitonda</td>
                    </tr>
                    <tr
                      class="mt-3 justify-between bg-white cursor-pointer border-b border-black"
                    >
                      <td class="text-center p-2 w-2/7"
                        >2</td
                      >
                      <td class="text-center p-2 w-2/7">Munezero</td>
                      <td class="text-center p-2 w-2/7">Kwitonda</td>
                    </tr>
                    <tr
                      class="mt-3 justify-between bg-white cursor-pointer border-b border-black"
                    >
                      <td class="text-center p-2 w-2/7"
                        >3</td
                      >
                      <td class="text-center p-2 w-2/7">Cyizere</td>
                      <td class="text-center p-2 w-2/7">Kwitonda</td>
                    </tr>
                    <tr
                      class="mt-3 justify-between bg-white cursor-pointer border-b border-black"
                    >
                      <td class="text-center p-2 w-1/7"
                        >4</td
                      >
                      <td class="text-center p-2 w-1/7">Byishimo</td>
                      <td class="text-center p-2 w-1/7">Kwitonda</td>
                    </tr>
                </tbody>
              </table>
        </div>
    </div>
</div>

<style>
</style>
