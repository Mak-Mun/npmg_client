<!-- <svelte:options immutable />

<script lang="ts">
  import { initClient } from "@urql/svelte"
  import { onMount } from "svelte"

  onMount(() => {
    initClient({
      url: "https://npmg-server.herokuapp.com/graphql",
    })
  })
</script> -->

<main>
  <slot />
</main>
