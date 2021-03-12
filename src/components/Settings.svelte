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
   <div>
       <div class="px:2 m-2 md:px-5 md:m-5 md:mt-1">
           <h1 class="text-xl font-semibold text-center md:text-left">Profile Settings</h1>
       </div>
       <div class="w-full bg-white rounded border px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 md:flex">
           <div>
               
           </div>    
       </div>
   </div>