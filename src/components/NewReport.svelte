<script lang="ts">
    	let statusOptions = ['NSA','SNA','NAS'];
        let gorillas = ['Amahoro','Urukundo','Cyubahiro','Byiruka','Umutuzo']
        let report = {
        gorilla:"",
		lungs: "",
		heart: "",
		brain:"",
		legs: "",
		chest:'',
		eyes:"",
		comment:"",
	}
    function handleOnSubmit() {
			console.log(report);
		alert(report.gorilla);
	    }

</script>
<style>
    .text-white{
	color: #fff;
}
</style>
<div class="flex flex-col justify-center bg-white p-6">
    <h1 class="font-bold px-4 md:text-2xl mb-10">ADD NEW REPORT</h1>
    <form class="flex flex-col  mt-6" on:submit|preventDefault="{handleOnSubmit}">
        <div class="mx-5 sm:-mt-10 mb-5">
            <div class="border-b-2 focus-within:border-green-500 flex md:w-5/12">
                <label for="name" class="px-2">Name:</label>
                <select  bind:value={report.gorilla} class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
                    <option value="">--name--</option>
                    {#each gorillas as father}
                        <option value={father}>
                            {father}
                        </option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="md:flex">
        <div class="max-w-sm overflow-hidden space-y-6 mx-5 md:w-5/12">
            <div class="border-b-2 focus-within:border-green-500 flex">
                <label for="name" class="px-2">Heart:</label>
                <select  bind:value={report.heart} class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
                    <option value="">--heart--</option>
                    {#each statusOptions as father}
                        <option value={father}>
                            {father}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="border-b-2 focus-within:border-green-500 flex">
                <label for="name" class="px-2">Lungs:</label>
                <select  bind:value={report.lungs} class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
                    <option value="">--lungs--</option>
                    {#each statusOptions as father}
                        <option value={father}>
                            {father}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="border-b-2 focus-within:border-green-500 flex">
                <label for="name" class="px-2">Eyes:</label>
                <select  bind:value={report.eyes} class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
                    <option value="">--eyes--</option>
                    {#each statusOptions as father}
                        <option value={father}>
                            {father}
                        </option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="my-4 md:my-0 w-9/10 max-w-sm overflow-hidden space-y-6 mx-5 md:w-5/12">
            <div class="border-b-2 focus-within:border-green-500 flex">
                <label for="name" class="px-2">Lungs:</label>
                <select  bind:value={report.lungs} class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
                    <option value="">--lungs--</option>
                    {#each statusOptions as father}
                        <option value={father}>
                            {father}
                        </option>
                    {/each}
                </select>
            </div>
            
            <div class="border-b-2 focus-within:border-green-500 flex">
                <label for="name" class="px-2">Heart:</label>
                <select bind:value={report.heart} class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
                    <option value="">--heart--</option>
                    {#each statusOptions as father}
                        <option value={father}>
                            {father}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="border-b-2 focus-within:border-green-500 flex">
                <label for="name" class="px-2">Chest:</label>
                <select bind:value={report.chest} class="px-4 block w-full appearance-none focus:outline-none bg-transparent">
                    <option value="">--chest--</option>
                    {#each statusOptions as father}
                        <option value={father}>
                            {father}
                        </option>
                    {/each}
                </select>
            </div>
		   
        </div>
    </div>
    <div class="ml-5 mr-2 mt-3 md:mt-7 mb-5">
        <div class="border-b-2 focus-within:border-green-500 flex md:w-10/12">
            <label for="name" class="px-2">Comment:</label>
            <input type="text" name="name" bind:value={report.comment} placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
        </div>
    </div>
    <div class="mx-5 mb-5 md:ml-40">
        <div>
            <span class="mx-2 text-xs">Files</span>
        </div>
        <div class="focus-within:border-green-500 flex ">
            <label class="w-20 md:w-35 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <input type='file' class="hidden" />
            </label>
        </div>
    </div>
    <div class="mx-5 mb-5 md:ml-40">
        <div class="my-4 mx-auto focus-within:border-green-500">
            <button class="bg-green-800 text-gray px-2 py-1 rounded w-full md:w-5/12 text-white  font-bold focus:outline-none" type="submit">FINISH REPORT</button>
        </div>
    </div>
    </form>
</div>