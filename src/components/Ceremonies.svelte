<div class="flex flex-col w-full unlimited">
    <div class="w-full">
        <div class="bg-green-600 rounded p-2 cursor-pointer"><h3 class="text-white">New Ceremony</h3></div>
    </div>
    <div class="w-full">
        <table class="w-full justify-between mt-0">
            <thead class="w-full">
                <tr class="justify-between">
                    <th class="p-4 w-1/6">Year</th>
                    <th class="p-4 w-1/6">Special Guests</th>
                    <th class="p-4 w-1/6">Gorillas named</th>
                    <th class="p-4 w-1/6">Namers</th>
                    <th class="p-4 w-1/6">Full Date</th>
                    <th class="p-4 w-1/6">Location</th>
                </tr>
            </thead>
            <tbody class="w-full">
                <tr class="mt-3 justify-between bg-white border-b-2 cursor-pointer ">
                    <td class="text-center p-4 py-8 w-1/6">2020</td>
                    <td class="text-center p-4 w-1/6">18</td>
                    <td class="text-center p-4 w-1/6 text-sm">27</td>
                    <td class="text-center w-1/6 text-sm">27</td>
                    <td class="text-center p-4 w-1/6">22<sup>nd</sup> September</td>
                    <td class=" text-center p-4 w-1/6">Kinigi</td>
                </tr>
                <tr class="mt-3 justify-between bg-white border-b-2 cursor-pointer ">
                    <td class="text-center p-4 py-8 w-1/6">2019</td>
                    <td class="text-center p-4 w-1/6">18</td>
                    <td class="text-center p-4 w-1/6 text-sm">27</td>
                    <td class="text-center w-1/6 text-sm">27</td>
                    <td class="text-center p-4 w-1/6">22<sup>nd</sup> September</td>
                    <td class=" text-center p-4 w-1/6">Kinigi</td>
                </tr>
                <tr class="mt-3 justify-between bg-white border-b-2 cursor-pointer ">
                    <td class="text-center p-4 py-8 w-1/6">2018</td>
                    <td class="text-center p-4 w-1/6">18</td>
                    <td class="text-center p-4 w-1/6 text-sm">27</td>
                    <td class="text-center w-1/6 text-sm">27</td>
                    <td class="text-center p-4 w-1/6">22<sup>nd</sup> September</td>
                    <td class=" text-center p-4 w-1/6">Kinigi</td>
                </tr>
                <tr class="mt-3 justify-between bg-white border-b-2 cursor-pointer ">
                    <td class="text-center p-4 py-8 w-1/6">2017</td>
                    <td class="text-center p-4 w-1/6">18</td>
                    <td class="text-center p-4 w-1/6 text-sm">27</td>
                    <td class="text-center w-1/6 text-sm">27</td>
                    <td class="text-center p-4 w-1/6">22<sup>nd</sup> September</td>
                    <td class=" text-center p-4 w-1/6">Kinigi</td>
                </tr>
                
                </tbody>	
        </table>
    </div>
</div>
<script type="ts">
</script>
<style>
     .unlimited {
      height: 75vh;
      overflow-y: auto;
    }
    div *::-webkit-scrollbar {
      width: 4px;
      display: none;
    }
    div *::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(197, 119, 119, 0.3);
    }
  
    div::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
    @media only screen and (max-height: 550px) {
      .unlimited {
        height: fit-content;
        width: fit-content;
      }
    }
    @media only screen and (max-width: 600px) {
      .unlimited {
        height: fit-content;
        width: fit-content;
      }
    }
</style>