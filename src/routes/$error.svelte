<script lang="ts">
	export let status: number;
	export let error: Error;
	const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

{#if error}
<h1>{status}</h1>

<p>{error?.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
{:else}
<div class="w-full flex flex flex-col items-center mx-auto md:mt-20">
<h1 class="text-center font-bold text-5xl hover:text-green-500 cursor-pointer">404</h1>
<p class="text-center hover:underline mt-2">Not found</p>
</div>
{/if}

