<script lang="ts">
  // import { mutation } from "@urql/svelte"

  // import { mutation } from "@urql/svelte"

  // import { mutation } from "@urql/svelte"

  // import { CREATE_USER } from "../../Mutations.ts"
  // import client from "../utils/urql.ts"

  // const CREATE_USER = gql`

  // `

  //TODO: complete here https://codesandbox.io/s/urql-svelte-crud-6yf4c?file=/List.svelte

  let fullnames: string
  let phone: string
  let email: string
  let password: string
  let role: string

  // const registerUser = mutation({
  //   query: `
  //    mutation ($createUserInput: SingUpUserInput!) {
  //     signup(data: $createUserInput) {
  //       id
  //       email
  //     }
  //   }`,
  // })

  function register() {
    console.log({ fullnames, phone, email, password })
    // mutation({ query: CREATE_USER, })
    // mutation({ query: CREATE_USER, variables: { id: 1 } })
    // registerUser({ fullnames, phone, email, password })
  }

  // lastName: fullnames,
  // firstName: fullnames,
  // password: password,
  // role,
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<form class="grid grid-cols-1 gap-6" on:submit|preventDefault={register}>
  <label for="fullname" class="block">
    <span class="text-gray-700">Full names</span>
    <input
      type="test"
      id="fullname"
      bind:value={fullnames}
      placeholder="Boston Rockstack"
      class="block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
      required
    />
  </label>

  <label for="email" class="block">
    <span class="text-gray-700">Phone</span>
    <input
      type="text"
      id="email"
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
