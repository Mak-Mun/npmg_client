<script lang="ts">
	interface List {
		name: string;
		url: string;
	}

	export let list: List[];
</script>

<div class="flex w-1/6 bg-white h-screen justify-between shadow-md">
	<div>
		<h2 class="text-3xl uppercase font-sans font-extrabold">NPMG</h2>

		<ul class="flex flex-col py-4">
			{#each list as item}
				<li class="px-4">
					<a
						href={item.url}
						class="flex flex-row items-center h-12 transform  text-gray-800 hover:text-motherGreen"
					>
						{item.name}
					</a>
				</li>
			{/each}
			<li>
				<button
					href="/auth/login"
					class="text-red-500 font-semibold  px-4 py-2 text-center bottom-0 cursor-pointer font-sourceSans"
					>Logout</button
				>
			</li>
		</ul>
	</div>
</div>
