import { useRouter } from "next/router";
import Link from 'next/link'
export default function Sidebar({items}){
    const router = useRouter();
    return(
        <div className="flex bg-white h-screen  shadow-md flex-col justify-between">
			<div>
	       <h2 className="text-3xl uppercase font-sans font-extrabold px-4 mb-10 mt-10">NPMG</h2>
	        <div className="flex flex-col py-4">
            {items.map((item) => (
            item.url == router.pathname ?(
                <div key={item.url}>
					<Link href={item.url}>
					<a
						className="px-4 flex flex-row items-center h-10 transform  bg-gray-200 border-r-4 border-green-600 font-semibold"
					>
						{item.name}
					</a>
					</Link>
				</div>
            ):(
                <div key={item.url}>
					<Link href={item.url}>
					<a
						className="px-4 flex flex-row items-center h-10 transform  text-gray-800 hover:text-motherGreen"
					>
						{item.name}
					</a>
					</Link>
				</div>
            )
            ))}
			</div>
		</div>
		<div className="mb-0 bg-successorColor grid justify-items-center">
		<Link href="/signin">
			<a
				className="text-white font-semibold px-4 py-2.5 text-center bottom-0 cursor-pointer font-sourceSans"
				>Logout</a
			>
		</Link>
		</div>
	
</div>
    )
}