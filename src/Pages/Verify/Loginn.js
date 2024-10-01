import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Loader';

const Loginn = () => {
    const [formData, setFormData] = useState({ identifier: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const signupMobile = localStorage.getItem('signupMobile');
        const signupEmail = localStorage.getItem('signupEmail');
    
        if (!formData.identifier) {
            setError('Mobile number or email is required.');
            return;
        }

        // Check if the entered identifier is a mobile number or email
        const isMobile = /^\d{10}$/.test(formData.identifier); // Simple 10-digit mobile number regex
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier); // Basic email regex
    
        if (!isMobile && !isEmail) {
            setError('Please enter a valid mobile number or email.');
            toast.error('Invalid mobile number or email');
            return;
        }

        // Validate the identifier (either mobile number or email)
        if (
            (isMobile && formData.identifier !== signupMobile) ||
            (isEmail && formData.identifier !== signupEmail)
        ) {
            setError('Invalid mobile number or email. Please enter the correct credentials.');
            toast.error('Invalid credentials');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/v1/signup/login', formData);

            if (response.status === 200) {
                toast.success('Login successful', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                }, 2000);
            } else {
                toast.error('Something went wrong', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                setLoading(false);
            }
        } catch (error) {
            toast.error('Something went wrong', {
                position: 'top-center',
                autoClose: 2000,
            });
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <section className='container mt-5 loginn_width'>
                <div className='text-center row'>
                    <div className='signup_logo'>
                        <i className="ri-fingerprint-line fs-2"></i>
                        <h6>Signup with Tiffany & Co.</h6>
                        <div>
                            <p className='p_width_loginn'>Unlock Best prices and become an insider for our exclusive launches & offers. Complete your profile and get ₹250 worth of xCLusive Points.</p>
                        </div>
                    </div>
                    <div className='mx-auto d-block'>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-4'>
                                <input
                                    type='text'
                                    placeholder='Enter Mobile Number or Email'
                                    className='form-control'
                                    name='identifier'
                                    value={formData.identifier}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {error && <p className='text-danger mt-2'>{error}</p>}
                            <button className='mt-4 btn w-100 place_order_btn text-light' type='submit' disabled={loading}>
                                {loading ? 'Logging in...' : 'CONTINUE TO LOGIN'}
                            </button>
                        </form>
                    </div>
                    <div className='pt-4 mx-auto d-block'>
                        <img alt='' src='assets/img/google.png' className='img-fluid google_facebook_logo'></img>
                        <img alt='' src='assets/img/facebook.png' className='img-fluid google_facebook_logo'></img>
                    </div>
                    <p className='m-0 p-0 create_acc'>New to CaratLane? <Link to="/signup" className='text-decoration-none'><span>Create an Account</span></Link></p>
                    <p className='create_acc'>Complete your profile and get Rs.250 worth of xCLusive Points.</p>
                </div>
            </section>
        </>
    );
};

export default Loginn;
