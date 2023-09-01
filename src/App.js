import { useEffect, useMemo, useState } from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Shop from './components/pages/Shop/Shop';
import Navbar from './components/elements/Navbar';
import Explore from './components/pages/Explore/Explore';
import Productpage from './components/pages/Product/Productpage';
import Logon from './components/pages/Auth/Logon';
import { loadUser,loadUserOrders } from './actions/userAction';
import { getSellerOrders, getSellerProducts } from './actions/dashboardAction';
import User from './components/pages/User/User';
import Forgotpassword from './components/pages/Auth/Forgotpassword';
import Resetpassword from './components/pages/Auth/Resetpassword';
import Checkoutsuccess from './components/pages/Checkout/Checkoutsuccess';
import Checkoutfail from './components/pages/Checkout/Checkoutfail';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import {ToastContainer, Flip, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Order from './components/pages/Order/Orders';
import Notfound from './components/elements/Notfound';
import NavContext from './components/elements/NavContext.js';

function App() {
  const dispatch=useDispatch();
  dispatch(loadUser());
  dispatch(loadUserOrders());
  dispatch(getSellerProducts());
  dispatch(getSellerOrders());
  
  const [navOption, setNavOption] = useState(sessionStorage.getItem('NavOption')||0);
  const [serverError, setServerError]=useState(0);

  const value = useMemo(
    () => ({ navOption, setNavOption, serverError }), 
    [navOption, serverError]
  );

  function checkserver(){
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/health`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
  })
  .catch((error) => {
    toast('Woops! The server is not working... Kindly revisit after sometime 😢😢', {
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
    setServerError(1);
  });

  }
  useEffect(()=>{
    checkserver();
  })
  return (
    <NavContext.Provider value={value}>
    <div>
      <Navbar/>
      <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/explore' element={<Explore/>}></Route>
        <Route path='/shop' element={<Shop/>}></Route>
        <Route path='/shop/:keyword' element={<Shop/>}></Route>

        <Route path='/login' element={<Logon/>}></Route>
        <Route path='/books/:id' element={<Productpage/>}></Route>
        <Route path='/me' element={<User/>}></Route>
        <Route path='/me/dashboard' element={<Dashboard/>}></Route>
        <Route path='/resetpassword' element={<Forgotpassword/>}></Route>
        <Route path='/password/reset/:token' element={<Resetpassword/>}></Route>

        <Route path='/checkout/success' element={<Checkoutsuccess/>}></Route>
        <Route path='/checkout/fail' element={<Checkoutfail/>}></Route>

        <Route path='/orders/:id' element={<Order/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      </div>

    </div>
    </NavContext.Provider>
  );
}

export default App;
