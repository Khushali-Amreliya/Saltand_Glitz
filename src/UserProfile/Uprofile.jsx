import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import auth from '../Components/firebase';
import { useDispatch } from 'react-redux';
import { cartAction } from '../Store/Slice/CartSlice';
import Helmet from '../Components/Helmet';

const Uprofile = () => {
    const navigate = useNavigate(); // To redirect after logout
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // Safely parse user data
            } catch (error) {
                console.error('Error parsing user data:', error);
                toast.error('Error loading user data. Please log in again.');
                localStorage.removeItem('user'); // Clear invalid data
                navigate('/'); // Redirect to signup or login page
            }
        }
    }, [navigate]); // Include navigate as a dependency

    const handleLogout = async () => {
        if (!user) {
            toast.warn('You are not signed in.');
            return;
        }

        try {
            await signOut(auth);

            // Clear Redux cart and wishlist
            dispatch(cartAction.clearCartAndWishlist());

            // Clear user data
            localStorage.removeItem('user');
            localStorage.removeItem('guestUserId')

            setUser(null);
            toast.success('You have successfully logged out');
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Something went wrong during log-out.');
        }
    };


    return (
        <Helmet title="Profile">
            <div className='bg_uprofile'>
                <div className="sidebar">
                    {/* Check if user is defined before accessing its properties */}
                    <p className='m-0 p-0'>{user ? user.email : 'Guest'}</p>
                    <Link to="/edit-profile" className="edit-profile-link">EDIT PROFILE</Link> {/* Link to Edit Profile */}
                    <ul className="sidebar-menu">
                        <li>ORDERS</li>
                        <p className='line_profile m-0 p-0'></p>
                        <div className='option_menu'>
                            <li><Link to="/U-order">ORDERS AND RETURNS</Link></li>
                            <li><Link to="">PAYMENT</Link></li>
                            <li><Link to="">MANAGE REFUNDS</Link></li>
                        </div>
                        <li>OFFERS</li>
                        <p className='line_profile m-0 p-0'></p>
                        <div className='option_menu'>
                            <li><Link to="/Ucoupon">COUPONS</Link></li>
                        </div>
                        <li>ACCOUNTS</li>
                        <p className='line_profile m-0 p-0'></p>
                        <div className='option_menu'>
                            <li><Link to="/Userprofile">PROFILE</Link></li>
                            <li><Link to="/Uwishlist">WISHLIST</Link></li>
                            <li><Link onClick={handleLogout}>LOG OUT</Link></li>
                        </div>
                    </ul>
                </div>
            </div>
        </Helmet>
    );
};

export default Uprofile;
