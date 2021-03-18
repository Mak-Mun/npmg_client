<script lang="ts">
  let email: string
  let password: string

  function login() {}
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<form class="grid grid-cols-1 gap-6" on:submit|preventDefault={login}>
  <label for="email" class="block">
    <span class="text-gray-700">Email</span>
    <input
      type="email"
      id="email"
      bind:value={email}
      class="block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
    />
  </label>

  <label for="password" class="block">
    <span class="text-gray-700">Password</span>
    <input
      type="password"
      id="password"
      bind:value={password}
      class="block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
      required
    />
  </label>

  <div class="flex justify-between mt-4 mb-2">
    <div>
      <label for="remember" class="inline-flex items-center">
        <input
          type="checkbox"
          class="border-gray-300 border-2 rounded text-green-600 focus:border-gray-300 focus:ring-green-500 "
          name="remberme"
          id="remember"
        />
      </label>
      Remember me?
    </div>

    <a href="/auth/forgotpassword" class=" text-blue-500"> Forgot password? </a>
  </div>

  <input
    type="submit"
    value="Login here"
    class="bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-3 "
  />

  <div class="text-center">
    <span>Don't have an account</span>
    <a href="/auth/register" class=" text-blue-500"> Register here? </a>
  </div>
</form>
