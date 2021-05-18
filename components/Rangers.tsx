import { gql, useQuery } from '@apollo/client'
const ALL_REPORTS_QUERY = gql`
    query {
      getAllRangersGroups {
			    id
				leaderId
				name
				description
        leader{ 
          id
        }
        }
    }
`
export default function RangersComponent(){
    let photoUrl = "https://avatars.githubusercontent.com/u/53856673?v=4";
    const { data, loading, error } = useQuery(ALL_REPORTS_QUERY)
    return (
        <div>
    <div className="w-full md:flex">
      <div
        className="w-full bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited"
      >
        <div className="w-full md:flex mb-4 items-center justify-between">
          <div className="md:w-4/12">
          <h3 className="font-semibold px-3 py-1 text-xl">Ranger listing</h3>
        </div>
          <div className="flex justify-between md:w-6/12">
          <span className="bg-green px-3 py-1 font-semibold cursor-pointer rounded-sm">Invite new</span
          >
        </div>
        </div>
        <table className="text-left w-full md:px-10">
          <thead className="w-full">
            <tr
              className="justify-between"
            >
              <th className="p-3 w-1/10"></th>
              <th className="p-3 w-1/6">Full name</th>
              <th className="p-3 w-1/6">Date joined</th>
              <th className="p-3 w-1/6">Residense</th>
              <th className="p-3 w-1/6">Group</th>
              <th className="p-3 w-1/6">Others</th>
            </tr>
          </thead>
          <tbody
          className="limitedTable overflow-y-auto"
        >
          {error && (
                <pre>
                    <code>{JSON.stringify(error, null, 4)}</code>
                </pre>
            )}
			 {loading ? (
                <p>Loading....</p>
            ) : (
                data?.getFamilies.length >= 0 && (
					data?.getFamilies.length == 0?(
						<p className="text-center">No rangers are found</p>
					):(
                    data?.getFamilies.map(family => (
                      <tr
                className="mt-3 justify-between bg-white border-b hover:border-green-400 cursor-pointer"
              >
                <td className="text-center p-3 w-1/10">{family.id}</td>
                <td className="p-3 w-1/6"
                  ><div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8">
                      <img
                        className="w-full h-full rounded-full"
                        src={photoUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">Mukera Aime</p>
                    </div>
                  </div></td
                >
                <td className="p-3 w-1/6">December 2017</td>
                <td className="p-3 w-1/6">Amahoro</td>
                <td className="p-3 w-1/6">Nkindira</td>
                <td className="p-3 w-1/6">Kwizigira</td>
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