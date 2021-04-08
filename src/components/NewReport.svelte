<script lang="ts">
    import { NEW_REPORT } from "../utils/Mutations"
        import client from "../utils/urql"
        import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications"
    	let statusOptions = ['NSA','SNA','NAS'];
        let gorillas = ['Amahoro','Urukundo','Cyubahiro','Byiruka','Umutuzo']
        let report = {
        gorilla:"",
		lungs: "SNA",
		heart: "SNA",
		head:"SNA",
		legs: "SNA",
		eyes:"",
		stomach:"",
        date: Date.now(),
	}
    async function handleOnSubmit() {
		await client
      .mutation(NEW_REPORT, {
        data: { ...report },
      })
      .toPromise()
      .then((r: any) => {
        console.log(r);
        notifier.success("Report added successfully!")
      })
      .catch((err) => {
        console.error({ err })
        notifier.danger("New report failed!")
      })
	}


</script>
<style>
    .text-white{
	color: #fff;
}
.bg-green{
       background-color:#00917C;
       color: white;
   }
</style>
<svelte:head>
	<title>New Report</title>
</svelte:head>
<NotificationDisplay/>
<div class="flex flex-col justify-center bg-white p-6">
    <h1 class="font-bold px-4 md:text-2xl mb-10">ADD NEW REPORT</h1>
    <form class="flex flex-col  mt-6" on:submit|preventDefault="{handleOnSubmit}">
        <div class="mx-5 mb-5 flex">
            <div class="ml-4 flex md:w-6/12">
                <label for="name" class="px-2">Gorilla:</label>
                <select  bind:value={report.gorilla} class="px-4 block w-full appearance-none focus:outline-none rounded-sm bg-transparent border-b-2 border-black focus:border-green-500 focus:font-semibold">
                    {#each gorillas as father}
                        <option value={father}>
                            {father}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col mt-4">
                <!-- <h1 class="font-bold underline">Data Inputs</h1> -->
            <div class="ml-4 flex w-full">
                <div class="sm:w-full md:w-1/2 md:flex">
                <label for="name" class="px-2">Head:</label>
                <select  bind:value={report.head} class="px-4 block w-full appearance-none focus:outline-none rounded-sm bg-transparent border-b-2 border-black focus:border-green-500 focus:font-semibold">
                    {#each gorillas as father}
                        <option value={father}>
                            {father}
                        </option>
                    {/each}
                </select>
            </div>
        </div>
            </div>
        </div>
        <div class="md:flex">
    </div>
    <div class="ml-5 mr-2 mt-3 md:mt-7 mb-5">
        <div class="border-b-2 focus-within:border-green-500 flex md:w-10/12">
            <label for="name" class="px-2">Comment:</label>
            <input type="text" name="name" placeholder=" " class="px-4 block w-full appearance-none focus:outline-none bg-transparent" />
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
            <button class="bg-green text-gray px-2 py-1 rounded w-full md:w-5/12 text-white  font-bold focus:outline-none" type="submit">Save report</button>
        </div>
    </div>
    </form>
</div>