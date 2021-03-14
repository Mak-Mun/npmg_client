<svelte:head>
  <title>Login</title>
</svelte:head>

<form>
  <div class="flex flex-col mb-6">
    <!-- <label for="email" class="mb-2">Email </label> -->
    <input
      type="email"
      class="py-2 border rounded-md px-2 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50  focus:outline-none focus:border-green-500"
      id="email"
      placeholder="Email"
    />
  </div>

  <div class="flex flex-col mb-10">
    <!-- <label for="password">Password </label> -->
    <input
      type="password"
      class="py-2 border rounded-md px-2 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50  focus:outline-none focus:border-green-500"
      id="password"
      placeholder="password"
    />
  </div>

  <div class="flex justify-between my-4">
    <label for="remember">
      <input type="checkbox" name="remberme" id="remember" /> Remember me?
    </label>
    <a href="/auth/forgotpassword" class=" text-blue-500"> Forgot password? </a>
  </div>

  <input
    type="submit"
    value="Login here"
    class="bg-primaryGreen font-sourceSans cursor-pointer text-white px-40 py-3 rounded-sm"
  />
</form>
