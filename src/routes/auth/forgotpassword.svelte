<svelte:head>
  <title>Reset password</title>
</svelte:head>

<form class="grid grid-cols-1 gap-6">
  <label for="email" class="block mb-5">
    <span class="text-gray-700 text-xl mb-4">Your email here</span>
    <input
      type="email"
      id="text"
      placeholder="Boston Rockstack"
      class="block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
    />
  </label>

  <input
    type="submit"
    value="Reset your password"
    class="bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-2 "
  />

  <div class="text-center">
    <span>Remember your account</span>
    <a href="/auth/login" class=" text-blue-500"> Login here? </a>
  </div>
</form>
