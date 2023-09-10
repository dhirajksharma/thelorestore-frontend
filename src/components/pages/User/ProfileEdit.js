import { Fragment } from "react";

export default function ProfileEdit({UpdateProfileHandler, profileDetails, setProfileDetails}){
    return (
    <Fragment>
        <form onSubmit={UpdateProfileHandler}>
        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Name</h3>
            <input
                type="text"
                placeholder="Name"
                value={profileDetails.name}
                pattern="[a-zA-Z ]*$"
                className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b border-secondary-button bg-background"
                onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, name: e.target.value}))}
            />
        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Email Address</h3>
            <input
                type="text"
                placeholder="Email"
                value={profileDetails.email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b border-secondary-button bg-background"
                onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, email: e.target.value}))}
            />
        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Phone Number</h3>
            <input
                type="text"
                placeholder="Phone"
                value={profileDetails.phone}
                pattern="[789][0-9]{9}"
                className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b border-secondary-button bg-background"
                onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, phone: e.target.value}))}
            />
        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Role</h3>
            <select
                className='-ml-1'
                value={profileDetails.role}
                onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, role: e.target.value}))}>
                <option value="user">User</option>
                <option value="seller">Seller</option>
            </select>
        <h3 className="mt-5 mb-1 font-['Montserrat'] font-medium text-gray-500 uppercase ">Address</h3>
        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Local Address</h3>
            <input
                type="text"
                placeholder="Local Address"
                value={profileDetails.address.localaddress}
                className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b border-secondary-button bg-background"
                onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, address:{...profileDetails.address, localaddress: e.target.value}}))}
            />
        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Pin Code</h3>
        <input
            type="text"
            placeholder="Pincode"
            value={profileDetails.address.pincode}
            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b border-secondary-button bg-background"
            onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, address:{...profileDetails.address, pincode: e.target.value}}))}
        />
        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">City</h3>
            <input
                type="text"
                placeholder="City"
                value={profileDetails.address.city}
                className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b border-secondary-button bg-background"
                onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, address:{...profileDetails.address, city: e.target.value}}))}
            />
        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">State</h3>
            <input
                type="text"
                placeholder="State"
                value={profileDetails.address.state}
                className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b border-secondary-button bg-background"
                onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, address:{...profileDetails.address, state: e.target.value}}))}
            />
            <button type='submit' className='p-2 bg-yellow-400 hover:bg-yellow-300 rounded-md block mt-4 mb-3 font-["Montserrat"] font-medium'>Update Profile</button>
        </form>
    </Fragment>)
}