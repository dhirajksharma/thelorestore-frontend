import {Fragment, React, useEffect, useState, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getSellerOrders, getSellerProducts } from '../../../actions/dashboardAction';
import { loadUser, loadUserOrders, logout, updatePass, updateProfile, clearErrors, clearSuccess} from '../../../actions/userAction';
import Loader from '../../elements/Loader';
import {toast} from 'react-toastify';
import TinyDropdown from '../../elements/TinyDropdown';
import './User.css';
import NavContext from "../../elements/NavContext";
import Metadata from "../../elements/Metadata";
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import PasswordEdit from './PasswordEdit';
import UserCart from './UserCart';
import UserOrders from './UserOrders';

const User=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const { serverError, setNavOption } = useContext(NavContext);
    const {user, orders, isAuthenticated, loading, error, updateSuccess}=useSelector(state=> state.user)
    const [option, setOption]=useState('Profile')
    const taboptions=['Profile','Cart','Orders','Edit Profile','Edit Password'];
    const taboptionsSeller=['Profile','Cart','Orders','Dashboard','Edit Profile','Edit Password'];
    const [optionSelected,setOptionSelected]=useState(0);
    const [passdetails, setPassDetails]=useState({oldPassword:"", newPassword:"", confirmPassword:""});
    const [profileDetails, setProfileDetails]=useState({
        name:user.name,
        email:user.email,
        phone:user.phone?user.phone:"",
        role:user.role,
        address:user.address?user.address:{
            localaddress:"",
            state:"",
            city:"",
            pincode:""
        },
    })
    // let cost=0;
    useEffect(()=>{
        if(isAuthenticated===false)
            navigate('/login')
        
        dispatch(loadUser());
        dispatch(loadUserOrders());
        dispatch(getSellerProducts());
        dispatch(getSellerOrders());
        
        setProfileDetails({
            name:user.name,
            email:user.email,
            phone:user.phone?user.phone:"",
            role:user.role,
            address:user.address?user.address:{
                localaddress:"",
                state:"",
                city:"",
                pincode:""
            },
        })

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
        if(updateSuccess){
            toast.success("Update Succeful!", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                toastId:"success"
                });
            dispatch(clearSuccess());
            setPassDetails({oldPassword:"", newPassword:"", confirmPassword:""});
        }
    },[dispatch,error,updateSuccess, isAuthenticated, navigate]);

    const handleToggle=(e)=>{
        if(e.target.innerHTML==='Logout'){
            dispatch(logout());
            navigate('/')
            setNavOption(0);
            sessionStorage.setItem('NavOption',0);
        }else if(e.target.innerHTML==='Dashboard'){
            
            navigate('/me/dashboard')
        }
        else{
            setOption(option=>e.target.innerHTML)
        }
    }

    const logoutHandler=()=>{
        dispatch(logout());
        navigate('/');
        setNavOption(0);
        sessionStorage.setItem('NavOption',0);
    }

    const UserTabHandler=(option, index)=>{
        setOptionSelected(index);
        if(option==='Dashboard'){
            navigate('/me/dashboard')
        }
        setOption(option);
    }

    const UpdatePassHandler=(e)=>{
        e.preventDefault();
        dispatch(updatePass(passdetails));
    }

    const UpdateProfileHandler=(e)=>{
        e.preventDefault();
        dispatch(updateProfile(profileDetails));
    }

    const checkoutHandler=()=>{
        if(user.address && user.address.localaddress && user.address.pincode && user.address.state && user.address.city && user.phone){
        fetch(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cart:user.cart
            })
        }).then(res=>{
            if(res.ok) return res.json()
            return res.json().then(json=>Promise.reject(json))
        }).then(({url, id})=>{
            sessionStorage.setItem('checkoutSessionID',id)
            window.location.href=url
        }).catch(e=>{
            console.error(e.error)
        })}
        else{
            toast.error("Complete your profile before making a purchase", {
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
        }
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
        <div><Metadata title="The Lore Store | User Profile" nav={3}/>
            {loading ?(
                <Fragment>
                <Loader/>
                {traffcheck()}
                </Fragment>
            ):(
        <Fragment>
        <div className="mx-4 sm:mx-9 grid sm:grid-cols-[1fr_2fr] grid-rows-[min-content_auto_min-content] gap-2 h-[90vh] text-text">

        <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-serif mt-2 border-b-2 border-yellow-400 w-1/3 pb-1 col-start-1 col-end-3">User Info</h1>                

        <div id='tinyuser' className='sm:hidden'>
        <TinyDropdown
            options={user.role==='seller'?taboptionsSeller:taboptions}
            onSelect={(option, selectedIndex) => UserTabHandler(option, selectedIndex)}
            placeHolder='Profile'
            selectedIndex={optionSelected}
            cssOverrides={{
                dropdownButton: {
                    fontSize:'medium'
                },
                dropdownPanel: {
                    marginRight:"4px"
                },
                dropdownOption: {
                    fontFamily: 'serif',
                    marginBottom:'2px',
                    letterSpacing:'0.5px',
                    fontSize:'medium',
                },
                dropdownOptionSelected: {
                    fontFamily: 'serif',
                    marginBottom:'2px',
                    letterSpacing:'0.5px',
                    fontSize:'medium'
                }
                }}
        />
        </div>

        <div className="hidden sm:flex flex-col items-start font-['Montserrat'] font-medium ml-1">        
            <button onClick={handleToggle} className='hover:bg-gray-100 w-full font-serif text-left font-light mb-1 px-2 py-1 rounded-md'>Profile</button>
            <button onClick={handleToggle} className='hover:bg-gray-100 w-full font-serif text-left font-light mb-1 px-2 py-1 rounded-md'>Cart</button>
            <button onClick={handleToggle} className='hover:bg-gray-100 w-full font-serif text-left font-light mb-1 px-2 py-1 rounded-md'>Orders</button>
            {user.role==='seller' && <button onClick={handleToggle} className='hover:bg-gray-100 w-full font-serif text-left font-light mb-1 px-2 py-1 rounded-md'>Dashboard</button>}
            <button onClick={handleToggle} className='hover:bg-gray-100 w-full font-serif text-left font-light mb-1 px-2 py-1 rounded-md'>Edit Profile</button>
            <button onClick={handleToggle} className='hover:bg-gray-100 w-full font-serif text-left font-light mb-1 px-2 py-1 rounded-md'>Edit Password</button>
            <button onClick={handleToggle} className='hover:bg-gray-100 w-full font-serif text-left font-light mb-1 px-2 py-1 rounded-md'>Logout</button>
        </div>
        

        <div className="sm:w-[75vw]">
            {option==='Profile' && user && ( <Profile user={user} logoutHandler={logoutHandler}/> )}

            {option==='Edit Profile' && ( <ProfileEdit UpdateProfileHandler={UpdateProfileHandler} profileDetails={profileDetails} setProfileDetails={setProfileDetails}/> )}

            {option==='Edit Password' && ( <PasswordEdit UpdatePassHandler={UpdatePassHandler} passdetails={passdetails} setPassDetails={setPassDetails}/> )}

            {option==='Cart' && ( <UserCart user={user} checkoutHandler={checkoutHandler}/> )}

            {option==='Orders' && loading===false && ( <UserOrders orders={orders} /> )}
        </div>
    </div>
    </Fragment>
    )}
    </div>
    )
}

export default User;