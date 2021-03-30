<script lang="ts">
    let integers: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
 let photoUrl:string = "https://wallup.net/wp-content/uploads/2017/11/10/74767-mountain-ridges-Dolomites_mountains.jpg";
</script>
<svelte:head>
	<title>Reports</title>
</svelte:head>
<style>
div *::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

div::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>
<div>
    <div class="px:2 m-2 md:px-5 md:m-5 md:mt-1">
        <h1 class="text-xl font-semibold text-center md:text-left">REPORT VIEWS</h1>
    </div>
<div class="w-full md:flex">
    <div class="w-full sm:w-5/6 md:5/12 lg:w-6/12 bg-white rounded border px-4 py-3 md:px-8 md:py-3 mr-3">
            <h1 class="text-center font-semibold font-sourceSans mb-6 text-greenAccent">RECENT REPORTS</h1>
        <table class="text-left w-full md:px-10">
            <thead class="flex w-full">
                <tr class="flex w-full mb-2 items-center justify-between">
                    <th class="text-center w-1/5"></th>
                    <th class="text-center w-2/5">Gorilla</th>
                    <th class="text-center w-2/5">Reporter</th>
                    <th class="text-center w-2/5">Time</th>
                </tr>
            </thead>
            <tbody class="flex flex-col items-center justify-between overflow-y-auto w-full mt-3">
                {#each integers as int}
                <tr class="flex w-full mb-2 items-center justify-between cursor-pointer shadow hover:text-motherGreen">
                    <td class="text-center w-1/5 py-3"> <a href="/admin/reports/report/{int}">{int}</a></td>
                    <td class="text-center w-2/5">Kwitonda</td>
                    <td class="text-center w-2/5">Mucyo Erneste</td>
                    <td class="text-center w-2/5">3 hours ago</td>
                </tr>
                {/each}
                <p class="cursor-pointer text-successorColor font-semibold">Load More</p>
            </tbody>
        </table>
    </div>
    <div class="w-full sm:w-5/6 md:5/12 lg:w-5/12 bg-white rounded border px-4 py-3 mt-4 md:mt-0 md:ml-2">
        <div class="flex flex-col">
            <h3 class="text-center text-xl cursor-pointer font-semibold font-sourceSans text-greenAccent">Comments and Photos</h3>
            <div class="w-full flex flex-col mx-auto items-center border rounded mb-2">
                <div class="flex flex-col md:w-5/6 cursor-pointer py-2">
                <p class="w-full text-center font-semibold text-sm">"It doesnt look health in the way it stands it looks like its leg was broken"</p>
                <p class="text-xs text-center">Didier on Amahoro report</p>
                <p class="text-xs text-center">3 hours ago</p>
            </div>

            </div>
            <div class="w-full flex flex-col mx-auto items-center border rounded mb-2">
                <div class="flex flex-col md:w-5/6 cursor-pointer py-2">
                <img alt="Success Kid" src="{photoUrl}"  class="h-24 w-36 shadow rounded-sm cursor-pointer">
                <p class="text-xs text-center">Didier on Amahoro report</p>
                <p class="text-xs text-center">3 hours ago</p>
            </div>

            </div>
            <div class="w-full flex flex-col mx-auto items-center border rounded mb-2">
                <div class="flex flex-col md:w-5/6 cursor-pointer py-2">
                <p class="w-full text-center font-semibold text-sm">"It doesnt look health in the way it stands it looks like its leg was broken"</p>
                <p class="text-xs text-center">Didier on Amahoro report</p>
                <p class="text-xs text-center">3 hours ago</p>
            </div>

            </div>
            <div class="w-full flex flex-col mx-auto items-center border rounded mb-2">
                <div class="flex flex-col md:w-5/6 cursor-pointer py-2">
                <img alt="Success Kid" src="{photoUrl}"  class="h-24 w-36 shadow rounded-sm cursor-pointer">
                <p class="text-xs text-center">Didier on Amahoro report</p>
                <p class="text-xs text-center">3 hours ago</p>
            </div>

            </div>

        </div>

        <span class="load-more font-semibold text-sm text-center mx-2 px-10 cursor-pointer">Load more</span>
    </div>
</div>
</div>
