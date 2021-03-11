<script lang="ts">
    	let genderOptions = ['Male','Female'];
		let fathers = ['Amahoro','Urukundo','Cyubahiro','Byiruka','Umutuzo']
		let family=['Makuru','Gahinga','Umutungo','Heza']
        let gender;
    let photoUrl:string = "https://th.bing.com/th/id/OIP.C8igL9Mzx3SWR6bvi_JycQHaEK?w=282&h=180&c=7&o=5&dpr=1.5&pid=1.7";
</script>
<style>
.text-white{
	color: #fff;
}
.gorilla{
	width: 400px;
	height: 300px;
}


</style>

<svelte:head>
	<title>NEW GORILLA</title>
</svelte:head>
<div class="flex flex-col justify-center bg-white p-6">
<h1 class="font-bold px-4 text-2xl mb-10">NEW GORILLA</h1>
<form class="flex">
	<div>
		<div class="w-6/12 sm:w-8/12">
		    <img src="{photoUrl}" alt="..." class="shadow rounded max-w-full border-none gorilla" />
		</div> 
		<div class="w-6/12 sm:w-8/12 px-4 flex mt-1 justify-between">
			<button class="text-secGreen border-2 border-green-300 px-2 py-1 rounded w-6/12 mx-0 mr-1 font-bold focus:outline-none">CHANGE</button>
			<button class="text-successorColor border-2 border-orange-300 px-2 py-1 rounded w-6/12 mx-0 ml-1 font-bold focus:outline-none">REMOVE</button>
		</div>
	</div>
	<div class="w-full sm:w-8/12 max-w-sm overflow-hidden space-y-6 sm:-mt-10">
		<div class="border-b-2 focus-within:border-green-500 flex">
			<label for="name" class="px-2">Name:</label>
			<input type="text" name="name" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
		</div>
		<div class="border-b-2 focus-within:border-green-500 flex">
			<label for="name" class="px-2">Dob:</label>
			<input type="date" name="name" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
		</div>
		<div class="border-b-2 focus-within:border-green-500 flex">
			<label for="name" class="px-2">Mother:</label>
			<select value="{gender}" class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
				<option value="">--fathers--</option>
				{#each fathers as father}
					<option value={father}>
						{father}
					</option>
				{/each}
			</select>
		</div>
		<div class="border-b-2 focus-within:border-green-500 flex">
			<label for="name" class="px-2">Father:</label>
			<select value="{gender}" class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
				<option value="">--mothers--</option>
				{#each fathers as father}
					<option value={father}>
						{father}
					</option>
				{/each}
			</select>
		</div>
		<div class="border-b-2 focus-within:border-green-500 flex">
			<label for="name" class="px-2">Family:</label>
			<select value="{gender}" class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
				<option value="">--genders--</option>
				{#each family as option}
					<option value={option}>
						{option}
					</option>
				{/each}
			</select>
		</div>
		<div class="border-b-2 focus-within:border-green-500 flex">
			<label for="name" class="px-2">Gender:</label>
			<select value="{gender}" class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
				<option value="">--gender--</option>
				{#each genderOptions as genderOption}
					<option value={genderOption}>
						{genderOption}
					</option>
				{/each}
			</select>
		</div>
		<div class="border-b-2 focus-within:border-green-500 flex">
			<label for="name" class="px-2">Comment:</label>
			<input type="text" name="name" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
		</div>	
		<div class="my-4 focus-within:border-green-500 items-center justify-center">
			<button class="bg-green-800 text-gray px-2 py-1 rounded w-full text-white  font-bold focus:outline-none" type="submit">ADD NEW</button>
		</div>		   
	</div>
</form>
</div>
