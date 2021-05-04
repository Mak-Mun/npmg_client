<script lang="ts">
	export let status: number;
	export let error: Error;
	const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
	<title>{status ?? 'Not found'} | npmg</title>
</svelte:head>

{#if error}
	<h1>{status}</h1>

	<p>{error?.message}</p>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
{:else}
	<div class="w-screen h-screen flex flex-col   justify-center items-center mx-auto">
		<p class="text-center font-bold text-5xl hover:text-green-500 cursor-pointer">
			404 | Not found
		</p>

		<div class="mt-4 text-blue-700 font-bold">
			<a href="/">Back to home</a>
		</div>
	</div>
{/if}
