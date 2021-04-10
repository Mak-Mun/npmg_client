<svelte:head>
    <title>Doctors</title>
  </svelte:head>

  <div>
    <div class="w-full md:flex">
      <div
        class="w-full bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited"
      >
        <div class="w-full md:flex mb-4 items-center justify-between">
          <div class="md:w-4/12">
          <h3 class="font-semibold px-3 py-1 text-xl">Ranger listing</h3>
        </div>
          <div class="flex justify-between md:w-6/12">
            <Search/>
          <span class="bg-green px-3 py-1 font-semibold cursor-pointer rounded-sm" on:click={OpenModal}>Invite new</span
          >
        </div>
        </div>
        <table class="text-left w-full md:px-10">
          <thead class="w-full">
            <tr
              class="justify-between"
            >
              <th class="p-4 w-1/10"></th>
              <th class="p-4 w-1/6">Full name</th>
              <th class="p-4 w-1/6">Date joined</th>
              <th class="p-4 w-1/6">Residense</th>
              <th class="p-4 w-1/6">Group</th>
              <th class="p-4 w-1/6">Others</th>
            </tr>
          </thead>
          <tbody
          class="limitedTable overflow-y-auto"
        >
          {#each integers as int}
            <tr
              class="mt-3 justify-between bg-white border-b-2 cursor-pointer"
            >
              <td class="text-center p-4 py-8 w-1/10">{int}</td>
              <td class="p-4 w-1/6"
                ><div class="flex items-center">
                  <div class="flex-shrink-0 w-8 h-8">
                    <img
                      class="w-full h-full rounded-full"
                      src={photoUrl}
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">Mukera Aime</p>
                  </div>
                </div></td
              >
              <td class="p-4 w-1/6">December 2017</td>
              <td class="p-4 w-1/6">Amahoro</td>
              <td class="p-4 w-1/6">Nkindira</td>
              <td class="p-4 w-1/6">Kwizigira</td>
            </tr>
          {/each}
        </tbody>
        </table>
      </div>
      {#if isOpen}
      <InvitationModal bind:isOpen={isOpen}/>
      {/if}
    </div>
  </div>

  <style>
    .unlimited {
      height: 90vh;
      overflow-y: auto;
    }
    .limitedTable {
      height: 60vh;
    }
    @media only screen and (max-height: 550px) {
      .unlimited {
        height: fit-content;
        width: fit-content;
      }
    }
    @media only screen and (max-width: 600px) {
      .unlimited {
        height: fit-content;
        width: fit-content;
      }
    }
    .bg-green {
      background-color: #00917c;
      color: white;
    }
    div *::-webkit-scrollbar {
      width: 4px;
      display: none;
    }
    div *::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  
    div::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  </style>
  