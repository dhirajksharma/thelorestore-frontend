import { createContext, useMemo, useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import Navbar from './components/elements/Navbar';
import Explore from './components/pages/Explore';
import Productpage from './components/pages/Productpage';
import Logon from './components/pages/Logon';
import { loadUser,loadUserOrders } from './actions/userAction';
import { getSellerOrders, getSellerProducts } from './actions/dashboardAction';
import User from './components/pages/User';
import Forgotpassword from './components/pages/Forgotpassword';
import Resetpassword from './components/pages/Resetpassword';
import Checkoutsuccess from './components/pages/Checkoutsuccess';
import Checkoutfail from './components/pages/Checkoutfail';
import Dashboard from './components/pages/Dashboard';
import { useDispatch } from 'react-redux';
import {ToastContainer, Flip, Zoom} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Order from './components/pages/Orders';
import Notfound from './components/elements/Notfound';
import NavContext from './components/elements/NavContext.js';

function App() {
  const dispatch=useDispatch();
  dispatch(loadUser());
  dispatch(loadUserOrders());
  dispatch(getSellerProducts());
  dispatch(getSellerOrders());
  
  const [navOption, setNavOption] = useState(sessionStorage.getItem('NavOption')||0);
  const value = useMemo(
    () => ({ navOption, setNavOption }), 
    [navOption]
  );

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
