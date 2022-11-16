import {React, useEffect, useState, useRef, Fragment, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPass } from '../../actions/userAction';
import Loader from '../elements/Loader';
import {toast} from 'react-toastify';
import Metadata from "../elements/Metadata";
import NavContext from '../elements/NavContext';

const Resetpassword=()=>{
    const dispatch=useDispatch();
    const {token}=useParams();
    const navigate=useNavigate();
    const {error, success, loading}=useSelector((state)=>state.forgotPassword)
    const [passdetails, setPassDetails]=useState({password:"", confirmpassword:""});
    const {serverError}=useContext(NavContext);
    const handleResetPass=(e)=>{
        e.preventDefault();
        dispatch(resetPass(passdetails, token));
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success){
            toast.success("Password Reset Successful");
            navigate('/login');
        }

    },[dispatch, error, success]);
    const loadRef=useRef(loading);
    loadRef.current=loading;
    const serverRef=useRef(serverError);
    serverRef.current=serverError;

    const traffcheck=()=>{
        setTimeout(()=>{
            if(loadRef.current===true && serverRef.current!==1)
            toast('Boy! It\'s taking longer than usual. Bangalore traffic I guess 😅😅', {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId:"traffcheck"
                });
        },8000)
    }

    return (
        <div className='mx-4 sm:mx-9'>
            <Metadata title="The Lore Store | Reset Password" nav={3}/>
            {loading ?(
                        <Fragment>
                        <Loader/>
                        {traffcheck()}
                        </Fragment>
            ):(
                <div className='grid items-center justify-items-center h-[90vh]'>
                <form onSubmit={handleResetPass}
                    className="font-serif">
                        <h1 className='font-["Montserrat"] font-medium text-center mb-4 text-lg'>Update Your Password Now</h1>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={passdetails.password}
                            onChange={(e)=>setPassDetails(passdetails=>({...passdetails, password: e.target.value}))}
                            className="block text-center mb-4 tracking-wider border-b w-full"
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={passdetails.confirmpassword}
                            onChange={(e)=>setPassDetails(passdetails=>({...passdetails, confirmpassword: e.target.value}))}
                            className="block text-center mb-4 tracking-wider border-b w-full"
                        />
                        <button type='submit' className="tracking-wider mt-4 border-2 border-gray-500 hover:bg-gray-100 active:bg-gray-200 active:border-gray-300 w-full">Reset Your Password</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Resetpassword;