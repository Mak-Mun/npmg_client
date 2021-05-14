export default function NewReport(){
    return(
        <div className="flex flex-col justify-center bg-white p-6">
    <h1 className="font-bold px-4 md:text-2xl mb-6">NEW REPORT</h1>
    <form className="flex flex-col mt-4">
        <div className="mx-1 md:mx-5 mb-2">
            <div className="ml-1 md:ml-4 flex md:w-5/12">
                <label  className="px-2">Gorilla:</label>
                <select  className="px-4 block w-full appearance-none focus:outline-none rounded-sm bg-transparent border-b-2 border-black focus:border-green-500 focus:font-semibold">
                </select>
            </div>
            <div className="flex flex-wrap">
                <div className="sm:w-full ml-1 md:ml-4 flex md:w-5/12 mt-4">
                    <label  className="px-2">Head:</label>
                    <select   className="px-4 block w-full appearance-none focus:outline-none rounded-sm bg-transparent border-b-2 border-black focus:border-green-500 focus:font-semibold">
                    </select>
                </div> 
            <div className=" sm:w-full md:w-5/12 mt-4 flex md:ml-4">
                <label className="px-2">Lungs:</label>
                <select   className="px-4 block w-full appearance-none focus:outline-none rounded-sm bg-transparent border-b-2 border-black focus:border-green-500 focus:font-semibold">
                </select>
            </div>
            <div className=" sm:w-full md:w-5/12 flex mt-4 md:ml-4">
                <label className="px-2">Heart:</label>
                <select  className="px-4 block w-full appearance-none focus:outline-none rounded-sm bg-transparent border-b-2 border-black focus:border-green-500 focus:font-semibold">
                </select>
            </div>
            <div className=" sm:w-full md:w-5/12 mt-4 flex md:ml-4">
                <label className="px-2">Legs:</label>
                <select className="px-4 block w-full appearance-none focus:outline-none rounded-sm bg-transparent border-b-2 border-black focus:border-green-500 focus:font-semibold">
                     
                </select>
            </div>
            <div className=" sm:w-full md:w-5/12 flex mt-4 md:ml-4">
                <label  className="px-2">Eyes:</label>
                <select   className="px-4 block w-full appearance-none focus:outline-none rounded-sm bg-transparent border-b-2 border-black focus:border-green-500 focus:font-semibold">
                    
                </select>
            </div>
            <div className=" sm:w-full md:w-5/12 mt-4 flex md:ml-4">
                <label className="px-2">Stomach:</label>
                <select  className="px-4 block w-full appearance-none focus:outline-none rounded-sm bg-transparent border-b-2 border-black focus:border-green-500 focus:font-semibold">
                </select>
            </div>
            
            </div>
        </div>
        <div className="md:flex">
    </div>
    <div className="mx-5 mb-5 md:ml-40">
        <div>
            <span className="mx-2 text-xs">Files</span>
        </div>
        <div className="focus-within:border-green-500 flex ">
            <label className="w-20 md:w-35 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <input type='file' className="hidden" />
            </label>
        </div>
    </div>
    <div className="mx-5 mb-5 md:ml-40">
        <div className="my-4 mx-auto focus-within:border-green-500">
            <button className="bg-green text-gray px-2 py-1 rounded w-full md:w-5/12 text-white  font-bold focus:outline-none" type="submit">Save report</button>
        </div>
    </div>
    </form>
</div>
    )
}