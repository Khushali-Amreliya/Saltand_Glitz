import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader';

const Loginn = () => {
    const [loading, setLoading] = useState(false);
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/v1/login/verify', { emailOrMobile });
            setSuccess(response.data.message);
            // Store user information in localStorage or handle it as needed
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Login failed');
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
                                    placeholder="Email or Mobile Number"
                                    className='form-control'
                                    name='mobile'
                                    value={emailOrMobile}
                                    onChange={(e) => setEmailOrMobile(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && <p style={{ color: 'green' }}>{success}</p>}
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

// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//     const [emailOrMobile, setEmailOrMobile] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         try {
//             const response = await axios.post('http://localhost:5000/v1/login/verify', { emailOrMobile });
//             setSuccess(response.data.message);
//             // Store user information in localStorage or handle it as needed
//             localStorage.setItem('user', JSON.stringify(response.data.user));
//         } catch (error) {
//             setError(error.response ? error.response.data.message : 'Login failed');
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="text"
//                     placeholder="Email or Mobile Number"
//                     value={emailOrMobile}
//                     onChange={(e) => setEmailOrMobile(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//
//         </div>
//     );
// };

// export default Login;