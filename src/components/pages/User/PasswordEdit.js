import { Fragment } from "react";

export default function PasswordEdit({UpdatePassHandler, passdetails, setPassDetails}){
    return (
        <Fragment>
            <form onSubmit={UpdatePassHandler}>
                <h3 className="font-['Montserrat'] font-medium text-gray-700 uppercase text-sm text-text2">Old Password</h3>
                <input
                    required
                    type="password"
                    placeholder="Old Password"
                    value={passdetails.oldPassword}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b border-secondary-button bg-background"
                    onChange={(e)=>setPassDetails(passdetails=>({...passdetails, oldPassword: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-700 uppercase text-sm mt-2 text-text2">New Password</h3>
                <input
                    required
                    type="password"
                    placeholder="New Password"
                    value={passdetails.newPassword}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b border-secondary-button bg-background"
                    onChange={(e)=>setPassDetails(passdetails=>({...passdetails, newPassword: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-700 uppercase text-sm mt-2 text-text2">Confirm New Password</h3>
                <input
                    required
                    type="password"
                    placeholder="Confirm New Password"
                    value={passdetails.confirmPassword}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b border-secondary-button bg-background"
                    onChange={(e)=>setPassDetails(passdetails=>({...passdetails, confirmPassword: e.target.value}))}
                />
                <button type='submit' className='p-2 bg-yellow-400 hover:bg-yellow-300 rounded-md block mt-4 mb-3 font-["Montserrat"] font-medium'>Update Password</button>
            </form>
        </Fragment>
    )
}