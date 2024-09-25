import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Loader';

const Loginn = () => {
    const [formData, setFormData] = useState({ mobile: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);  // Loader state
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.mobile) {
            setError('Mobile number or email is required.');
            return;
        } else {
            setError('');
        }
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/v1/signup/create-signup', formData);

            if (response.status === 200) {
                toast.success('Login successful', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                }, 2000);
            } else {
                toast.error('Something went wrong', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(false);
            }
        } catch (error) {
            toast.error('Something went wrong', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
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
                                    placeholder='Enter Mobile Number'
                                    className='form-control'
                                    name='mobile'
                                    value={formData.mobile}
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
