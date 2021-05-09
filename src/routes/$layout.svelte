<script>
	import { setClient } from '@urql/svelte';
	import '../app.postcss';

	let client;
	setClient(client);
</script>

<main>
	<slot />
</main>
