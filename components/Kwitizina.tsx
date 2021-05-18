import { gql, useQuery } from '@apollo/client'
const ALL_REPORTS_QUERY = gql`
    query {
		getAllCeremonies {
			    id
				ceremony_date
				created_at
				venue
				description
				babies{
					id
				}
        }
    }
`
export default function Ceremonies(){
	const { data, loading, error } = useQuery(ALL_REPORTS_QUERY)
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
			{error && (
                <pre>
                    <code>{JSON.stringify(error, null, 4)}</code>
                </pre>
            )}
			 {loading ? (
                <p>Loading....</p>
            ) : (
                data?.getAllCeremonies.length >= 0 && (
					data?.getAllCeremonies.length == 0?(
						<p className="text-center">No reports are found</p>
					):(
                    data?.getAllCeremonies.map(ceremony => (
						<tr className="mt-3 justify-between bg-white border-b hover:bg-green-100 transition-all cursor-pointer ">
					<td className="text-center p-4 w-1/6">2020</td>
					<td className="text-center p-4 w-1/6">18</td>
					<td className="text-center p-4 w-1/6 text-sm">27</td>
					<td className="text-center w-1/6 text-sm">27</td>
					<td className="text-center p-4 w-1/6">22<sup>nd</sup> September</td>
					<td className=" text-center p-4 w-1/6">Kinigi</td>
				</tr>
					)))
                )
            )}
			</tbody>
		</table>
	</div>
</div>
)
}