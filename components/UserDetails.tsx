export default function UserDetails(){
    let photoUrl = "https://avatars.githubusercontent.com/u/53856673?v=4";
    return (
        <div>
	<div
		className="bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 flex flex-col md:w-11/12 longer py-6"
	>
		<div className="flex flex-col items-center mx-auto mb-4">
			<img className="img rounded-full" src={photoUrl} alt="" />
			<p className="font-semibold">Makuza Mugabo Verite</p>
			<p>Conservation is life of the world.</p>
		</div>
		<div className="md:flex">
			<div className="w-full md:w-6/12 flex flex-col items-center mx-auto">
				<div className="flex flex-col items-center mx-auto">
					<h3
						className="font-bold text-xl text-greenAccent mb-3 border-b-2 border-green-700 cursor-pointer"
					>
						Verite Address
					</h3>
				</div>
				<table className="m-1 p-1">
					<tr className="mb-3">
						<td
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="#a7b1be"
								><path
									d="M12 2.02c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 12.55l-5.992-4.57h11.983l-5.991 4.57zm0 1.288l-6-4.629v6.771h12v-6.771l-6 4.629z"
								/></svg
							></td
						>
						<td className="mx-3 text-gray-600 px-2">makuzaverite@gmail.com</td>
					</tr>
					<tr className="mb-3">
						<td
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="#a7b1be"
								><path
									d="M18.48 22.926l-1.193.658c-6.979 3.621-19.082-17.494-12.279-21.484l1.145-.637 3.714 6.467-1.139.632c-2.067 1.245 2.76 9.707 4.879 8.545l1.162-.642 3.711 6.461zm-9.808-22.926l-1.68.975 3.714 6.466 1.681-.975-3.715-6.466zm8.613 14.997l-1.68.975 3.714 6.467 1.681-.975-3.715-6.467z"
								/></svg
							></td
						>
						<td className="mx-3 text-gray-600 px-2">+25078147115</td>
					</tr>
					<tr className="mb-3">
						<td
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="#a7b1be"
								><path
									d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"
								/></svg
							></td
						>
						<td className="mx-3 text-gray-600 px-2">Cyirima, Musanze</td>
					</tr>
					<tr className="mb-3">
						<td
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="#a7b1be"
								><path
									d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z"
								/></svg
							></td
						>
						<td className="mx-3 text-gray-600 px-2">Amajyambere</td>
					</tr>
					<tr className="mb-3">
						<td
							><svg
								width="20"
								height="20"
								xmlns="http://www.w3.org/2000/svg"
								fill-rule="evenodd"
								clip-rule="evenodd"
								fill="#a7b1be"
								><path
									d="M1.992 6.448c.337-.668.898-1.783 1.227-2.448.13-.261.378-.415.669-.441 1.367-.125 4.243-.339 5.429-.417.547-.036.951.045 1.301.397l2.786 2.8c.251.252.392.593.391.948l-.005 9.035 2.946 2.465 2.719-2.996c.591-.65 1.662-.435 1.942.399.938 2.817 2.603 7.81 2.603 7.81h-12l4.063-4.472-6.059-5.071-1.749-1.464 1.96 3.557c.104.188.164.396.178.608l.396 6.045c.022.354-.223.797-.787.797-.368 0-.687-.253-.77-.611-.309-1.323-1.025-4.399-1.206-5.178-.028-.12-.087-.229-.17-.319-.549-.591-2.738-2.892-2.738-2.892s-2.804 6.666-3.561 8.525c-.113.277-.374.475-.748.475-.462 0-.809-.382-.809-.803 0-.146 1.745-8.569 2.322-11.638.07-.371.239-.717.49-1l1.08-1.217-3.503-2.932c-.507-.425.137-1.192.642-.767l.961.805zm6.854 5.735l1.8 1.507 1.952 1.634-1.061-5.948-2.691 2.807zm-5.961-4.988l1.671 1.398 2.791-3.146-2.73-.183-1.732 1.931zm11.653-7.195c1.35 0 2.446 1.096 2.446 2.446s-1.096 2.445-2.446 2.445c-1.349 0-2.446-1.095-2.446-2.445 0-1.35 1.097-2.446 2.446-2.446z"
								/></svg
							></td
						>
						<td className="mx-3 text-gray-600 px-2"> 6 Years</td>
					</tr>
				</table>
			</div>
			<div className="w-full md:w-6/12 flex flex-col">
				<div className="w-full">
					<div className="flex flex-col items-center mx-auto">
						<h3
							className="text-xl font-bold text-greenAccent mb-4 border-b-2 border-green-700 cursor-pointer"
						>
							Verite Stats
						</h3>
					</div>
					<div className="flex w-full">
						<div
							className="w-4/12 flex flex-col items-center  py-4 hover:shadow-lg rounded cursor-pointer mx-2"
						>
							<div className="h-16 w-16 rounded attended" />
							<p className="text-xs text-gray-600 mt-1">Attendeed Days</p>
							<h4 className="text-xl font-semibold mt-2">2931</h4>
						</div>
						<div
							className="w-4/12 flex flex-col items-center mx-2 py-4 hover:shadow-lg rounded cursor-pointer"
						>
							<div className="h-16 w-16 rounded missed" />
							<p className="text-xs text-gray-600 mt-1">Missed Days</p>
							<h4 className="text-xl font-semibold mt-2">131</h4>
						</div>
						<div
							className="w-4/12 flex flex-col items-center mx-2 py-4 hover:shadow-lg rounded cursor-pointer"
						>
							<div className="h-16 w-16 rounded made" />
							<p className="text-xs text-gray-600 mt-1">Made Reports</p>
							<h4 className="text-xl font-semibold mt-2">457</h4>
						</div>
					</div>
				</div>
				<div className="w-4/12 flex flex-col items-center mx-auto mt-3">
					<h1 className="font-semibold text-gray-600">Languages mark</h1>
					<div className="flex">
						<span className="px-3 py-1/2 bg-gray-300 mx-1 cursor-pointer">English</span>
						<span className="px-3 py-1/2 bg-gray-300 mx-1 cursor-pointer">French</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

    )
}