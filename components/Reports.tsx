import { useRouter } from "next/router";

export default function Reports(){
    const router = useRouter();
    let integers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
	let photoUrl =
		'https://wallup.net/wp-content/uploads/2017/11/10/74767-mountain-ridges-Dolomites_mountains.jpg';
    return (
        <div>
	<div className="px:2 m-2 md:px-5 md:m-5 md:mt-1 flex justify-between">
		<h1 className="text-xl font-semibold text-center md:text-left">REPORT VIEWS</h1>
		<p
			className="bg-primaryGreen px-4 rounded text-white text-xl font-bold cursor-pointer"
            onClick={()=>{router.push('/new_report');}}
		>
			+
		</p>
	</div>
	<div className="w-full md:flex">
		<div
			className="w-full sm:w-full md:5/12 lg:w-6/12 bg-white rounded border px-4 py-3 md:px-8 md:py-3 mr-3"
		>
			<h1 className="text-center font-semibold font-sourceSans mb-6 text-greenAccent">
				RECENT REPORTS
			</h1>
			<table className="text-left w-full md:px-10">
				<thead className="flex w-full">
					<tr className="flex w-full mb-2 items-center justify-between">
						<th className="text-center w-1/5" />
						<th className="text-center w-2/5">Gorilla</th>
						<th className="text-center w-2/5">Reporter</th>
						<th className="text-center w-2/5">Time</th>
					</tr>
				</thead>
				<tbody className="flex flex-col items-center justify-between overflow-y-auto w-full mt-3">
                {integers.map(int => (
						<tr key={int}
							className="flex w-full mb-2 items-center justify-between cursor-pointer shadow hover:text-motherGreen"
                            onClick={()=>{router.push(`/reports/report/${int}`);}}
						>
							<td className="text-center w-1/5 py-3">{int}</td>
							<td className="text-center w-2/5">Kwitonda</td>
							<td className="text-center w-2/5">Mucyo Erneste</td>
							<td className="text-center w-2/5">3 hours ago</td>
						</tr>
					))}
					<p className="cursor-pointer text-successorColor font-semibold">Load More</p>
				</tbody>
			</table>
		</div>
		<div
			className="w-full sm:w-full md:5/12 lg:w-5/12 bg-white rounded border px-4 py-3 mt-4 md:mt-0 md:ml-2"
		>
			<div className="flex flex-col">
				<h3
					className="text-center text-xl cursor-pointer font-semibold font-sourceSans text-greenAccent"
				>
					Comments and Photos
				</h3>
				<div className="w-full flex flex-col mx-auto items-center border rounded mb-2">
					<div className="flex flex-col md:w-5/6 cursor-pointer py-2">
						<p className="w-full text-center font-semibold text-sm">
							"It doesnt look health in the way it stands it looks like its leg was broken"
						</p>
						<p className="text-xs text-center">Didier on Amahoro report</p>
						<p className="text-xs text-center">3 hours ago</p>
					</div>
				</div>
				<div className="w-full flex flex-col mx-auto items-center border rounded mb-2">
					<div className="flex flex-col md:w-5/6 cursor-pointer py-2">
						<img
							alt="Success Kid"
							src={photoUrl}
							className="h-24 w-36 shadow rounded-sm cursor-pointer"
						/>
						<p className="text-xs text-center">Didier on Amahoro report</p>
						<p className="text-xs text-center">3 hours ago</p>
					</div>
				</div>
				<div className="w-full flex flex-col mx-auto items-center border rounded mb-2">
					<div className="flex flex-col md:w-5/6 cursor-pointer py-2">
						<p className="w-full text-center font-semibold text-sm">
							"It doesnt look health in the way it stands it looks like its leg was broken"
						</p>
						<p className="text-xs text-center">Didier on Amahoro report</p>
						<p className="text-xs text-center">3 hours ago</p>
					</div>
				</div>
				<div className="w-full flex flex-col mx-auto items-center border rounded mb-2">
					<div className="flex flex-col md:w-5/6 cursor-pointer py-2">
						<img
							alt="Success Kid"
							src={photoUrl}
							className="h-24 w-36 shadow rounded-sm cursor-pointer"
						/>
						<p className="text-xs text-center">Didier on Amahoro report</p>
						<p className="text-xs text-center">3 hours ago</p>
					</div>
				</div>
			</div>

			<span className="load-more font-semibold text-sm text-center mx-2 px-10 cursor-pointer"
				>Load more</span
			>
		</div>
	</div>
</div>
    )
}