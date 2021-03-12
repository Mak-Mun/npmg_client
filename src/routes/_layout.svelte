<Script>
 import { initClient } from "@urql/svelte"

  initClient({
    url: "https://npmg-server.herokuapp.com/graphql",
  })

</Script>

<main>
	<slot></slot>
</main>
