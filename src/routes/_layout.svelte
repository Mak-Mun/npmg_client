<script>
  import { initClient } from "@urql/svelte"

  initClient({
    url: "https://npmg-server.herokuapp.com/graphql",
  })
</script>

<main>
  <slot />
</main>
