import { gql, useMutation, useQuery } from '@apollo/client'
import useForm from '../lib/useForm'
const UPDATE_PROFILE = gql`
  mutation ($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
    }
  }
`

const ME_QUERY = gql`
    query {
        me {
            
			lastName
            firstName
            email
            role
            createdAt
        }
    }
`
export default function Settings(){
	const { data} = useQuery(ME_QUERY)
	const { inputs, handleChange } = useForm({
		firstName: data?.me?.firstName,
		lastName: data?.me?.lastName,
		role: data?.me?.role,
		district: data?.me?.district,
		province: data?.me?.province,
		email: data?.me?.email,
	})
	const [updateProfile, { error, loading }] = useMutation(UPDATE_PROFILE, {
		variables: { data: inputs },
	  })
    const user = {
        photo:'https://avatars.githubusercontent.com/u/51176044?v=4'
    }
    return(
        <div>
	<div
		className="bg-white w-full rounded-sm px-4 pt-3 pb-1 md:px-8 md:py-3 md:mr-3 md:flex md:w-5/6 longer"
	>
		<div className="mr-10 mt-4 grid justify-items-center md:justify-items-start">
			<ul className="text-lg">
				<li
					className="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1 text-motherGreen"
				>
					Profile
				</li>
				<li className="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1">
					Notifications
				</li>
				<li className="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1">Password</li>
				<li className="text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1">Messages</li>
			</ul>
		</div>
		<form
		onSubmit={async (e) => {
            e.preventDefault()
            try {
              const { data, errors } = await updateProfile()
              console.log(data)
              console.log(errors)
              alert('profile updated');
            } catch (error) {
              console.log(error)
            }
          }}
			className="rounded-sm shadow w-full md:w-4/5 h-full md:ml-4 mt-2 flex flex-col"
		>
			<h1 className="text-center font-semibold text-xl md:-ml-20 mt-3">User Profile</h1>
			<div className="mt-6 grid justify-items-center">
				<input className="hidden"
					type="file"
					accept=".jpg, .jpeg, .png"
				/>
					<img src={user.photo} alt="..." className="img h-28 w-28 rounded-full" />
				<div className="flex mt-1">
					<span
						className="w-20 text-center border border-green-500 text-green-500 p-1 px-2 mx-1 focus:outline-none rounded-sm shadow cursor-pointer">Upload</span
					>
					<span
						className="w-20 text-center border border-red-500 text-red-500 p-1 px-2 mx-1 shadow rounded-sm focus:outline-none cursor-pointer"
						>Remove</span
					>
				</div>
			</div>
			<div className="mb-10">
				<div className="mt-1 mx-auto flex flex-col w-11/12 md:w-9/12">
					<label className="font-semibold ml-1">Add Bio</label>
					<textarea
						className="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full border border-gray-600  rounded-sm focus:outline-none border-green"
						id="message"
						placeholder="Ex: Excellent Ranger"
						defaultValue={data?.me?.bio}
					/>
				</div>
				<div className="mt-1 mx-auto md:flex w-11/12 md:w-9/12">
					<div className="flex flex-col md:mx-0 md:w-6/12">
						<label className="font-semibold ml-1">First name</label>
						<input
							type="text"
							name="firstName"
                            value={inputs.firstName}
                            onChange={handleChange}
							required
							className="font-sans w-full px-3 py-1.5 text-sm  border border-gray-600  rounded-sm focus:outline-none border-green"
						/>
					</div>
					<div className="flex flex-col md:ml-2 md:w-6/12">
						<label className="font-semibold ml-1">Last name</label>
						<input
							type="text"
							name="lastName"
                            value={inputs.lastName}
                            onChange={handleChange}
							required
							className="w-full px-3 py-1.5 text-sm  border border-gray-600  rounded-sm focus:outline-none border-green"
						/>
					</div>
				</div>
				<div className="mt-1 mx-auto md:flex w-11/12 md:w-9/12">
					<div className="flex flex-col md:mx-0 md:w-6/12">
						<label className="font-semibold ml-1">Email</label>
						<input
							type="email"
							name="email"
                            value={inputs.email}
                            onChange={handleChange}
							required
							className="w-full px-3 py-1.5 text-sm  border border-gray-600  rounded-sm focus:outline-none border-green"
						/>
					</div>
					<div className="flex flex-col md:ml-2 md:w-6/12">
						<label className="font-semibold ml-1">Phone number</label>
						<input
							type="text"
							name="phone"
                            value={inputs.phone}
                            onChange={handleChange}
							required
							placeholder="Please enter a phone number"
							className="w-full px-3 py-1.5 text-sm  border border-gray-600  rounded-sm focus:outline-none border-green"
						/>
					</div>
				</div>
				<div className="mt-1 mx-auto md:flex w-11/12 md:w-9/12">
					<div className="flex flex-col md:mx-0 md:w-6/12">
						<label className="font-semibold ml-1">Province</label>
						<input
							type="text"
                            value={inputs.province}
                            onChange={handleChange}
							required
							placeholder="Please add province"
							name="province"
							className="w-full px-3 py-1.5 text-sm  border border-gray-600  rounded-sm focus:outline-none border-green"
						/>
					</div>
					<div className="flex flex-col md:ml-2 md:w-6/12">
						<label className="font-semibold ml-1">District</label>
						<input
							type="text"
							name="district"
                            value={inputs.district}
                            onChange={handleChange}
							required
							placeholder="Please add district"
							className="w-full px-3 py-1.5 text-sm  border border-gray-600  rounded-sm focus:outline-none border-green"
						/>
					</div>
				</div>
				<div className="mx-auto flex w-11/12 md:w-9/12 items-center mt-2">
					<div className="flex flex-col w-full">
						<button type="submit" className="bg-green-600 text-white py-1.5 font-semibold rounded-sm focus:outline-none"
							>Save Changes</button
						>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
    )
}