import { useRouter } from "next/router";
export default function Sidebar({items}){
    const router = useRouter();
    return(
        <div className="flex bg-white h-screen  shadow-md flex-col">
	<h2 className="text-3xl uppercase font-sans font-extrabold px-4 mt-16 mb-16">NPMG</h2>
	<div className="flex flex-col py-4">
    {items.map((item) => (
            item.url == router.pathname ?(
                <div key={item.url}>
					<a
						href={item.url}
						className="px-4 flex flex-row items-center h-12 transform  bg-gray-200 border-r-4 border-green-600 font-semibold"
					>
						{item.name}
					</a>
				</div>
            ):(
                <div key={item.url}>
					<a
						href={item.url}
						className="px-4 flex flex-row items-center h-12 transform  text-gray-800 hover:text-motherGreen"
					>
						{item.name}
					</a>
				</div>
            )
            ))}
		<div>
			<a
				href="/auth/signin"
				className="text-red-500 font-semibold px-4 py-4 text-center bottom-0 cursor-pointer font-sourceSans"
				>Logout</a
			>
		</div>
	</div>
</div>
    )
}