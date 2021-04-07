<script lang="ts">
  import Search from './Search.svelte';
  let photoUrl: string =
    "https://avatars.githubusercontent.com/u/784056?s=64&v=4"
  let integers = [1, 2, 3, 4, 5, 6, 7, 8]
  </script>
  
  <svelte:head>
    <title>Families</title>
  </svelte:head>
  <div>
    <div class="w-full md:flex">
      <div
        class="w-full bg-white rounded pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited"
      >
        <div class="w-full md:flex mb-4 items-center justify-between">
          <div class="md:w-4/12">
          <h3 class="font-semibold px-3 py-1 text-xl">Families listing</h3>
        </div>
          <div class="flex justify-between md:w-7/12">
            <Search/>
          <span class="px-3 py-1 font-semibold text-successorColor underline"
            ><a href="/admin/gorillas">View all gorillas</a></span
          >
          <span class="bg-green px-3 py-1 font-semibold cursor-pointer rounded-sm"
            ><a href="/admin/new_gorilla">Add New</a></span
          >
        </div>
        </div>
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
            {#each integers as int}
              <tr
                class="mt-3 justify-between bg-white border-b-2 cursor-pointer"
              >
                <td class="text-center p-4 py-8 w-1/7">{int}</td>
                <td class="text-center p-4 w-1/7"
                  >Gahinga</td
                >
                <td class="text-center p-4 w-1/7"> {Math.round((int*int/(int+1))+5*int)}</td>
                <td class="text-center p-4 w-1/7">Amahoro</td>
                <td class="text-center p-4 w-1/7">Kagabo</td>
                <!-- <td class="p-4 w-1/7 flex">
                  <span class="cursor-pointer font-semibold pr-1 mx-1/2"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#00917C"
                      ><path
                        d="M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z"
                      /></svg
                    ></span
                  >
                  <span class="cursor-pointer font-semibold pl-1 mx-1/2"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#E74C3C"
                      ><path
                        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
                      /></svg
                    ></span
                  >
                </td> -->
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  <style>
  </style>
  