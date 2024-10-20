import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Mainpage from '../Pages/Mainpage';
import Productdetails from '../Pages/Product/Productdetails';
import Earrings from '../Pages/Earrings';
import Cart from '../Pages/Process/Cart';
import Signup from '../Pages/Verify/Signup';
import Login from '../Pages/Process/Login';
import Loginn from '../Pages/Verify/Loginn';
import Shipping from '../Pages/Process/Shipping';
import OrderSummary from '../Pages/Process/OrderSummary';
import Gift from '../Pages/Process/Gift';
import Payment from '../Pages/Process/Payment';
import '../styles/Admin.css';
import Admin from '../Admindashboard/Admin';
import Dashboard from '../Admindashboard/Dashboard';
import Wishlist from '../Pages/Process/Wishlist';
import Adashbord from '../Admindashboard/Adashbord';
import Uprofile from '../UserProfile/Uprofile';
import Userprofile from '../UserProfile/Userprofile';
import Uwishlist from '../UserProfile/Uwishlist';
import Uorder from '../UserProfile/Uorder';
import Register from '../test/Register';
import LoginUser from '../test/LoginUser';
import EditProfile from '../UserProfile/EditProfile';
import Ucoupon from '../UserProfile/Ucoupon';
// import Login1 from '../test/Login';

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Mainpage />} />
        <Route path='/productDetail/:id' element={<Productdetails />} />
        <Route path='/earrings' element={<Earrings />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/loginn' element={<Loginn />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/summary' element={<OrderSummary />} />
        <Route path='/gift' element={<Gift />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/112/admin' element={<Admin />} />
        <Route path='/112/admin/dashboard ' element={<Dashboard />} />
        <Route path='/adashbord' element={<Adashbord></Adashbord>}></Route>
        <Route path='/Uprofile' element={<Uprofile />} />
        <Route path='/Userprofile' element={<Userprofile />} />
        <Route path='/Uwishlist' element={<Uwishlist />} />
        <Route path='/Ucoupon' element={<Ucoupon />} />
        <Route path='/U-order' element={<Uorder></Uorder>}></Route>
        <Route path='/rgister' element={<Register></Register>}></Route>
        <Route path="/edit-profile" element={<EditProfile />} /> 
        {/* <Route path='/login-t' element={<Login></Login>}></Route> */}
        <Route path='/loginu' element={<LoginUser></LoginUser>}></Route>
        </Routes>
    </div>
  );
};

export default Router;
