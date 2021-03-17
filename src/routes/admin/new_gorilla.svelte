<script lang="ts">
  let gorilla = {
    name: "",
    gender: "",
    father: "",
    mother: "",
    dob: "",
    family: "",
    comment: "",
  }
  let genderOptions = ["Male", "Female"]
  let fathers = ["Amahoro", "Urukundo", "Cyubahiro", "Byiruka", "Umutuzo"]
  let family = ["Makuru", "Gahinga", "Umutungo", "Heza"]
  let photoUrl: string =
    "https://th.bing.com/th/id/OIP.C8igL9Mzx3SWR6bvi_JycQHaEK?w=282&h=180&c=7&o=5&dpr=1.5&pid=1.7"
  function handleOnSubmit() {
    console.log(gorilla)
    alert(gorilla.dob)
  }
  let  avatar, fileinput;
  const onFileSelected =(e)=>{
  let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 avatar = e.target.result
            };
}
</script>

<svelte:head>
  <title>NEW GORILLA</title>
</svelte:head>
<div class="flex flex-col justify-center bg-white p-6">
  <h1 class="font-bold px-4 text-2xl mb-10">NEW GORILLA</h1>
  <form class="md:flex" on:submit|preventDefault={handleOnSubmit}>
    <div>
      <div class="w-full md:w-9/12">
        {#if avatar}
        <img class="avatar shadow rounded max-w-full border-none gorilla" src="{avatar}" alt="d" />
        {:else}
        <img
        src={photoUrl}
        alt="..."
        class="shadow rounded max-w-full border-none gorilla"
      />
        {/if}
        
      </div>
      <div class="w-full md:w-9/12 px-4 flex mt-1 justify-between">
        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
        <span
          class="text-motherGreen border-2 border-motherGreen px-2 py-1 rounded w-full mx-0 mr-1 font-bold focus:outline-none text-center cursor-pointer"
          on:click={()=>{fileinput.click();}}>CHANGE</span
        >
        <span
          class="text-successorColor border-2 border-orange-300 px-2 py-1 rounded w-full mx-0 ml-1 font-bold focus:outline-none text-center cursor-pointer"
          on:click={()=>avatar=null}>REMOVE</span
        >
      </div>
    </div>
    <div
      class="w-full md:w-8/12 max-w-sm overflow-hidden space-y-6 mt-3 md:-mt-10"
    >
      <div class="border-b-2 focus-within:border-green-500 flex">
        <label for="name" class="px-2">Name:</label>
        <input
          type="text"
          name="name"
          bind:value={gorilla.name}
          placeholder=" "
          class="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        />
      </div>
      <div class="border-b-2 focus-within:border-green-500 flex">
        <label for="name" class="px-2">Dob:</label>
        <input
          type="date"
          placeholder=""
          bind:value={gorilla.dob}
          class="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        />
      </div>
      <div class="border-b-2 focus-within:border-green-500 flex">
        <label for="name" class="px-2">Mother:</label>
        <select
          bind:value={gorilla.mother}
          class="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value="">--mothers--</option>
          {#each fathers as father}
            <option value={father}>
              {father}
            </option>
          {/each}
        </select>
      </div>
      <div class="border-b-2 focus-within:border-green-500 flex">
        <label for="name" class="px-2">Father:</label>
        <select
          bind:value={gorilla.father}
          class="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value="">--fathers--</option>
          {#each fathers as father}
            <option value={father}>
              {father}
            </option>
          {/each}
        </select>
      </div>
      <div class="border-b-2 focus-within:border-green-500 flex">
        <label for="name" class="px-2">Family:</label>
        <select
          bind:value={gorilla.family}
          class="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value="">--genders--</option>
          {#each family as option}
            <option value={option}>
              {option}
            </option>
          {/each}
        </select>
      </div>
      <div class="border-b-2 focus-within:border-green-500 flex">
        <label for="name" class="px-2">Gender:</label>
        <select
          bind:value={gorilla.gender}
          class="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value="">--gender--</option>
          {#each genderOptions as genderOption}
            <option value={genderOption}>
              {genderOption}
            </option>
          {/each}
        </select>
      </div>
      <div class="border-b-2 focus-within:border-green-500 flex">
        <label for="name" class="px-2">Comment:</label>
        <input
          type="text"
          name="comment"
          placeholder=" "
          bind:value={gorilla.comment}
          class="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        />
      </div>
      <div
        class="my-4 focus-within:border-green-500 items-center justify-center"
      >
        <button
          class="bg-green text-gray px-2 py-1 rounded w-full text-white  font-bold focus:outline-none"
          type="submit">ADD NEW</button
        >
      </div>
    </div>
  </form>
</div>

<style>
  .bg-green {
    background-color: #00917c;
    color: white;
  }
  .border-motherGreen {
    border-color: #00917c;
  }
  .text-white {
    color: #fff;
  }
  .gorilla {
    width: 400px;
    height: 300px;
  }
</style>
