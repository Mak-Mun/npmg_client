export default function Ceremonies(){
    return (
    <div className="flex flex-col w-full unlimited">
	<div className="w-full">
		<div className="bg-green-600 rounded p-4 cursor-pointer">
			<h3 className="text-white">New Ceremony</h3>
		</div>
	</div>
	<div className="w-full">
		<table className="w-full justify-between mt-0">
			<thead className="w-full">
				<tr className="justify-between">
					<th className="p-4 w-1/6">Year</th>
					<th className="p-4 w-1/6">Special Guests</th>
					<th className="p-4 w-1/6">Gorillas named</th>
					<th className="p-4 w-1/6">Namers</th>
					<th className="p-4 w-1/6">Full Date</th>
					<th className="p-4 w-1/6">Location</th>
				</tr>
			</thead>
			<tbody className="w-full">
				<tr className="mt-3 justify-between bg-white border-b hover:bg-green-100 transition-all cursor-pointer ">
					<td className="text-center p-4 w-1/6">2020</td>
					<td className="text-center p-4 w-1/6">18</td>
					<td className="text-center p-4 w-1/6 text-sm">27</td>
					<td className="text-center w-1/6 text-sm">27</td>
					<td className="text-center p-4 w-1/6">22<sup>nd</sup> September</td>
					<td className=" text-center p-4 w-1/6">Kinigi</td>
				</tr>
				<tr className="mt-3 justify-between bg-white border-b hover:bg-green-100 transition-all cursor-pointer ">
					<td className="text-center p-4 w-1/6">2019</td>
					<td className="text-center p-4 w-1/6">18</td>
					<td className="text-center p-4 w-1/6 text-sm">27</td>
					<td className="text-center w-1/6 text-sm">27</td>
					<td className="text-center p-4 w-1/6">22<sup>nd</sup> September</td>
					<td className=" text-center p-4 w-1/6">Kinigi</td>
				</tr>
				<tr className="mt-3 justify-between bg-white border-b hover:bg-green-100 transition-all cursor-pointer ">
					<td className="text-center p-4 w-1/6">2018</td>
					<td className="text-center p-4 w-1/6">18</td>
					<td className="text-center p-4 w-1/6 text-sm">27</td>
					<td className="text-center w-1/6 text-sm">27</td>
					<td className="text-center p-4 w-1/6">22<sup>nd</sup> September</td>
					<td className=" text-center p-4 w-1/6">Kinigi</td>
				</tr>
				<tr className="mt-3 justify-between bg-white border-b hover:bg-green-100 transition-all cursor-pointer ">
					<td className="text-center p-4 w-1/6">2017</td>
					<td className="text-center p-4 w-1/6">18</td>
					<td className="text-center p-4 w-1/6 text-sm">27</td>
					<td className="text-center w-1/6 text-sm">27</td>
					<td className="text-center p-4 w-1/6">22<sup>nd</sup> September</td>
					<td className=" text-center p-4 w-1/6">Kinigi</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
)
}