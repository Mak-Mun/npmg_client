
<style>
  .border-green-new{
    border-color: #00917C;
  }
  .bg-green{
    background-color: #00917C;
  }
  .bg-logout {
    background-color: #f0a500;
  }
</style>
<script type="ts">
  export let isOpen:boolean;
  function CloseModal(){
      isOpen = false;
    }
</script>
<div class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-2 border-green-new" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="m-3 mt-5">
        <h1 class="text-xl font-semibold md:mb-5 uppercase">Email Invitations</h1>
        <p class="md:ml-4">Send invitations, type user emails here</p>
        <div class="w-3/4 md:ml-4">
          <input type="text" placeholder="User email" class="rounded w-full border-2 border-green-new text-sm  py-2 px-3 mb-3 focus:outline-none">
          <input type="text" placeholder="User email" class="rounded w-full border-2 border-green-new text-sm  py-2 px-3 mb-3 focus:outline-none">
          <input type="text" placeholder="User email" class="rounded w-full border-2 border-green-new text-sm  py-2 px-3 mb-3 focus:outline-none">
        </div>
      </div>
      
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button on:click={CloseModal} type="button" class="bg-logout w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
          Cancel
        </button>
        <button on:click={CloseModal} type="button" class="bg-green mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Invite
        </button>
      </div>
    </div>
  </div>
</div>