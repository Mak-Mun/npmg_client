export default function NewGorilla(){
    let photoUrl = "https://avatars.githubusercontent.com/u/53856673?v=4";
    return(
        <div className="flex flex-col justify-center bg-white p-6">
  <h1 className="font-bold px-4 text-2xl mb-10">NEW GORILLA</h1>
  <form className="md:flex">
    <div>
      <div className="w-full md:w-9/12">
        <img
        src={photoUrl}
        alt="..."
        className="shadow rounded max-w-full border-none gorilla"
      />
        
      </div>
      <div className="w-full md:w-9/12 px-4 flex mt-1 justify-between">
        <input type="file" accept=".jpg, .jpeg, .png"/>
        <span
          className="text-motherGreen border-2 border-green-500 px-2 py-1 rounded w-full mx-0 mr-1 font-bold focus:outline-none text-center cursor-pointer">CHANGE</span
        >
        <span
          className="text-red-500 border-2 border-red-500 px-2 py-1 rounded w-full mx-0 ml-1 font-bold focus:outline-none text-center cursor-pointer">REMOVE</span>
      </div>
    </div>
    <div
      className="w-full md:w-8/12 max-w-sm overflow-hidden space-y-6 mt-3 md:-mt-10"
    >
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Name:</label>
        <input
          type="text"
          name="name"
          placeholder=" "
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        />
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Dob:</label>
        <input
          type="date"
          placeholder=""
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        />
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Mother:</label>
        <select
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value="">--mothers--</option>
        </select>
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Father:</label>
        <select
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value="">--fathers--</option>
        </select>
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Family:</label>
        <select
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value="">--genders--</option>
        </select>
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Gender:</label>
        <select
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value="">--gender--</option>
        </select>
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Comment:</label>
        <input
          type="text"
          name="comment"
          placeholder=" "
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        />
      </div>
      <div
        className="my-4 focus-within:border-green-500 items-center justify-center"
      >
        <button
          className="bg-green text-gray px-2 py-1 rounded w-full text-white  font-bold focus:outline-none"
          type="submit">ADD NEW</button
        >
      </div>
    </div>
  </form>
</div>

    )
}