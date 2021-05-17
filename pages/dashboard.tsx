import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import DashBoardLayout from '../layout/DashBoardLayout'

const ProtectedLayout = dynamic(() => import('../layout/ProtectedLayout'), {
  ssr: false,
})

export default function DashBoard() {
  let integers = [1, 2, 3, 4, 5, 6];
	let newReportUrl = 'https://avatars.githubusercontent.com/u/53856673?v=4';
  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <ProtectedLayout>
        <DashBoardLayout>
        <div className="rounded px-4 pt-12 pb-1 md:px-4 md:py-3 mr-3 flex flex-col  py-6 ">
		<div className=" bg-primaryGreen w-full rounded-xl p-3 px-5 md:py-6">
			<h1 className="text-white text-2xl font-semibold mb-2 ml-2 md:ml-5">Welcome Makuza Verite</h1>
			<h3 className="text-white text-xl ml-2 md:ml-5">Have a nice day !</h3>
		</div>
	</div>
	<div className="w-full md:flex  px-4 sm:w-full md:w-full lg:w-11/12">
		<div className="md:w-8/12 px-5 mt-10">
			<div className="flex w-full justify-between mb-4">
				<h2 className="font-semibold text-xl mx-6">Daily Report</h2>
				<Link href="/reports">
				<a><h3 className="font-semibold full md:mr-10">View full</h3></a>
				</Link>
			</div>
			<div className="w-full flex flex-wrap justify-between">
				<div
					className="mt-4 md:mt-0 nw-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer"
				>
					<div className="h-32 w-24 rounded-xl bg-green-100" />
					<p className="text-xs text-gray-600 mt-2">Gorillas Found</p>
					<h4 className="text-2xl font-semibold mt-2">136</h4>
				</div>
				<div
					className="mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer"
				>
					<div className="h-32 w-24 rounded-xl bg-blue-100" />
					<p className="text-xs text-gray-600 mt-2">Gorillas pregnant</p>
					<h4 className="text-2xl font-semibold mt-2">17</h4>
				</div>
				<div
					className="mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer"
				>
					<div className="h-32 w-24 rounded-xl bg-red-100" />
					<p className="text-xs text-gray-600 mt-2 ">Gorillas Lost</p>
					<h4 className="text-2xl font-semibold mt-2">9</h4>
				</div>
			</div>
		</div>
		<div className="sm:w-full md:w-4/12 lg:w-5/12 px-5 md:px-1 mt-6 md:mt-0">
			<div className="bg-white flex flex-col pt-3 px-3 rounded-lg w-11/12">
				<div className="flex justify-between mb-1">
					<h3 className="font-semibold text-xl mx-4">Gorillas List</h3>
					<Link href="/gorillas">
					<a><h3 className="font-semibold text-sm full mx-4">View all</h3></a>
					</Link>
				</div>
				<div className="">
					{integers.map(int=>{
						<div className="mb-0 px-3 pb-1 md:px-6 flex cursor-pointer rounded items-center mx-auto">
							<img
								alt="Success Kid"
								src={newReportUrl}
								className="h-10 w-10 rounded-full cursor-pointer"
							/>
							<div className="flex flex-col pl-2">
								<span className="font-semibold text-sm">Amahoro</span>
								<span className="text-gray-500 text-sm">22 December 2020</span>
							</div>
						</div>
					})}
				</div>
			</div>
		</div>
	</div>
        </DashBoardLayout>
      </ProtectedLayout>
    </Fragment>
  )
}
