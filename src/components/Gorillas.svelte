<script lang="ts">
    let photoUrl:string = "https://avatars.githubusercontent.com/u/784056?s=64&v=4";
    let integers = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15]
   </script>
   <style>
   .unlimited{
       height: 100vh;
   }
   .limitedTable{
       height: 75vh;
   }
   @media only screen and (max-height: 550px) {
     .unlimited {
       height: fit-content;
     }
   }
   @media only screen and (max-height: 340px) {
     .limitedTable{
         height: fit-content;
     }
   }
   .bg-green{
       background-color:#00917C;
       color: white;
   }
   div *::-webkit-scrollbar{
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
   <svelte:head>
	<title>Gorillas</title>
</svelte:head>
   <div>
       <div class="px:2 m-2 md:px-5 md:m-5 md:mt-1">
           <h1 class="text-xl font-semibold text-center md:text-left">LISTING</h1>
       </div>
   <div class="w-full md:flex">
       <div class="w-full bg-white rounded border px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited">
           <div class="w-full flex mb-4 items-center justify-between">
            <h3 class="font-semibold px-3 py-1 text-xl">Ranger listing</h3>
            <span class="bg-green px-3 py-2 rounded cursor-pointer md:mr-10"><a href="/admin/new_gorilla">ADD NEW</a></span>
           </div>
           <table class="text-left w-full md:px-10 border">
               <thead class="flex w-full">
                   <tr class="flex w-full justify-between bg-gray-200 px-5 border-b py-2">
                       <th class="p-3 w-1/7">#</th>
                       <th class="p-3 w-1/7">Name</th>
                       <th class="p-3 w-1/7">Dob</th>
                       <th class="p-3 w-1/7">Mother</th>
                       <th class="p-3 w-1/7">Father</th>
                       <th class="p-3 w-1/7">Namer</th>
                       <th class="p-3 w-1/7">Family</th>
                       <th class="p-3 w-1/7">Action</th>
                   </tr>
               </thead>
               <tbody class="flex flex-col items-center justify-between overflow-y-auto w-full limitedTable">
                {#each integers as int}
                <tr class="flex w-full mb-2 items-center justify-between px-5 border-b py-2">
                    <td class="p-3 py-2 w-1/7">{int}</td>
                    <td class="p-3 py-2 w-1/7"><div class="flex items-center">
                        <div class="flex-shrink-0 w-8 h-8">
                            <img class="w-full h-full rounded-full"
                                src={photoUrl}
                                alt="" />
                        </div>
                        <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                                Mak Mun
                            </p>
                        </div>
                    </div></td>
                    <td class="p-3 py-2 w-1/7">December 2018</td>
                    <td class="p-3 py-2 w-1/7">Amahoro</td>
                    <td class="p-3 py-2 w-1/7">Kagabo</td>
                    <td class="p-3 py-2 w-1/7">St Harry Kane</td>
                    <td class="p-3 py-2 w-1/7">Inzanga</td>
                    <td class="p-3 py-2 w-1/7 flex">
                        <span class="cursor-pointer font-semibold pr-1 mx-1/2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#00917C"><path d="M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z"/></svg></span>
                        <span class="cursor-pointer font-semibold pl-1 mx-1/2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#E74C3C"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/></svg></span>
                    </td>
                </tr>   
                {/each}     
               </tbody>
           </table>
       </div>
   </div>
   </div>