import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
const ALL_GORILLAS_QUERY = gql`
    query {
        getAllNpmg {
            
				id
				name
				mother
				gender
				isSilverBacked
				family
			
        }
    }
`
export default function Gorillas(){
	const { data, loading, error } = useQuery(ALL_GORILLAS_QUERY)
    let photoUrl = 'https://avatars.githubusercontent.com/u/784056?s=64&v=4';
    return(
        <div>
	<div className="w-full md:flex">
		<div className="w-full bg-white rounded pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited">
			<div className="w-full md:flex mb-4 items-center justify-between">
				<div className="md:w-4/12">
					<h3 className="font-semibold px-3 py-1 text-xl">Gorillas listing</h3>
				</div>
				<div className="flex justify-between md:w-7/12">
					{/* <Search /> */}
					<span className="px-3 py-1 font-semibold text-successorColor underline"
						>
							<Link href={"/gorillas/families"}>
							<a>View all families</a>
							</Link>
							</span
					>
					<span className="text-green-600 font-semibold underline"
						>
							<Link href={"/gorillas/new_gorilla"}>
							<a>new gorilla</a>
							</Link>
							</span
					>
				</div>
			</div>
			<table className="w-full justify-between mt-0">
				<thead className="w-full">
					<tr className="justify-between border-b hover:border-gray-800 cursor-pointer">
						<th className="p-2 text-center w-1/7" />
						<th className="p-2 text-center w-1/7">Name</th>
						<th className="p-2 text-center w-1/7">Dob</th>
						<th className="p-2 text-center w-1/7">Mother</th>
						<th className="p-2 text-center w-1/7">Father</th>
						<th className="p-2 text-center w-1/7">Namer</th>
						<th className="p-2 text-center w-1/7">Family</th>
					</tr>
				</thead>
				<tbody className="limitedTable overflow-y-auto">
				{error && (
                <pre>
                    <code>{JSON.stringify(error, null, 4)}</code>
                </pre>
            )}
			 {loading ? (
                <p>Loading....</p>
            ) : (
                data?.getAllNpmg.length >= 0 && (
					data?.getAllNpmg.length == 0?(
						<p className="text-center">No gorillas are found</p>
					):(
                    data?.getAllNpmg.map(npmg => (
						<tr key={npmg.id} className="mt-0 justify-between bg-white border-b cursor-pointer hover:border-green-400 transition-all">
							<td className="text-center p-4 w-1/7">{npmg.id}</td>
							<td className="text-center p-2 w-1/7"
								><div className="flex items-center">
									<div className="flex-shrink-0 w-8 h-8">
										<img className="w-full h-full rounded-full" src={photoUrl} alt="" />
									</div>
									<div className="ml-3">
										<p className="text-gray-900 whitespace-no-wrap">Byishimo</p>
									</div>
								</div></td
							>
							<td className="text-center p-2 w-1/7"> 12/2018</td>
							<td className="text-center p-2 w-1/7">Amahoro</td>
							<td className="text-center p-2 w-1/7">Kagabo</td>
							<td className="text-center p-2 w-1/7">Kwizigira</td>
							<td className="text-center p-2 w-1/7">Gahinga</td>
						</tr>
					)))
                )
            )}
				</tbody>
			</table>
		</div>
	</div>
</div>
    )
}