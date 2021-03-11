<script lang="ts">
    	let statusOptions = ['NSA','SNA','NAS'];
        let gorillas = ['Amahoro','Urukundo','Cyubahiro','Byiruka','Umutuzo']
        let report = {
        gorilla:"",
        report:"",
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
		alert(report.report);
	    }

</script>
<div class="flex flex-col justify-center bg-white p-6">
    <h1 class="font-bold px-4 text-2xl mb-10">ADD NEW REPORT</h1>
    <form class="flex flex-col  mt-6" on:submit|preventDefault="{handleOnSubmit}">
        <div class="mx-5 sm:-mt-10 mb-5">
            <div class="border-b-2 focus-within:border-green-500 flex w-5/12">
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
        <div class="flex xs:flex-col">
        <div class="xs:w-full sm:w-8/12 max-w-sm overflow-hidden space-y-6 mx-5">
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
        <div class="w-full sm:w-8/12 max-w-sm overflow-hidden space-y-6 mx-5">
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
    <div class="mx-5 sm:mt-3 mb-5">
        <div class="border-b-2 focus-within:border-green-500 flex ">
            <label for="name" class="px-2">Comment:</label>
            <input type="text" name="name" bind:value={report.comment} placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
        </div>
    </div>
    <div class="mx-5 mb-5">
        <div class="border-b-2 focus-within:border-green-500 flex ">
            <label for="name" class="px-2">Comment:</label>
            <input type="text" name="name" bind:value={report.comment} placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
        </div>
    </div>
    <div class="mx-5 mb-5">
        <div class="my-4 focus-within:border-green-500 items-center justify-center">
            <button class="bg-green-800 text-gray px-2 py-1 rounded w-full text-white  font-bold focus:outline-none" type="submit">ADD NEW</button>
        </div>
    </div>
    </form>
</div>