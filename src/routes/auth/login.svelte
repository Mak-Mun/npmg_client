<svelte:head>
  <title>Login</title>
</svelte:head>

<form>
  <div>
    <!-- <label for="email" class="mb-2">Email </label> -->
    <!-- class="py-2 border rounded-md px-2 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50  focus:outline-none focus:border-green-500" -->
    <!-- <input
      type="email"
      class="form-input mt-1 block w-full"
      id="email"
      placeholder="Email"
    /> -->
    <input
      class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 "
      type="email"
      required="true"
      placeholder="Jane Doe"
      aria-label="Full name"
    />
  </div>

  <div class="flex flex-col mb-10">
    <!-- <label for="password">Password </label> -->
    <input
      type="password"
      class="py-2 border rounded-md px-2 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none focus:border-green-500"
      id="password"
      placeholder="password"
    />
  </div>

  <div class="flex justify-between my-4">
    <div>
      <label for="remember" class="inline-flex items-center">
        <input
          type="checkbox"
          class="border-gray-300 border-2 rounded text-green-600 focus:border-gray-300 focus:ring-black"
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
    class="bg-primaryGreen font-sourceSans cursor-pointer text-white px-40 py-3 rounded-sm"
  />
</form>
