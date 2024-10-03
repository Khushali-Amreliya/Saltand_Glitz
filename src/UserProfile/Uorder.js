import React from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../Pages/EmptyState'

function Uorder() {
  return (
    <div>
         <div className='container-fluid px-3'>
                <div className='row'>
                    <div className='col-lg-2'>
                        <div className="sidebar-wrapper">
                            <div className="sidebar px-1" id="sidebar">
                            <ul>
                                    <div className="profile">
                                        <img src="https://i.pinimg.com/originals/6d/1f/20/6d1f2038bcf52a4cc496489fcd2139a6.jpg" alt="profile pic" />
                                        <span>Username</span>
                                    </div>

                                    <div className="indicator" id="indicator"></div>
                                    <li><Link to="/profile"><i className="icon"></i><span>Home</span></Link></li>
                                    <li><Link to="/u-order"><i className="icon"></i><span>Order</span></Link></li>
                                    <li><Link><i className="icon"></i><span>Edit Profile</span></Link></li>
                                    <li><Link to="/u-wishlist"><i className="icon"></i><span>Wishlist</span></Link></li>
                                    <li><Link ><i className="icon"></i><span >Logout</span></Link></li>
                                </ul>
                            </div>
                            {/* <button className="toggle-btn" id="toggleBtn">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button> */}
                        </div>
                    </div>
                    <div className='col-lg-10'>
                        <div className='py-2'>
                           <EmptyState></EmptyState>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Uorder