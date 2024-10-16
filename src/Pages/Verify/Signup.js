import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../Components/firebase';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: ''
    });
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const provider = new GoogleAuthProvider();

    // Handle sign-in with Google
    const handleSignIn = async () => {
        if (user) {
            toast.warn('You are already signed in.');
            return;
        }

        try {
            setLoading(true);
            provider.setCustomParameters({ prompt: 'select_account' });
            const result = await signInWithPopup(auth, provider);
            const { displayName, email } = result.user;

            const userData = {
                name: displayName || '',
                email: email || '',
                password: '', // Password will need to be set by user manually
                gender: ''
            };

            setFormData(userData);
            setUser(result.user);
            toast.success(`Welcome, ${displayName || 'User'}!`);

            // Store user data locally only if name and email are available
            if (displayName && email) {
                localStorage.setItem('user', JSON.stringify(userData));
            }

        } catch (error) {
            console.error('Error signing in with Google:', error);
            toast.error('Something went wrong during sign-in.');
        } finally {
            setLoading(false);
        }
    };

    // Handle sign-out
   

    // Load user from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser) {
                    setUser(parsedUser);
                    setFormData({
                        name: parsedUser.name || '',
                        email: parsedUser.email || '',
                        password: parsedUser.password || '',
                        gender: parsedUser.gender || ''
                    });
                }
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                // If error occurs, clear invalid data from localStorage
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader during submission

        try {
            // Send form data to the backend
            await axios.post('http://localhost:5000/api/users/register', formData);
            toast.success('Sign-up successful!');

            // Save the user data from the response (if needed)
            localStorage.setItem('user', JSON.stringify(formData));

            // Clear form data after successful signup
            setFormData({
                name: '',
                email: '',
                password: '',
                gender: ''
            });

            // Redirect to the user profile page
            navigate('/Userprofile'); // Use navigate to redirect

        } catch (error) {
            console.error('Error during signup:', error);
            toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <section className='container mt-5'>
                <div className='text-center row'>
                    <div className='signup_logo'>
                        <i className="ri-fingerprint-line fs-2"></i>
                        <h6>Signup with Tiffany & Co.</h6>
                        <div>
                            <p>Unlock Best prices and become an insider for our exclusive launches & offers. Complete your profile and get ₹250 worth of xCLusive Points.</p>
                        </div>
                    </div>
                    <div className='pt-4 mx-auto d-block'>
                        <img onClick={handleSignIn} alt='' src='assets/img/google.png' className='img-fluid google_facebook_logo' />
                        <img alt='' src='assets/img/facebook.png' className='img-fluid google_facebook_logo' />
                    </div>
                    <div className='title_Shadow'>
                        <p>Or Continue With</p>
                    </div>
                    <div className='col-xl-6 mx-auto d-block'>
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                {/* Name Field */}
                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-2'>
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        className='form-control'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* Email Field */}
                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-2'>
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        className='form-control'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* Password Field */}
                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-2'>
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        className='form-control'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* Gender Radio Buttons */}
                                {['Male', 'Female', 'Other'].map((genderOption, index) => (
                                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 form-check m-0 me-5 text-center" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id={`radioOptionSignup${index + 1}`}
                                            value={genderOption}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor={`radioOptionSignup${index + 1}`}>
                                            {genderOption}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button className='mt-4 btn w-50 place_order_btn text-light' type='submit'>Sign Up</button>
                        </form>
                    </div>
                    <p className='create_acc pt-2'>Already have an account?
                        <Link to="/loginn" className='text-decoration-none'><span> LOG IN</span></Link>
                    </p>
                </div>
            </section>
        </>
    );
};

export default Signup;
