<div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
  
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
  
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-2 border-green-new" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="m-3 mt-5">
          <h1 class="text-xl font-bold md:mb-5 uppercase">New Family</h1>
        </div>
        <div class="m-3 flex flex-col">
            <div class="flex flex-col">
                <label for="familyname" class="font-semibold mx-2">Family Name</label>
                <input type="text" bind:value={family.familyname} class="border-b-2 border-black focus:border-green-600 focus:outline-none rounded-md w-10/12 mx-2 py-1 px-4 text-md">
            </div>
            <div class="flex flex-col mt-4">
                <label for="familyname" class="font-semibold mx-2">Family Leader</label>
                <input type="text" bind:value={family.leader} class="border-b-2 border-black focus:border-green-600 focus:outline-none rounded-md w-10/12 mx-2 py-1 px-4 text-md">
            </div>
            <div class="flex flex-col mt-4">
                <label for="familyname" class="font-semibold mx-2">Members</label>
                <input type="text" class="border-b-2 border-black focus:border-green-600 focus:outline-none rounded-md w-10/12 mx-2 py-1 px-4 text-md">
            </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button on:click={CloseModal} type="button" class="bg-logout w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
            Close
          </button>
          <button type="button" class="bg-green-600 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Add new
          </button>
        </div>
      </div>
    </div>
  </div>
<script type="ts">
    let family={
        familyname:"",
        leader:""
    }
    export let isOpen:boolean;
  function CloseModal(){
      isOpen = false;
    }
    async function CreateFamily(){
        await client
      .mutation(NEW_REPORT, {
        data: { ...report },
      })
      .toPromise()
      .then((r: any) => {
        console.log(r);
        notifier.success("Report added successfully!")
      })
      .catch((err) => {
        console.error({ err })
        notifier.danger("New report failed!")
      })
    }
</script>
<style>
    .border-green-new{
      border-color: #00917C;
    }
    .bg-logout {
      background-color: #e74343;
    }
  </style>