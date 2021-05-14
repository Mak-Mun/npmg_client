export default function Naming(){
    let integers = [1, 2, 3, 4, 5, 6, 7];
    return(
		<div className="bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 md:flex md:w-full unlimited">
			<table className="w-full">
				<thead className="w-full">
					<tr className="justify-between">
						<th className="p-4 w-1/5" />
						<th className="p-4 w-1/5">Namer</th>
						<th className="p-4 w-1/5">Contacts</th>
						<th className="p-4 w-1/5">Gorillas named</th>
						<th className="p-4 w-1/5">More</th>
					</tr>
				</thead>
				<tbody className="w-full">
                    {integers.map(int=>(
                        <tr className="mt-3 justify-between bg-white border-b-2 cursor-pointer ">
                        <td className="text-center p-4 py-8 w-1/5">{int}</td>
                        <td className="text-center p-4 w-1/5">Osita Iheme</td>
                        <td className="text-center p-4 w-1/5 text-sm">didiermunezero@gmail.com 078324452343</td>
                        <td className="text-center w-1/5 text-sm">Cyizere</td>
                        <td className="text-center p-4 w-1/5">This is special to this one</td>
                    </tr>
                    ))}
				</tbody>
			</table>
		</div>

    )
}