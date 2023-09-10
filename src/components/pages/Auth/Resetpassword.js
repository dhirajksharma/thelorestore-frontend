import {React, useEffect, useState, useRef, Fragment, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPass } from '../../../actions/userAction';
import Loader from '../../elements/Loader';
import {toast} from 'react-toastify';
import Metadata from "../../elements/Metadata";
import NavContext from '../../elements/NavContext';
import fixPass from '../../../res/4256771.jpg';
import passFixed from '../../../res/4256772.png';

const Resetpassword=()=>{
    
    const fixRef=useRef();
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
            fixRef.current.src=passFixed;
            toast.success("Password Reset Successful");
            setTimeout(function(){
                navigate('/login');
            },1500)
        }

    },[dispatch, error, success]);
    const loadRef=useRef(loading);
    loadRef.current=loading;
    const serverRef=useRef(serverError);
    serverRef.current=serverError;

    const traffcheck=()=>{
        setTimeout(()=>{
            if(loadRef.current===true && serverRef.current!==1)
            toast('🐢 The first request takes upto 30s, please wait while the server is spun up...', {
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
        <div className='mx-4 sm:mx-9 h-[90vh] flex flex-col md:flex-row justify-center md:justify-evenly items-center'>
            <Metadata title="The Lore Store | Reset Password" nav={3}/>
            {loading ?(
                        <Fragment>
                        <Loader/>
                        {traffcheck()}
                        </Fragment>
            ):(
                <Fragment>
                <img src={fixPass} ref={fixRef} className={window.innerHeight>window.innerWidth?'w-full ':'h-3/4 object-contain'}></img>                    
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
                        <button type='submit' className="tracking-wider mt-4 border-2 text-center bg-yellow-400 hover:bg-yellow-300 rounded-md font-medium px-4 py-2 w-full">Reset Your Password</button>
                    </form>
                </Fragment>
            )}
        </div>
    )
}

export default Resetpassword;