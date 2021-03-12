<script lang="ts">
    let photoUrl:string = "https://avatars.githubusercontent.com/u/784056?s=64&v=4";
   </script>
   <style>
   .bg-green{
       background-color:#00917C;
       color: white;
   }
   .text-red-500{
       color: red;
   }
   .text-s-xl{
       font-size: 17px;
   }
   .longer{
    height: 90vh;
   }
   @media only screen and (max-height: 340px) {
  .longer{
    height: fit-content;
    width: fit-content;
   }
   }
   @media only screen and (max-width: 700px) {
    .longer{
    height: fit-content;
    width: fit-content;
   }
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
       <div class="bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 md:flex w-5/6 longer">
           <div class="mr-10 mt-2">
               <ul>
                   <li class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1 text-motherGreen">Profile</li>
                   <li class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1">Notifications</li>
                   <li class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1">Password</li>
                   <li class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1">Messages</li>
               </ul>
           </div>    
           <div class="rounded shadow w-4/5 h-full md:ml-4 mt-2 flex flex-col">
               <h1 class="text-center font-semibold text-xl">Account</h1>
               <div class="mt-6 mx-auto">
                <img class="w-20 h-20 rounded-full"
                    src={photoUrl}
                    alt="" />
                    <div class="flex -ml-10 mt-1">
                    <button class="border border-green-500 text-green-500 p-1 px-2 mx-1 focus:outline-none rounded shadow">Upload</button>
                    <button class="border border-red-500 text-red-500 p-1 px-2 mx-1 shadow rounded focus:outline-none ">Remove</button>
                    </div>
                </div>
                <div class="flex flex-col items-center mx-auto">
                    <label for="name" class="-ml-3" >Add Bio</label>
                    <textarea name="Bio" placeholder="This is my bio" class="h-10 w-20"></textarea>
                </div>
           </div>
       </div>
   </div>