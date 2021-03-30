<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
  </script> 
  <Tabs>
    <TabList>
      <Tab>One</Tab>
      <Tab>Two</Tab>
    </TabList>
   
    <TabPanel>
      <h2>Panel One</h2>
    </TabPanel>
   
    <TabPanel>
      <h2>Panel Two</h2>
    </TabPanel>
  </Tabs>
<div class="w-full flex flex-col">
        <ul class="w-full flex items-center mx-auto md:mb-4">
            <li class="w-1/2 text-center font-semibold cursor-pointer">Ceremonies</li>
            <li class="w-1/2 text-center font-semibold cursor-pointer text-green-600">Namers</li>
        </ul>
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
</div>

<style>
    :global(.svelte-tabs li.svelte-tabs__selected){
        border-bottom: 4px solid green;
        color: green;
        font-weight: 800;
    }
    :global(.svelte-tabs li){
        border-bottom: 2px solid teal;
        padding-left: 10px;
        padding-right: 20px;
        font-weight: 800;
    }
</style>