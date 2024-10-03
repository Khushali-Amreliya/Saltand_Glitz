import React from 'react'
import { Link } from 'react-router-dom'
// import Uwishlist from './Uwishlist'

const Uprofile = () => {
  return (
    <>
        <div className='bg_uprofile'>
            <div className="sidebar ">
                <p className='m-0 p-0'>abc@gmail.com</p>
                <Link to="" className="edit-profile-link">Edit Profile</Link>
                <ul className="sidebar-menu">
                    <li>ORDERS</li>
                    <p className='line_profile m-0 p-0'></p>
                    <div className='option_menu'>
                        <li><Link to="">ORDERS AND RETURNS</Link></li>
                        <li><Link to="">PAYMENT</Link></li>
                        <li><Link to="">MANAGE REFUNDS</Link></li>
                    </div>
                    <li>OFFERS</li>
                    <p className='line_profile m-0 p-0'></p>
                        <div className='option_menu'>
                        <li><Link to="">COUPONS</Link></li>
                    </div>
                    <li>ACCOUNTS</li>
                    <p className='line_profile m-0 p-0'></p>
                    <div className='option_menu'>
                        <li><Link to="/">PROFILE</Link></li>
                        <li><Link to="/Uwishlist">WISHLIST</Link></li>
                    </div>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Uprofile


// import React from 'react'; // Assume you have some CSS for styling

// const Uprofile = () => {
//   return (
//     <div className="orders-container">
//       <div className="sidebar">
//         <p>Email</p>
//         <Link to="/profile" className="edit-profile-link">Edit Profile</Link>
//         <ul className="sidebar-menu">
//           <li>ORDERS</li>
//           <li><Link to="/orders" className="active">ORDERS AND RETURNS</Link></li>
//           <li><Link to="/payment">PAYMENT</Link></li>
//           <li><Link to="/refunds">MANAGE REFUNDS</Link></li>
//           <li>APPOINTMENTS</li>
//           <li><Link to="/try-at-home">TRY AT HOME</Link></li>
//           <li>OFFERS</li>
//           <li><Link to="/coupons">COUPONS</Link></li>
//           <li>ACCOUNTS</li>
//           <li><Link to="/profile">PROFILE</Link></li>
//           <li>CREDITS</li>
//           <li><Link to="/egold">CARATLANE eGold</Link></li>
//           <li><Link to="/pop">CARATLANE POP!</Link></li>
//         </ul>
//       </div>
      
//       <div className="main-content">
//         <div className="order-status">
//           <div className="tabs">
//             <button className="tab active">MY ORDERS</button>
//             <button className="tab">CANCELLED ORDERS</button>
//           </div>
//           <div className="empty-orders">
//             <img src="no-orders.svg" alt="No Active Orders" className="no-orders-icon"/>
//             <p>No Active Orders</p>
//             <button className="continue-shopping-button">Continue Shopping</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Uprofile;
