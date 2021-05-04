<script lang="ts">
	let path_name;

	interface List {
		name: string;
		url: string;
	}

	export let list: List[];
</script>

<div class="flex bg-white h-screen  shadow-md flex-col">
	<h2 class="text-3xl uppercase font-sans font-extrabold px-4 mt-16 mb-16">NPMG</h2>

	<ul class="flex flex-col py-4">
		{#each list as item}
			<!--TODO:(verite) Fix gettting the current path ()-->
			<li
				class="mb-4 {$page.path.split('/')[$page.path.split('/').length - 1] === item.name
					? 'bg-gray-200 border-r-4 border-green-600'
					: $page.path.split('/')[$page.path.split('/').length - 1] === 'doctor'
					? 'bg-gray-200 border-r-4 border-green-600'
					: ''}"
			>
				<a
					href={item.url}
					class="px-4 flex flex-row items-center h-12 transform  text-gray-800 hover:text-motherGreen"
				>
					{item.name}
				</a>
			</li>
		{/each}
		<li>
			<a
				href="/auth/signin"
				class="text-red-500 font-semibold px-4 py-4 text-center bottom-0 cursor-pointer font-sourceSans"
				>Logout</a
			>
		</li>
	</ul>
</div>

<style>
	li {
		width: 100% !important;
	}
</style>
