import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../Components/firebase';
import axios from 'axios';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        mobile: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: ''
    });

    const provider = new GoogleAuthProvider();

    const handleSignIn = async () => {
        if (user) {
            Swal.fire({
                icon: 'warning',
                title: 'Already Signed In',
                text: 'You are already signed in.',
            });
            return;
        }
    
        try {
            setLoading(true);
            provider.setCustomParameters({
                prompt: 'select_account'
            });
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
    
            const { displayName, email, phoneNumber } = user;
            const [firstName, lastName] = displayName ? displayName.split(' ') : ['', ''];
    
            setFormData({
                firstName,
                lastName,
                email: email || '',
                mobile: phoneNumber || '',
                gender: ''
            });
    
            Swal.fire({
                icon: 'success',
                title: 'Signed In Successfully',
                text: `Welcome, ${user.displayName || firstName}!`,
            });
            console.log('User Info:', user);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            Swal.fire({
                icon: 'error',
                title: 'Sign-In Failed',
                text: 'Something went wrong during sign-in.',
            });
        } finally {
            setLoading(false);
        }
    };
    

    const handleSignOut = async () => {
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Not Signed In',
                text: 'You are not signed in.',
            });
            return;
        }

        try {
            await signOut(auth);
            setUser(null);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                gender: ''
            });
            localStorage.removeItem('user'); 
            Swal.fire({
                icon: 'success',
                title: 'Signed Out',
                text: 'You have successfully signed out.',
            });
        } catch (error) {
            console.error('Error signing out:', error);
            Swal.fire({
                icon: 'error',
                title: 'Sign-Out Failed',
                text: 'Something went wrong during sign-out.',
            });
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setFormData({
                firstName: parsedUser.firstName,
                lastName: parsedUser.lastName,
                email: parsedUser.email,
                mobile: parsedUser.mobile,
                gender: parsedUser.gender
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, email, mobile, lastName, gender } = formData;
    
        if (!firstName || !email || !mobile || !lastName || !gender) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill up all details',
            });
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await axios.post('http://localhost:5000/v1/login/create-login', formData);
    
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(formData));
                setUser(formData);
                Swal.fire({
                    title: 'Profile Updated Successfully',
                    text: 'Your profile has been updated successfully.',
                    icon: 'success',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong',
            });
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            {loading && <Loader />}
            <section className='container mt-5'>
                <div className='text-center row'>
                    {user ? (
                        <div>
                            <h3>Welcome, {user.firstName}!</h3>
                            <form onSubmit={handleSubmit} className=' mx-auto d-block'>
                                <div className='row'>
                                    {/* Input Fields */}
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-2'>
                                        <input
                                            type='text'
                                            placeholder='First Name'
                                            className='form-control'
                                            name='firstName'
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-2'>
                                        <input
                                            type='text'
                                            placeholder='Last Name'
                                            className='form-control'
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-2'>
                                        <input
                                            type='email'
                                            placeholder='Enter Email'
                                            className='form-control'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-2'>
                                        <input
                                            type='text'
                                            placeholder='Mobile Number'
                                            className='form-control'
                                            name='mobile'
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* Gender Radio Buttons */}
                                    <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-check m-0 me-5 text-center ps-5">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="radioOption1"
                                            value="Male"
                                            checked={formData.gender === 'Male'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="radioOption1">
                                            Male
                                        </label>
                                    </div>
                                    <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-check m-0 me-5 text-center">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="radioOption2"
                                            value="Female"
                                            checked={formData.gender === 'Female'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="radioOption2">
                                            Female
                                        </label>
                                    </div>
                                    <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-check m-0 me-5 text-center">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="radioOption3"
                                            value="Other"
                                            checked={formData.gender === 'Other'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="radioOption3">
                                            Other
                                        </label>
                                    </div>
                                </div>
                                <button className='mt-4 btn w-50 place_order_btn text-light' type='submit'>Update Profile</button>
                            </form>
                            <button className='mt-4 btn w-50 place_order_btn text-light' onClick={handleSignOut}>Sign Out</button>
                        </div>
                    ) : (
                        <>
                            <div className='signup_logo'>
                                <i className="ri-fingerprint-line fs-2"></i>
                                <h6>Signup with Tiffany & Co.</h6>
                                <div>
                                    <p>Unlock Best prices and become an insider for our exclusive launches & offers. Complete your profile and get ₹250 worth of xCLusive Points.</p>
                                </div>
                            </div>
                            <div className='pt-4 mx-auto d-block'>
                                <img onClick={handleSignIn} alt='' src='assets/img/google.png' className='img-fluid google_facebook_logo'></img>
                                <img alt='' src='assets/img/facebook.png' className='img-fluid google_facebook_logo'></img>
                            </div>
                            <div className='title_Shadow'>
                                <p>Or Continue With</p>
                            </div>
                            <div className='col-xl-6 mx-auto d-block'>
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>
                                        {/* Input Fields */}
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-2'>
                                            <input
                                                type='number'
                                                placeholder='Mobile Number'
                                                className='form-control'
                                                name='mobile'
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-2'>
                                            <input
                                                type='email'
                                                placeholder='Enter Email'
                                                className='form-control'
                                                name='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-2'>
                                            <input
                                                type='text'
                                                placeholder='First Name'
                                                className='form-control'
                                                name='firstName'
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-2'>
                                            <input
                                                type='text'
                                                placeholder='Last Name'
                                                className='form-control'
                                                name='lastName'
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        {/* Gender Radio Buttons */}
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-check m-0 me-5 text-center ps-5">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="radioOption1"
                                                value="Male"
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="radioOption1">
                                                Male
                                            </label>
                                        </div>
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-check m-0 me-5 text-center">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="radioOption2"
                                                value="Female"
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="radioOption2">
                                                Female
                                            </label>
                                        </div>
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-check m-0 me-5 text-center">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="radioOption3"
                                                value="Other"
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="radioOption3">
                                                Other
                                            </label>
                                        </div>
                                    </div>
                                    <button className='mt-4 btn w-100 place_order_btn text-light' type='submit'>Sign In</button>
                                </form>
                            </div>
                            <p className='create_acc pt-2'>Already have an account? 
                            <Link to="/loginn" className='text-decoration-none'><span> LOG IN</span></Link></p>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Signup;
