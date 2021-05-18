import { gql, useQuery,useMutation } from '@apollo/client'
import useForm from '../lib/useForm'
import { useRouter } from 'next/router'
const ALL_GORILLAS_QUERY = gql`
    query {
        getAllNpmg {
            
				id
				name
        }
    }
`
const ALL_FAMILIES_QUERY = gql`
    query {
        getFamilies {
				id
				family_name
        }
    }
`
const NEW_GORILLA_MUTATION = gql`
  mutation ($data: NewNpmg!) {
    newNpmg(data: $data) {
      id
    }
  }
`
export default function NewGorilla(){
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    mother: '',
    father: '',
    gender: '',
    dob: '',
    family: '',
    isSilverBacked: false,
    ceremonyId: '',
  })

  const [sign, { error, loading }] = useMutation(NEW_GORILLA_MUTATION, {
    variables: { data: inputs },
    fetchPolicy: 'no-cache',
  })

  const router = useRouter()
  const families = useQuery(ALL_FAMILIES_QUERY)
  const gorillas = useQuery(ALL_GORILLAS_QUERY)
    let photoUrl = "https://avatars.githubusercontent.com/u/53856673?v=4";
    return(
        <div className="flex flex-col justify-center bg-white p-6">
  <h1 className="font-bold px-4 text-2xl mb-10">NEW GORILLA</h1>
  <form className="md:flex" onSubmit={async (e) => {
            e.preventDefault()
            try {
              const { data } = await sign()
              resetForm()
              router.push('/gorillas')
            } catch (error) {
              console.log(error)
            }
          }}>
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
        required
        name="name"
        value={inputs.name}
        onChange={handleChange}
          type="text"
          placeholder=" "
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        />
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Dob:</label>
        <input
          type="date"
          required
        name="date"
        value={inputs.date}
        onChange={handleChange}
          placeholder=""
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        />
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Mother:</label>
        <select
        required
        name="mother"
        value={inputs.mother}
        onChange={handleChange}
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value=""></option>
          {
            gorillas.data?.getAllNpmg.length >= 0 && (
              gorillas.data?.getAllNpmg.map(npmg => (
                  <option value={npmg.id}>{npmg.name}</option>
              )))
          }
        </select>
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Father:</label>
        <select
        required
        name="father"
        value={inputs.father}
        onChange={handleChange}
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value=""></option>
          {
            gorillas.data?.getAllNpmg.length >= 0 && (
              gorillas.data?.getAllNpmg.map(npmg => (
                  <option value={npmg.id}>{npmg.name}</option>
              )))
          }
        </select>
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Family:</label>
        <select
        required
        name="family"
        value={inputs.family}
        onChange={handleChange}
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value=""></option>
          {
            families?.data?.getFamilies.length >= 0 && (
              families?.data?.getFamilies.map(npmg => (
                  <option value={npmg.id}>{npmg.family_name}</option>
              )))
          }
        </select>
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Gender:</label>
        <select
        required
        name="gender"
        value={inputs.gender}
        onChange={handleChange}
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        >
          <option value="Male">MALE</option>
          <option value="Female">FEMALE</option>
        </select>
      </div>
      <div className="border-b-2 focus-within:border-green-500 flex">
        <label className="px-2">Comment:</label>
        <input
        required
        name="comment"
        value={inputs.comment}
        onChange={handleChange}
          type="text"
          placeholder=" "
          className="px-4 block w-full appearance-none focus:outline-none bg-transparent"
        />
      </div>
      <div
        className="my-4 focus-within:border-green-500 items-center justify-center"
      >
        <button
          className="bg-green-600 text-gray px-2 py-1 rounded w-full text-white  font-bold focus:outline-none"
          type="submit">ADD NEW</button>
      </div>
    </div>
  </form>
</div>

    )
}