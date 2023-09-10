import Loader from "../../elements/Loader";
import { React, Fragment, useState, useEffect, useRef, useContext } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login, register, clearErrors } from "../../../actions/userAction";
import {toast} from 'react-toastify';
import Metadata from "../../elements/Metadata";
import NavContext from "../../elements/NavContext";

const Logon = ()=>{
    
    const navigate=useNavigate();
    const [formType, setFormType]=useState('login');
    const guestdetails={email:"guest101@gmail.com",password:"hellohello"};
    const [logindetails, setLoginDetails]=useState({email:"", password:""});
    const [registerdetails, setRegisterDetails]=useState({name:"", email:"", password:""});
    const dispatch=useDispatch();
    const {loading, isAuthenticated, error}=useSelector(state=> state.user)
    const [colorbtn, setColorBtn]=useState(1);
    const {serverError}=useContext(NavContext);

    useEffect(()=>{
        if(loading===false && isAuthenticated===true)
            navigate('/me')
        if(error){
            toast.error(error, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                toastId:"error"
                });
            dispatch(clearErrors());
        }
    },[error, isAuthenticated, loading])

    const LoginHandler=(e)=>{
        e.preventDefault();
        dispatch(login(logindetails));
    }

    const GuestHandler=(e)=>{
        e.preventDefault();
        dispatch(login(guestdetails));
    }

    const RegisterHandler=(e)=>{
        e.preventDefault();
        dispatch(register(registerdetails))
    }

    const handleFormSwitch=(e)=>{
        console.log(e.target.value);
        if(e.target.value==="login"){
            console.log(1);
            setColorBtn(1);
        }else{
            console.log(2);
            setColorBtn(2);
        }
        setFormType(formType => e.target.value)
    }
    
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
    return(
        <div id="logon" className="mx-4 sm:mx-9 h-[90vh] flex items-center justify-center text-text">
            <Metadata title="The Lore Store | Sign In/Up" nav={3}/>
            {loading ?(
                        <Fragment>
                        <Loader/>
                        {traffcheck()}
                        </Fragment>
            ):(
            <div className="grid grid-cols-2 font-serif min-h-[300px] min-w-[250px] items-start">
                {colorbtn===1 && <button
                onClick={handleFormSwitch}
                value='login'
                className="font-['Roboto_Slab'] tracking-wider text-lg h-fit border-b border-black">Sign In</button>}
                {colorbtn!==1 && <button
                onClick={handleFormSwitch}
                value='login'
                className="font-['Roboto_Slab'] tracking-wider text-lg h-fit">Sign In</button>}
                
                {colorbtn!==2 && <button
                onClick={handleFormSwitch}
                value='register'
                className="font-['Roboto_Slab'] tracking-wider text-lg h-fit">Sign Up</button>}
                {colorbtn===2 && <button
                onClick={handleFormSwitch}
                value='register'
                className="font-['Roboto_Slab'] tracking-wider text-lg h-fit border-b border-black">Sign Up</button>}
                
                <div id='form' className="col-start-1 col-end-3 mt-4">
                    {formType==='login'?(
                        <form
                            onSubmit={LoginHandler}
                            className="flex flex-col">
                            <input
                                required
                                type="email"
                                placeholder="Email"
                                value={logindetails.email}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                onChange={(e)=>setLoginDetails(logindetails=>({...logindetails, email: e.target.value}))}
                                className="block text-center mb-1 tracking-wider border-b border-secondary-button bg-background"
                            />
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                value={logindetails.password}
                                onChange={(e)=>setLoginDetails(logindetails=>({...logindetails, password: e.target.value}))}
                                className="block text-center mb-2 tracking-wider border-b border-secondary-button bg-background"
                            />
                            <button type='submit' className="tracking-wider mt-4 mb-2 border-2 py-1 border-yellow-400 bg-yellow-400 hover:bg-yellow-300 hover:border-yellow-300 rounded-md">Login</button>
                            <button className="tracking-wider border-2 py-1 bg-gray-200 border-gray-200 hover:bg-gray-300 hover:border-gray-300 rounded-md" onClick={GuestHandler}>Login As Guest</button>
                        </form>
                        
                    ):(
                        <form onSubmit={RegisterHandler}
                        className="flex flex-col">
                            <input
                                required
                                type="text"
                                placeholder="Name"
                                value={registerdetails.name}
                                pattern="[a-zA-Z ]*$"
                                onChange={(e)=>setRegisterDetails(registerdetails=>({...registerdetails, name: e.target.value}))}
                                className="block text-center mb-2 tracking-wider border-b border-secondary-button bg-background"
                            />
                            <input
                                required
                                type="email"
                                placeholder="Email"
                                value={registerdetails.email}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                onChange={(e)=>setRegisterDetails(registerdetails=>({...registerdetails, email: e.target.value}))}
                                className="block text-center mb-2 tracking-wider border-b border-secondary-button bg-background"
                            />
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                value={registerdetails.password}
                                onChange={(e)=>setRegisterDetails(registerdetails=>({...registerdetails, password: e.target.value}))}
                                className="block text-center mb-4 tracking-wider border-b border-secondary-button bg-background"
                            />
                            <button type='submit' className="tracking-wider mt-4 mb-2 border-2 py-1 border-yellow-400 bg-yellow-400 hover:bg-yellow-300 hover:border-yellow-300 rounded-md">Register</button>
                        </form>                        
                    )}
                </div>
                <button 
                onClick={()=>{navigate('/resetpassword')}}
                className="col-start-1 col-end-3 text-blue-600 mt-1 pb-[1px] text-right hover:border-b hover:pb-0 hover:border-blue-400 w-fit">Forgot Password?</button>
            </div>
            )}
            </div>
    )
}

export default Logon;