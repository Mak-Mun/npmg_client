<svelte:head>
	<title>WELCOME</title>
</svelte:head>


<div>
    <div class="px:2 m-2 md:px-5 md:m-5 md:mt-1">
        <h1 class="text-xl font-semibold text-center md:text-left">DASHBOARD</h1>
    </div>
    <div class="rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 flex flex-col md:w-5/6 longer py-6">
		<div class="px:2 m-2 md: bg-primaryGreen rounded-xl p-3 px-5 md:py-6">
			<h1 class="text-white text-2xl font-semibold mb-2 ml-2 md:ml-5">Welcome Makuza Verite</h1>
			<h3 class="text-white text-xl ml-2 md:ml-5">Have a nice day !</h3>
		</div>
	</div>
</div>

<style>
    .attended{
        background-color: #C7FFD6;
    }
    .missed{
        background-color: #FFECEC;
    }
    .made{
        background-color: #C7F5FF;
    }
    .longer {
    height: fit-content;
  }
  .img{
    width: 120px;
    height: 120px;
  }
  @media only screen and (max-height: 340px) {
    .longer {
      height: fit-content;
      width: 100%;
    }
  }
  @media only screen and (max-width: 700px) {
    .longer {
      height: fit-content;
      width: 100%;
    }
  }
  div *::-webkit-scrollbar {
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
