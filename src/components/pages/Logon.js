import Loader from "../elements/Loader";
import { React, Fragment, useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login, register, clearErrors } from "../../actions/userAction";
import {toast} from 'react-toastify';

const Logon = ()=>{
    
    const navigate=useNavigate();
    const [formType, setFormType]=useState('login');
    const [logindetails, setLoginDetails]=useState({email:"", password:""});
    const [registerdetails, setRegisterDetails]=useState({name:"", email:"", password:""});
    const dispatch=useDispatch();
    const {user,loading, isAuthenticated, error}=useSelector(state=> state.user)
    const [colorbtn, setColorBtn]=useState(1);

    useEffect(()=>{
        if(loading===false && isAuthenticated===true)
            navigate('/me')
        if(error){
            toast.error(error);
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

    return(
        <div id="logon" className="mx-4 sm:mx-9 h-[90vh] flex items-center justify-center">
                {loading ?(
                <Loader/>
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
                                <button type='submit' className="tracking-wider mt-4 border-2 border-gray-500 hover:bg-gray-100 active:bg-gray-200 active-bg-gray-300">Login</button>
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
                                <button type='submit' className="tracking-wider mt-4 border-2 border-gray-500 hover:bg-gray-100 active:bg-gray-200 active-bg-gray-300">Register</button>
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