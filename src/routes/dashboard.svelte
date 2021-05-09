<script type="ts">
	import Layout from '$lib/Layout.svelte';

	let integers = [1, 2, 3, 4, 5, 6];
	let newReportUrl = 'https://avatars.githubusercontent.com/u/53856673?v=4';
</script>

<svelte:head>
	<title>welcome back</title>
</svelte:head>

<Layout>
	<div class="rounded px-4 pt-12 pb-1 md:px-4 md:py-3 mr-3 flex flex-col  py-6 ">
		<div class=" bg-primaryGreen w-full rounded-xl p-3 px-5 md:py-6">
			<h1 class="text-white text-2xl font-semibold mb-2 ml-2 md:ml-5">Welcome Makuza Verite</h1>
			<h3 class="text-white text-xl ml-2 md:ml-5">Have a nice day !</h3>
		</div>
	</div>
	<div class="w-full md:flex  px-4 sm:w-full md:w-full lg:w-11/12">
		<div class="md:w-8/12 px-5 mt-10">
			<div class="flex w-full justify-between mb-4">
				<h2 class="font-semibold text-xl mx-6">Daily Report</h2>
				<a href="/admin/reports"><h3 class="font-semibold full md:mr-10">View full</h3></a>
			</div>
			<div class="w-full flex flex-wrap justify-between">
				<div
					class="mt-4 md:mt-0 nw-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer"
				>
					<div class="h-32 w-24 rounded-xl attended" />
					<p class="text-xs text-gray-600 mt-2">Gorillas Found</p>
					<h4 class="text-2xl font-semibold mt-2">136</h4>
				</div>
				<div
					class="mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer"
				>
					<div class="h-32 w-24 rounded-xl made" />
					<p class="text-xs text-gray-600 mt-2">Gorillas pregnant</p>
					<h4 class="text-2xl font-semibold mt-2">17</h4>
				</div>
				<div
					class="mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer"
				>
					<div class="h-32 w-24 rounded-xl attended missed" />
					<p class="text-xs text-gray-600 mt-2 ">Gorillas Lost</p>
					<h4 class="text-2xl font-semibold mt-2">9</h4>
				</div>
			</div>
		</div>
		<div class="sm:w-full md:w-4/12 lg:w-5/12 px-5 md:px-1 mt-6 md:mt-0">
			<div class="bg-white flex flex-col pt-3 px-3 rounded-lg w-11/12">
				<div class="flex justify-between mb-1">
					<h3 class="font-semibold text-xl mx-4">Gorillas List</h3>
					<a href="/admin/gorillas"><h3 class="font-semibold text-sm full mx-4">View all</h3></a>
				</div>
				<div class="">
					{#each integers as int}
						<div class="mb-0 px-3 pb-1 md:px-6 flex cursor-pointer rounded items-center mx-auto">
							<img
								alt="Success Kid"
								src={newReportUrl}
								class="h-10 w-10 rounded-full cursor-pointer"
							/>
							<div class="flex flex-col pl-2">
								<span class="font-semibold text-sm">Amahoro</span>
								<span class="text-gray-500 text-sm">22 December 2020</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</Layout>

<style>
	.attended {
		background-color: #b7ffc2;
	}
	.missed {
		background-color: #fc7474;
	}
	.made {
		background-color: #86c5ff;
	}
	.full {
		color: #f0a500;
	}
	div *::-webkit-scrollbar {
		width: 4px;
	}
	div *::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}

	div::-webkit-scrollbar-thumb {
		background-color: darkgrey;
		outline: 1px solid slategrey;
	}
</style>
