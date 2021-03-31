<script context="module" lang="ts">
  let firstName: string
  let lastName: string
  let phone: string
  let email: string
  let password: string
  let role: string
</script>

<script lang="ts">
  import { CREATE_USER } from "../../utils/Mutations"
  import client from "../../utils/urql"
  import { goto } from "@sapper/app"
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications"

  async function register() {
    await client
      .mutation(CREATE_USER, {
        data: { firstName, lastName, email, password, role },
      })
      .toPromise()
      .then((r: any) => {
        notifier.success("Registered succesfully!")
        // goto("/auth/login")
      })
      .catch((err) => {
        console.error({ err })
        notifier.danger("Registration failed!")
      })
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<NotificationDisplay />

<form class="grid grid-cols-1 gap-6" on:submit|preventDefault={register}>
  <label for="First name" class="block">
    <span class="text-gray-700">Full name</span>
    <input
      type="text"
      id="First name"
      bind:value={firstName}
      placeholder="Boston Rockstack"
      class="block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
      required
    />
  </label>

  <label for="LastName" class="block">
    <span class="text-gray-700">Last name</span>
    <input
      type="text"
      id="LastName"
      bind:value={lastName}
      placeholder="Boston Rockstack"
      class="block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
      required
    />
  </label>

  <label for="phone" class="block">
    <span class="text-gray-700">Phone</span>
    <input
      type="text"
      id="phone"
      bind:value={phone}
      placeholder="2507147115"
      class="block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
      required
    />
  </label>

  <label for="email" class="block">
    <span class="text-gray-700">Email</span>
    <input
      type="email"
      id="email"
      bind:value={email}
      placeholder="test@gmail.com"
      class="block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
      required
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

  <label htmlfor="role" class="block">
    <span>Role</span>
    <select
      id="role"
      bind:value={role}
      class="block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
      required
    >
      <option value="USER">USER</option>
      <option value="RANGER">RANGER</option>
      <option value="DOCTOR">DOCTOR</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  </label>

  <input
    type="submit"
    value="Register here"
    class="bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-3 "
  />

  <div class="text-center">
    <span>Have an account</span>
    <a href="/auth/login" class=" text-blue-500"> Login here? </a>
  </div>
</form>
