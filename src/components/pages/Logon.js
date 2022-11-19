import Loader from "../elements/Loader";
import { React, Fragment, useState, useEffect, useRef, useContext } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login, register, clearErrors } from "../../actions/userAction";
import {toast} from 'react-toastify';
import Metadata from "../elements/Metadata";
import NavContext from "../elements/NavContext";

const Logon = ()=>{
    
    const navigate=useNavigate();
    const [formType, setFormType]=useState('login');
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
            toast('🐢 Boy! It\'s taking longer than usual. Please wait while we do something...', {
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
        <div id="logon" className="mx-4 sm:mx-9 h-[90vh] flex items-center justify-center">
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
                        <div className="">
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
                                    className="block text-center mb-1 tracking-wider border-b"
                                />
                                <input
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={logindetails.password}
                                    onChange={(e)=>setLoginDetails(logindetails=>({...logindetails, password: e.target.value}))}
                                    className="block text-center mb-2 tracking-wider border-b"
                                />
                                <button type='submit' className="tracking-wider mt-4 border-2 border-[#f7735c]  hover:bg-gray-100 active:bg-gray-200 active:border-gray-300">Login</button>
                            </form>
                        </div>
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
                                    className="block text-center mb-2 tracking-wider border-b"
                                />
                                <input
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={registerdetails.email}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                    onChange={(e)=>setRegisterDetails(registerdetails=>({...registerdetails, email: e.target.value}))}
                                    className="block text-center mb-2 tracking-wider border-b"
                                />
                                <input
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={registerdetails.password}
                                    onChange={(e)=>setRegisterDetails(registerdetails=>({...registerdetails, password: e.target.value}))}
                                    className="block text-center mb-4 tracking-wider border-b"
                                />
                                <button type='submit' className="tracking-wider mt-4 border-2 border-[#f7735c]  hover:bg-gray-100 active:bg-gray-200 active:border-gray-300">Register</button>
                            </form>
                        
                    )}
                </div>
                <button 
                onClick={()=>{navigate('/resetpassword')}}
                className="col-start-1 col-end-3 text-blue-600 mt-1  text-right">Forgot Password?</button>
            </div>
            )}
            </div>
    )
}

export default Logon;