import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import Helmet from '../../Components/Helmet';

const Loginn = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Perform the login request
            const res = await axios.post('https://saltandglitzapi-rkm5g.kinsta.app/api/users/login', { email, password });

            // Store the token in local storage
            localStorage.setItem('token', res.data.token);

            // Fetch the user's profile data using the token
            const userRes = await axios.get('https://saltandglitzapi-rkm5g.kinsta.app/api/users/profile', {
                headers: {
                    'Authorization': `Bearer ${res.data.token}`,  // Send the token for authentication
                }
            });

            // Store user data in local storage under 'user'
            localStorage.setItem('user', JSON.stringify(userRes.data));

            // Show success toast
            toast.success("Login Successfully!");

            // Redirect to user profile page
            navigate('/Userprofile');
        } catch (err) {
            console.error('Error during login:', err.response?.data);  // Log the full error response
            // Show error toast
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Helmet title="Login">
            <>
                {loading && <Loader />}
                <section className='container mt-5 loginn_width'>
                    <div className='text-center row'>
                        <div className='signup_logo'>
                            <i className="ri-fingerprint-line fs-2"></i>
                            <h6>Signup with Tiffany & Co.</h6>
                            <div>
                                <p className='p_width_loginn'>
                                    Unlock Best prices and become an insider for our exclusive launches & offers. Complete your profile and get ₹250 worth of xCLusive Points.
                                </p>
                            </div>
                            <div className='pt-4 mx-auto d-block'>
                                <img alt='' src='assets/img/google.png' className='img-fluid google_facebook_logo' />
                            </div>
                        </div>
                        <div className='mx-auto d-block pb-4'>
                            <form onSubmit={handleSubmit}>

                                <div className="form__div">
                                    <input
                                        type="email"
                                        className="form__input"
                                        placeholder=" "
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label className="form__label">Email</label>
                                </div>

                                <div className="form__div">
                                    <input
                                        type="password"
                                        className="form__input"
                                        placeholder=" "
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label className="form__label">Password</label>
                                </div>

                                <button className='mt-4 btn w-100 place_order_btn text-light' type='submit' disabled={loading}>
                                    {loading ? 'Logging in...' : 'CONTINUE TO LOGIN'}
                                </button>
                            </form>

                        </div>
                        <p className='m-0 p-0 create_acc'>
                            New to Tiffany & Co.? <Link to="/signup" className='text-decoration-none'><span>Create an Account</span></Link>
                        </p>
                        <p className='create_acc'>Complete your profile and get Rs.250 worth of xCLusive Points.</p>
                    </div>
                </section>
            </>
        </Helmet>
    );
};

export default Loginn;
