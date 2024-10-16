import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import auth from '../Components/firebase';

const Uprofile = () => {
    const navigate = useNavigate(); // To redirect after logout
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // Safely parse user data
            } catch (error) {
                console.error('Error parsing user data:', error);
                toast.error('Error loading user data. Please log in again.');
                localStorage.removeItem('user'); // Clear invalid data
                navigate('/signup'); // Redirect to signup or login page
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
            localStorage.removeItem('token');
            localStorage.removeItem('user'); // Clear user data on logout
            setUser(null); // Update local state
            toast.success('You have successfully signed out.');
            navigate('/signup'); // Redirect to the signup page (or login page if applicable)
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Something went wrong during sign-out.');
        }
    };

    return (
        <div className='bg_uprofile'>
            <div className="sidebar">
                {/* Check if user is defined before accessing its properties */}
                <p className='m-0 p-0'>{user ? user.email : 'Guest'}</p>
                <Link to="/edit-profile" className="edit-profile-link">Edit Profile</Link> {/* Link to Edit Profile */}
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
                        <li><Link to="">COUPONS</Link></li>
                    </div>
                    <li>ACCOUNTS</li>
                    <p className='line_profile m-0 p-0'></p>
                    <div className='option_menu'>
                        <li><Link to="/Userprofile">PROFILE</Link></li>
                        <li><Link to="/Uwishlist">WISHLIST</Link></li>
                        <li><Link onClick={handleLogout}>Log Out</Link></li>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Uprofile;
