<script context="module" lang="ts">
</script>

<script type="ts">
	let integers = [1, 2, 3, 4, 5, 6];
	let newReportUrl =
		'data:image/jpeg;base64,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';
</script>

<svelte:head>
	<title>WELCOME</title>
</svelte:head>

<div>
	<div
		class="rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 flex flex-col md:w-11/12 longer py-6 sm:w-full md:w-full lg:w-11/12"
	>
		<div class="px:2 m-2 md: bg-primaryGreen rounded-xl p-3 px-5 md:py-6">
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
			<div class="w-full flex flex-wrap flex-row-reverse">
				<div
					class="mt-4 md:mt-0 w-3/10 flex flex-col items-center mx-auto bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer"
				>
					<div class="h-32 w-24 rounded-xl made" />
					<p class="text-xs text-gray-600 mt-2">Gorillas pregnant</p>
					<h4 class="text-2xl font-semibold mt-2">17</h4>
				</div>
				<div
					class="mt-4 md:mt-0 nw-3/10 flex flex-col items-center mx-auto bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer"
				>
					<div class="h-32 w-24 rounded-xl attended" />
					<p class="text-xs text-gray-600 mt-2">Gorillas Found</p>
					<h4 class="text-2xl font-semibold mt-2">136</h4>
				</div>
				<div
					class="mt-4 md:mt-0 w-3/10 flex flex-col items-center mx-auto bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer"
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
</div>

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
	.longer {
		height: fit-content;
	}
	.full {
		color: #f0a500;
	}
	@media only screen and (max-height: 340px) {
		.longer {
			height: fit-content;
			width: 100%;
		}
	}
	@media only screen and (max-width: 700px) {
		.longer {
			height: fit-content;
			width: 100%;
		}
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
