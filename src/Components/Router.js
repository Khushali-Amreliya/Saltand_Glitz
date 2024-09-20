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
        <Route path='/112/admin/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Router;
