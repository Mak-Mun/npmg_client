<script lang="ts">
</script>

<svelte:head>
	<title>Tasks</title>
</svelte:head>
<div class="flex flex-col justify-center bg-white p-6">
	<h1 class="font-bold w-full text-xl">Daily task assignment</h1>
	<div class="w-10/12 flex flex-col sm:mx-4 md:mx-10 mt-4">
		<div class="w-full flex flex-col">
			<label for="date">Task Date</label>
			<input
				type="date"
				class="px-4 border-b-2 border-black focus:border-green-500 focus:outline-none sm:w-5/6 md:w-4/12"
				name="task_date"
			/>
		</div>
		<table class="w-full justify-between mt-4">
			<thead class="w-full">
				<tr class="justify-between">
					<th class="p-2 text-center w-1/7">Numbering</th>
					<th class="p-2 text-center w-1/7">Group name</th>
					<th class="p-2 text-center w-1/7">Families and Gorillas</th>
				</tr>
			</thead>
			<tbody class="limitedTable overflow-y-auto">
				<tr class="mt-3 justify-between bg-white border-b-2 cursor-pointer">
					<td class="text-center p-2 w-1/7">1</td>
					<td class="text-center p-2 w-1/7">Horrible</td>
					<td class="text-center p-2 w-1/7">Kwitonda</td>
				</tr>
				<tr class="mt-3 justify-between bg-white border-b-2 cursor-pointer">
					<td class="text-center p-2 w-1/7">1</td>
					<td class="text-center p-2 w-1/7">Horrible</td>
					<td class="text-center p-2 w-1/7">Kwitonda</td>
				</tr>
			</tbody>
		</table>
		<div class="w-full flex">
			<div class="w-8/12" />
			<div class="w-4/12 flex">
				<button
					class="text-white p-4 py-2 m-2 bg-green-600 rounded items-center cursor-pointer focus:outline-none"
					>+ Add</button
				>
				<button
					class="text-white p-4 py-2 m-2 bg-green-600 rounded items-center cursor-pointer focus:outline-none"
					>Save Tasks</button
				>
			</div>
		</div>
	</div>
</div>

<style>
</style>
