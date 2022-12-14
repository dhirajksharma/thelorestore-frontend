import {Fragment, React, useEffect, useState, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getSellerOrders, getSellerProducts } from '../../actions/dashboardAction';
import { loadUser, loadUserOrders, logout, updatePass, updateProfile, clearErrors, clearSuccess} from '../../actions/userAction';
import Loader from '../elements/Loader';
import {toast} from 'react-toastify';
import TinyDropdown from '../elements/TinyDropdown';
import './User.css';
import NavContext from "../elements/NavContext";
import Metadata from "../elements/Metadata";

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
    let cost=0;
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
    },[dispatch,error,updateSuccess, isAuthenticated]);

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
        }).then(({url})=>{
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
            toast('???? Boy! It\'s taking longer than usual. Please wait while we do something...', {
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
        <div className="mx-4 sm:mx-9 grid sm:grid-cols-[1fr_2fr] grid-rows-[min-content_auto_min-content] gap-2 h-[90vh]">

        <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-serif mt-2 border-b-2 border-[#fa846f] w-1/3 pb-1 col-start-1 col-end-3">User Info</h1>                

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
                <button onClick={handleToggle} className='mb-1'>Profile</button>
                <button onClick={handleToggle} className='mb-1'>Cart</button>
                <button onClick={handleToggle} className='mb-1'>Orders</button>
                {user.role==='seller' && <button onClick={handleToggle} className='mb-1'>Dashboard</button>}
                <button onClick={handleToggle} className='mb-1'>Edit Profile</button>
                <button onClick={handleToggle} className='mb-1'>Edit Password</button>
                <button onClick={handleToggle} className='mb-1'>Logout</button>
            </div>
            

            <div className="sm:w-[75vw]">
                {option==='Profile' && user && (<Fragment>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Name</h3>
                <h2 className="mb-3 font-serif tracking-wider text-slate-900">
                {user.name}
                </h2>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Email Address</h3>
                <h2 className="mb-3 font-serif tracking-wider text-slate-900">
                {user.email}
                </h2>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Role</h3>
                <h2 className="mb-3 font-serif tracking-wider text-slate-900">
                {user.role}
                </h2>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Phone Number</h3>
                <h2 className="mb-3 font-serif tracking-wider text-slate-900">
                {user.phone?user.phone:""}
                </h2>

                <h3 className="mt-5 mb-1 font-['Montserrat'] font-medium text-gray-500 uppercase ">Address</h3>
                {user.address && <Fragment>
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Local Address</h3>
                <h2 className="mb-2 font-serif tracking-wider text-slate-900">
                {user.address.localaddress}
                </h2>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Pin Code</h3>
                <h2 className="mb-2 font-serif tracking-wider text-slate-900">
                {user.address.pincode}
                </h2>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">City</h3>
                <h2 className="mb-2 font-serif tracking-wider text-slate-900">
                {user.address.city}
                </h2>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">State</h3>
                <h2 className="font-serif tracking-wider text-slate-900">
                {user.address.state}
                </h2>
                </Fragment>}
                <button
                onClick={logoutHandler}
                className='border-2 border-red-600 px-2 py-1 mb-6 mt-6 font-["Montserrat"] font-medium sm:hidden'>
                Logout</button>
                </Fragment>)}

                {option==='Edit Profile' && (<Fragment>
                    <form onSubmit={UpdateProfileHandler}>
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Name</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={profileDetails.name}
                            pattern="[a-zA-Z ]*$"
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b"
                            onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, name: e.target.value}))}
                        />
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Email Address</h3>
                        <input
                            type="text"
                            placeholder="Email"
                            value={profileDetails.email}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b"
                            onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, email: e.target.value}))}
                        />
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Phone Number</h3>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={profileDetails.phone}
                            pattern="[789][0-9]{9}"
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b"
                            onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, phone: e.target.value}))}
                        />
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Role</h3>
                        <select
                            className='-ml-1'
                            value={profileDetails.role}
                            onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, role: e.target.value}))}>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                    <h3 className="mt-5 mb-1 font-['Montserrat'] font-medium text-gray-500 uppercase ">Address</h3>
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Local Address</h3>
                        <input
                            type="text"
                            placeholder="Local Address"
                            value={profileDetails.address.localaddress}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b"
                            onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, address:{...profileDetails.address, localaddress: e.target.value}}))}
                        />
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Pin Code</h3>
                    <input
                        type="text"
                        placeholder="Pincode"
                        value={profileDetails.address.pincode}
                        className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b"
                        onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, address:{...profileDetails.address, pincode: e.target.value}}))}
                    />
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">City</h3>
                        <input
                            type="text"
                            placeholder="City"
                            value={profileDetails.address.city}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b"
                            onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, address:{...profileDetails.address, city: e.target.value}}))}
                        />
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">State</h3>
                        <input
                            type="text"
                            placeholder="State"
                            value={profileDetails.address.state}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b"
                            onChange={(e)=>setProfileDetails(profileDetails=>({...profileDetails, address:{...profileDetails.address, state: e.target.value}}))}
                        />
                        <button type='submit' className='border-2 p-1 border-[#f7735c]  hover:bg-gray-100 active:bg-gray-200 active:border-gray-300 rounded-sm block mt-4 mb-3 font-["Montserrat"] font-medium'>Update Profile</button>
                    </form>
                </Fragment>)}

                {option==='Edit Password' && (<Fragment>
                    <form onSubmit={UpdatePassHandler}>
                        <h3 className="font-['Montserrat'] font-medium text-gray-700 uppercase text-sm">Old Password</h3>
                        <input
                            required
                            type="password"
                            placeholder="Old Password"
                            value={passdetails.oldPassword}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b"
                            onChange={(e)=>setPassDetails(passdetails=>({...passdetails, oldPassword: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-700 uppercase text-sm mt-2">New Password</h3>
                        <input
                            required
                            type="password"
                            placeholder="New Password"
                            value={passdetails.newPassword}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b"
                            onChange={(e)=>setPassDetails(passdetails=>({...passdetails, newPassword: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-700 uppercase text-sm mt-2">Confirm New Password</h3>
                        <input
                            required
                            type="password"
                            placeholder="Confirm New Password"
                            value={passdetails.confirmPassword}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[280px] w-[30vw] border-b"
                            onChange={(e)=>setPassDetails(passdetails=>({...passdetails, confirmPassword: e.target.value}))}
                        />
                        <button type='submit' className='border-2 p-1 border-[#f7735c]  hover:bg-gray-100 active:bg-gray-200 active:border-gray-300 rounded-sm block mt-4 mb-3 font-["Montserrat"] font-medium'>Update Password</button>
                    </form>
                </Fragment>)}

                {option==='Cart' && (<Fragment>
                    <div className=''>
                    {user.cart.map(obj=>{
                        cost+=obj.quantity*obj.price;
                        return <Link to={`/books/${obj.productID}`}>
                        <div className='grid grid-cols-[auto_1fr] grid-rows-1 items-center justify-items-start mb-4'>
                            <img src={obj.image} alt="product" className='h-[150px] aspect-ratio-[0.69]'/>
                            <div className='font-serif ml-3'>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Book:</h1> {obj.name}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Seller:</h1> {obj.sellerName}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Selling Price:</h1> &#8377;{obj.price}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Quantity:</h1> {obj.quantity}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Total Price:</h1> &#8377;{obj.quantity * obj.price}</h1>
                            </div>
                        </div>
                        </Link>
                    })
                    }</div>
                    {user.cart.length>0?(<Fragment><div className='flex flex-row justify-between border-t mb-4 pt-4 border-red-300'>
                        <h1 className='font-["Montserrat"] text-lg font-medium inline self-center'>
                        Total Cost of Cart: &#8377;{cost}
                        </h1>
                        <button onClick={checkoutHandler} className="font-medium font-['Montserrat'] border-2 p-1 h-fit self-center border-[#f7735c] hover:bg-gray-100 active:bg-gray-200 active:border-gray-300">Check Out</button>
                    </div>
                    <h1 className='font-["Roboto_Slab"] font-medium mt-7 mb-5 text-gray-500 text-center text-sm sm:text-base'>
                            <p className='inline text-black'>Disclaimer:</p> This site has been developed for academic purposes, we do not sell books. Do not use real payment methods at the payment gateway. If any money is lost, the owner of the site, shall not be held liable for the same.
                    </h1>
                    </Fragment>):(
                        <div className='w-[90vw] sm:w-auto font-["Montserrat"] text-lg font-medium pt-4 grid h-full content-center justify-center text-center'>
                            Your Cart is Empty!
                            <h1 className='text-base'><Link to='/explore' className='border-b inline w-fit border-blue-400'>Explore</Link> our collections to find what interest you . . .</h1>
                        </div>
                    )}
                </Fragment>)}

                {option==='Orders' && loading===false && (<Fragment>
                    {orders.length>0?(<div className=''>
                    {orders.map(obj=>{
                        
                        return <Link to={`/orders/${obj._id}`}><div className='mb-3 border-x border-y p-2'>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Order ID:</h1> {obj._id}</h1>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Order Date:</h1> {obj.orderDate}</h1>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Order Total:</h1> &#8377;{obj.totalPrice}</h1>
                        </div></Link>
                    })
                    }</div>):(
                        <div className='font-["Montserrat"] text-lg font-medium pt-4 grid h-full content-center justify-center text-center'>
                            Your haven't ordered anything yet :'(
                        </div>
                    )
                    }
                </Fragment>)}
            </div>
        </div>
        </Fragment>
        )}
        </div>
    )
}

export default User;