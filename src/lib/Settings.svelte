<script lang="ts">
	import saved from '../../store/user';
	let user = {
		fname: 'Munezero',
		lname: 'Didier',
		email: 'didiermunezero@gmail.com',
		phone: '078324452343',
		province: 'North',
		district: 'Musanze',
		photo: '',
		bio: 'Conservation is life',
		year: '2021',
		type: 'ADMIN'
	};
	saved.USER.subscribe((value) => {
		Object.assign(user, value);
	});
	function handleOnSubmit() {
		user.type = 'ADMIN';
		saved.addUser(user);
	}
	let avatar, fileinput;
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
	};
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>
<div>
	<div
		class="bg-white w-full rounded px-4 pt-3 pb-1 md:px-8 md:py-3 md:mr-3 md:flex md:w-5/6 longer"
	>
		<div class="mr-10 mt-2">
			<ul>
				<li
					class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1 text-motherGreen"
				>
					Profile
				</li>
				<li class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1">
					Notifications
				</li>
				<li class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1">Password</li>
				<li class="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1">Messages</li>
			</ul>
		</div>
		<form
			class="rounded shadow w-full md:w-4/5 h-full md:ml-4 mt-2 flex flex-col"
			on:submit|preventDefault={handleOnSubmit}
		>
			<h1 class="text-center font-semibold text-xl md:-ml-20">Account</h1>
			<div class="mt-6 mx-auto items-center">
				<input
					style="display:none"
					type="file"
					accept=".jpg, .jpeg, .png"
					on:change={(e) => onFileSelected(e)}
					bind:this={fileinput}
				/>
				{#if avatar}
					<img class="img rounded-full" src={avatar} alt="mun" />
				{:else}
					<img src={user.photo} alt="..." class="img rounded-full" />
				{/if}
				<div class="flex mt-1">
					<span
						class="text-green-500 p-1 px-2 mx-1 focus:outline-none rounded shadow cursor-pointer"
						on:click={() => {
							fileinput.click();
						}}>Upload</span
					>
					<span
						class="border border-red-500 text-red-500 p-1 px-2 mx-1 shadow rounded focus:outline-none cursor-pointer"
						on:click={() => (avatar = null)}>Remove</span
					>
				</div>
			</div>
			<div class="mb-10">
				<div class="mt-1 mx-auto flex flex-col w-11/12 md:w-9/12">
					<label for="name" class="font-semibold ml-1">Add Bio</label>
					<textarea
						bind:value={user.bio}
						class="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full border-2 rounded focus:outline-none border-green"
						id="message"
						type="text"
						placeholder="Message..."
					/>
				</div>
				<div class="mt-1 mx-auto md:flex w-11/12 md:w-9/12">
					<div class="flex flex-col md:mx-0 md:w-6/12">
						<label for="name" class="font-semibold ml-1">First Name</label>
						<input
							bind:value={user.fname}
							type="text"
							name="fname"
							class="w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green"
						/>
					</div>
					<div class="flex flex-col md:ml-2 md:w-6/12">
						<label for="name" class="font-semibold ml-1">Last Name</label>
						<input
							bind:value={user.lname}
							type="text"
							name="lname"
							class="w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green"
						/>
					</div>
				</div>
				<div class="mt-1 mx-auto md:flex w-11/12 md:w-9/12">
					<div class="flex flex-col md:mx-0 md:w-6/12">
						<label for="name" class="font-semibold ml-1">Email</label>
						<input
							bind:value={user.email}
							type="email"
							name="email"
							class="w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green"
						/>
					</div>
					<div class="flex flex-col md:ml-2 md:w-6/12">
						<label for="name" class="font-semibold ml-1">Phone Number</label>
						<input
							bind:value={user.phone}
							type="text"
							name="phone"
							class="w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green"
						/>
					</div>
				</div>
				<div class="mt-1 mx-auto md:flex w-11/12 md:w-9/12">
					<div class="flex flex-col md:mx-0 md:w-6/12">
						<label for="name" class="font-semibold ml-1">Province</label>
						<input
							bind:value={user.province}
							type="text"
							name="province"
							class="w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green"
						/>
					</div>
					<div class="flex flex-col md:ml-2 md:w-6/12">
						<label for="name" class="font-semibold ml-1">District</label>
						<input
							bind:value={user.district}
							type="text"
							name="district"
							class="w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green"
						/>
					</div>
				</div>
				<div class="mt-1 mx-auto flex w-11/12 md:w-9/12 items-center mt-2">
					<div class="flex flex-col w-full">
						<button type="submit" class="bg-green py-1 font-semibold rounded focus:outline-none"
							>Save Changes</button
						>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	.bg-green {
		background-color: #00917c;
		color: white;
	}
	.text-red-500 {
		color: #e74c3c;
		border: 1.5px solid #e74c3c;
	}
	.text-s-xl {
		font-size: 17px;
	}
	.border-green:focus {
		border-color: #00917c;
	}
	.text-green-500 {
		color: #00917c;
		border: 1.5px solid #00917c;
	}
	.longer {
		height: fit-content;
	}
	.img {
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
