import React, { } from 'react'
import { Link } from 'react-router-dom'
import Signup from '../Pages/Verify/Signup'
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { signOut } from 'firebase/auth';
// import auth from '../Components/firebase';

function UserHome() {
    // const [formData, setFormData] = useState({
    //     mobile: '',
    //     email: '',
    //     firstName: '',
    //     lastName: '',
    //     gender: ''
    // });
    // const [loading, setLoading] = useState(false);
    // const [user, setUser] = useState(null);
    // const handleSignOut = async () => {
    //     if (!user) {
    //         toast.warn('You are not signed in.');
    //         return;
    //     }

    //     try {
    //         await signOut(auth);
    //         setUser(null);
    //         setFormData({
    //             firstName: '',
    //             lastName: '',
    //             email: '',
    //             mobile: '',
    //             gender: ''
    //         });
    //         localStorage.removeItem('user');
    //         toast.success('You have successfully signed out.');
    //     } catch (error) {
    //         console.error('Error signing out:', error);
    //         toast.error('Something went wrong during sign-out.');
    //     }
    // };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const { firstName, email, mobile, lastName, gender } = formData;

    //     if (!firstName || !email || !mobile || !lastName || !gender) {
    //         toast.error('Please fill up all details');
    //         return;
    //     }

    //     setLoading(true);


    //     try {
    //         const response = await axios.post('http://localhost:5000/v1/login/create-User', formData);

    //         if (response.status === 200) {
    //             localStorage.setItem('user', JSON.stringify(formData));
    //             setUser(formData);
    //             toast.success('Your profile has been updated successfully.');
    //         } else {
    //             toast.error('Something went wrong');
    //         }
    //     } catch (error) {
    //         toast.error('Something went wrong');
    //     } finally {
    //         setTimeout(() => {
    //             setLoading(false);
    //         }, 2000);
    //     }
    // };

    return (
        <>
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
                            <Signup></Signup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHome