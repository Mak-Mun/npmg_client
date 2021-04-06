<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import Ceremonies from './Ceremonies.svelte'
  </script> 
  <svelte:head>
    <title>Kwitizina</title>
  </svelte:head>
  <Tabs>
    <TabList>
      <Tab>Ceremonies</Tab>
      <Tab>Namers</Tab>
    </TabList>
   
    <TabPanel>
     <Ceremonies/>
    </TabPanel>
   
    <TabPanel>
        <div
        class="bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 md:flex md:w-11/12 longer"
      >
        <table class="w-full">
            <thead class="w-full">
                <tr class="justify-between">
                    <th class="p-4 w-1/5"></th>
                    <th class="p-4 w-1/5">Namer</th>
                    <th class="p-4 w-1/5">Contacts</th>
                    <th class="p-4 w-1/5">Gorillas named</th>
                    <th class="p-4 w-1/5">More</th>
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
    </TabPanel>
  </Tabs>

<style>
    :global(.svelte-tabs li.svelte-tabs__selected){
        border-bottom: 4px solid green;
        color: green;
        font-weight: 800;
    }

    :global(.svelte-tabs li.svelte-tabs__selected:focus){
        outline: 2px solid transparent;
        outline-offset: 2px;
    }
    :global(.svelte-tabs li.svelte-tabs__selected:active){
        outline: 2px solid transparent;
        outline-offset: 2px;
    }

    :global(.svelte-tabs__tab-list){
        width: 95% !important;
        border-bottom: 0px solid #423 !important;
        align-items: center !important;
        display: flex;
    }
    :global(.svelte-tabs__tab-list li){
        width: 50%;
        align-items: center !important;
    }
</style>