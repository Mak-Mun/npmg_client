<script lang="ts">
    let photoUrl:string = "https://avatars.githubusercontent.com/u/52195?s=460&u=08bcafa24337a298e1b874279fde515e2fb8f81d&v=4";
</script>
<style>
input:focus-within ~ label,
input:not(:placeholder-shown) ~ label {
  @apply transform scale-75 -translate-y-6;
}

input:focus-within ~ label {
  @apply text-blue-500;
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
		    <img src="{photoUrl}" alt="..." class="shadow rounded max-w-full h-auto border-none" />
		</div> 
		<div class="w-6/12 sm:w-8/12 px-4 flex mt-1 justify-between">
			<button class="text-secGreen border-2 border-green-300 px-2 py-1 rounded w-6/12 mx-0 mr-1 font-bold focus:outline-none">CHANGE</button>
			<button class="text-successorColor border-2 border-orange-300 px-2 py-1 rounded w-6/12 mx-0 ml-1 font-bold focus:outline-none">REMOVE</button>
		</div>
	</div>
	<div class="sm:w-8/12 max-w-sm overflow-hidden space-y-6 sm:-mt-10">
		<div class="relative my-4 border-b-2 focus-within:border-green-500">
			<input type="text" name="name" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
			<label for="name" class="absolute top-0 -z-1">Name</label>
		</div>	
		<div class="relative my-4 border-b-2 focus-within:border-green-500">
			<input type="date" name="date" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
			<label for="name" class="absolute top-0 -z-1">Date of birth</label>
		</div>	
		<div class="relative my-4 border-b-2 focus-within:border-green-500">
			<input type="text" name="text" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
			<label for="father" class="absolute top-0 -z-1">Father</label>
		</div>
		<div class="relative my-4 border-b-2 focus-within:border-green-500">
			<input type="text" name="name" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
			<label for="name" class="absolute top-0 -z-1">Mother</label>
		</div>	
		<div class="relative my-4 border-b-2 focus-within:border-green-500">
			<input type="date" name="date" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
			<label for="name" class="absolute top-0 -z-1">Family</label>
		</div>	
		<div class="relative my-4 border-b-2 focus-within:border-green-500">
			<input type="text" name="text" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
			<label for="father" class="absolute top-0 -z-1">Gender</label>
		</div>
		<div class="relative my-4 border-b-2 focus-within:border-green-500">
			<input type="text" name="text" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
			<label for="father" class="absolute top-0 -z-1">Speciality or comment</label>
		</div>		   
	</div>
</form>
</div>
