<script lang="ts">
 let photoUrl:string = "https://wallup.net/wp-content/uploads/2017/11/10/74767-mountain-ridges-Dolomites_mountains.jpg";
</script>
<svelte:head>
	<title>Reports</title>
</svelte:head>
<style>
/* .load-more{
    font-size: 16px;
    color: #F0A500;
}.text-green{
    color: green;
    background-color: white;
    font-weight: 800;
}
.text-red-500{
    color: red;
    font-weight: 800;
}div *::-webkit-scrollbar{
    width: 4px;
}
.text-green{
       color:#00917C;
   }
   .border-2{
       border-color: #e5e7e9;
   } */
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
            <h1 class="text-center font-semibold">RECENT REPORTS</h1>
        <table class="text-left w-full md:px-10">
            <thead class="flex w-full">
                <tr class="flex w-full mb-2 items-center justify-between">
                    <th class="p-3 w-1/5">#</th>
                    <th class="p-3 w-2/5">Gorilla</th>
                    <th class="p-3 w-2/5">Reporter</th>
                    <th class="p-3 w-2/5">Time</th>
                </tr>
            </thead>
            <tbody class="flex flex-col items-center justify-between overflow-y-auto w-full -mt-3">

            </tbody>
        </table>
        <div class="mt-3">
            <h4 class="font-semibold">Documents and images</h4>
            <div class="flex flex-wrap w-full space-x-3 space-y-2">
            <span></span>
            <img alt="Success Kid" src="{photoUrl}"  class="h-12 w-12 rounded cursor-pointer">
            <img alt="Success Kid" src="{photoUrl}"  class="h-12 w-12 rounded cursor-pointer">
            <img alt="Success Kid" src="{photoUrl}"  class="h-12 w-12 rounded cursor-pointer">
            </div>
        </div>
        <div class="flex -mx-3 mt-3">
            <span class="pl-2 font-bold">Reporter:</span>
            <a href="admin/rangers/ranger/3"><span class="pl-2 underline cursor-pointer">Nkusi Verite</span></a>
        </div>
    </div>
    <div class="w-full sm:w-5/6 md:5/12 lg:w-5/12 bg-white rounded border px-4 py-3 mt-4 md:mt-0 md:ml-2">
        <div class="flex flex-col">
            <h3 class="text-center text-xl cursor-pointer font-semibold">Comments and Photos</h3>
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
