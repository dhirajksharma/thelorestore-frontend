import { Fragment } from "react";

export default function Profile({user, logoutHandler}){
    return (
        <Fragment>
            <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Name</h3>
            <h2 className="mb-3 font-serif tracking-wider text-slate-900">
            {user.name}
            </h2>
            <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Email Address</h3>
            <h2 className="mb-3 font-serif tracking-wider text-slate-900">
            {user.email}
            </h2>
            <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Role</h3>
            <h2 className="mb-3 font-serif tracking-wider text-slate-900">
            {user.role}
            </h2>
            <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Phone Number</h3>
            <h2 className="mb-3 font-serif tracking-wider text-slate-900">
            {user.phone?user.phone:""}
            </h2>

            <h3 className="mt-5 mb-1 font-['Montserrat'] font-medium text-gray-500 uppercase  text-text2">Address</h3>
            {user.address && <Fragment>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Local Address</h3>
            <h2 className="mb-2 font-serif tracking-wider text-slate-900">
            {user.address.localaddress}
            </h2>
            <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">Pin Code</h3>
            <h2 className="mb-2 font-serif tracking-wider text-slate-900">
            {user.address.pincode}
            </h2>
            <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">City</h3>
            <h2 className="mb-2 font-serif tracking-wider text-slate-900">
            {user.address.city}
            </h2>
            <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm text-text2">State</h3>
            <h2 className="font-serif tracking-wider text-slate-900">
            {user.address.state}
            </h2>
            </Fragment>}
            <button
            onClick={logoutHandler}
            className='border-2 border-red-600 px-2 py-1 mb-6 mt-6 font-["Montserrat"] font-medium sm:hidden'>
            Logout</button>
            </Fragment>
    )
}