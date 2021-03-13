<script lang="ts">
  let photoUrl: string =
    "https://avatars.githubusercontent.com/u/52195?s=460&u=08bcafa24337a298e1b874279fde515e2fb8f81d&v=4"
</script>
<svelte:head>
	<title>Settings</title>
</svelte:head>
<div>
  <div class="px:2 m-2 md:px-5 md:m-5 md:mt-1">
    <h1 class="text-xl font-semibold text-center md:text-left">
      Profile Settings
    </h1>
  </div>
  <div
    class="bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 md:flex w-5/6 longer"
  >
    <div class="mr-10 mt-2">
      <ul>
        <li
          class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1 text-motherGreen"
        >
          Profile
        </li>
        <li
          class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1"
        >
          Notifications
        </li>
        <li
          class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1"
        >
          Password
        </li>
        <li
          class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1"
        >
          Messages
        </li>
      </ul>
    </div>
    <div class="rounded shadow w-4/5 h-full md:ml-4 mt-2 flex flex-col">
      <h1 class="text-center font-semibold text-xl">Account</h1>
      <div class="mt-6 mx-auto items-center">
        <img class="img rounded-full" src={photoUrl} alt="" />
        <div class="flex mt-1">
          <button
            class="text-green-500 p-1 px-2 mx-1 focus:outline-none rounded shadow"
            >Upload</button
          >
          <button
            class="border border-red-500 text-red-500 p-1 px-2 mx-1 shadow rounded focus:outline-none "
            >Remove</button
          >
        </div>
      </div>
      <div class="mt-6 mx-auto flex flex-col w-11/12 md:w-9/12">
        <label for="name" class="font-semibold ml-1">Add Bio</label>
        <textarea class="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full shadow border border-gray-200 rounded focus:outline-none focus:border-gray-500"
        id="message" type="text" placeholder="Message..."></textarea>
      </div>
      <div class="mt-6 mx-auto flex w-11/12 md:w-9/12">
        <div class="flex flex-col md:mx-3">
          <label for="name" class="font-semibold ml-1">First Name</label>
          <input type="text" class="w-full px-3 py-1 text-sm placeholder-gray-300 border border-gray-300 focus:outline-none focus:border-gray-500" />
        </div>
        <div class="flex flex-col md:mx-3">
          <label for="name" class="font-semibold ml-1">First Name</label>
          <input type="text" class="w-full px-3 py-1 text-sm placeholder-gray-300 border border-gray-300 focus:outline-none focus:border-gray-500" />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .text-red-500 {
    color: #E74C3C;
    border: 1.5px solid  #E74C3C;
  }
  .text-s-xl {
    font-size: 17px;
  }
  .text-green-500{
    color: #00917C;
    border: 1.5px solid  #00917C;
  }
  .longer {
    height: 90vh;
  }
  .img{
    width: 120px;
    height: 120px;
  }
  @media only screen and (max-height: 340px) {
    .longer {
      height: fit-content;
      width: fit-content;
    }
  }
  @media only screen and (max-width: 700px) {
    .longer {
      height: fit-content;
      width: fit-content;
    }
  }
  div *::-webkit-scrollbar {
    width: 4px;
  }
  div *::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  div::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
</style>
