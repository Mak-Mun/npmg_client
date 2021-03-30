<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
  </script> 
  <Tabs>
    <TabList>
      <Tab>Ceremonies</Tab>
      <Tab>Namers</Tab>
    </TabList>
   
    <TabPanel>
      <h2 class="text-center text-3xl">CEREMONIES</h2>
    </TabPanel>
   
    <TabPanel>
        <div
        class="bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 md:flex md:w-11/12 longer"
      >
        <table class="w-full">
            <thead>
                <tr>
                    <td></td>
                    <td class="font-semibold text-gray-700">Namer</td>
                    <td class="font-semibold text-gray-700">Contact</td>
                    <td class="font-semibold text-gray-700">Gorilla named</td>
                    <td class="font-semibold text-gray-700">More</td>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b-4">
                    <td class="py-4">1</td>
                    <td class="py-4">Didier Munezero</td>
                    <td class="py-4">0782915222</td>
                    <td class="py-4">Umucyo</td>
                    <td class="py-4">Former Pr Uganda</td>
                </tr>
                <tr class="border-b-4">
                  <td class="py-4">1</td>
                  <td class="py-4">Didier Munezero</td>
                  <td class="py-4">0782915222</td>
                  <td class="py-4">Umucyo</td>
                  <td class="py-4">Former Pr Uganda</td>
              </tr>
              <tr class="border-b-4">
                  <td class="py-4">1</td>
                  <td class="py-4">Didier Munezero</td>
                  <td class="py-4">0782915222</td>
                  <td class="py-4">Umucyo</td>
                  <td class="py-4">Former Pr Uganda</td>
              </tr>
              <tr class="border-b-4">
                  <td class="py-4">1</td>
                  <td class="py-4">Didier Munezero</td>
                  <td class="py-4">0782915222</td>
                  <td class="py-4">Umucyo</td>
                  <td class="py-4">Former Pr Uganda</td>
              </tr>
              <tr class="border-b-4">
                  <td class="py-4">1</td>
                  <td class="py-4">Didier Munezero</td>
                  <td class="py-4">0782915222</td>
                  <td class="py-4">Umucyo</td>
                  <td class="py-4">Former Pr Uganda</td>
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
    }
</style>