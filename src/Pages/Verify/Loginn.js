import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader';
import { toast } from 'react-toastify';

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
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            localStorage.setItem('token', res.data.token);

            // Show success toast
            toast.success("Login Successfully!");
                navigate('/Userprofile');
        } catch (err) {
            // Show error toast
            toast.error(err.response?.data?.msg || "Login failed");
        } finally {
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
                            <p className='p_width_loginn'>
                                Unlock Best prices and become an insider for our exclusive launches & offers. Complete your profile and get ₹250 worth of xCLusive Points.
                            </p>
                        </div>
                    </div>
                    <div className='mx-auto d-block pb-4'>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-4'>
                                <input
                                    type='email'
                                    placeholder="Email"
                                    className='form-control'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mt-4'>
                                <input
                                    type='password'
                                    placeholder="Password"
                                    className='form-control'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className='mt-4 btn w-100 place_order_btn text-light' type='submit' disabled={loading}>
                                {loading ? 'Logging in...' : 'CONTINUE TO LOGIN'}
                            </button>
                        </form>
                    </div>
                    {/* <div className='pt-4 mx-auto d-block'>
                        <img alt='Google logo' src='assets/img/google.png' className='img-fluid google_facebook_logo' />
                        <img alt='Facebook logo' src='assets/img/facebook.png' className='img-fluid google_facebook_logo' />
                    </div> */}
                    <p className='m-0 p-0 create_acc'>
                        New to Tiffany & Co.? <Link to="/signup" className='text-decoration-none'><span>Create an Account</span></Link>
                    </p>
                    <p className='create_acc'>Complete your profile and get Rs.250 worth of xCLusive Points.</p>
                </div>
            </section>
        </>
    );
};

export default Loginn;




// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Loginn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       Swal.fire({
//         title: "Welcome Back",
//         text: "Login successful",
//         icon: "success"
//       }).then(() => {
//         navigate('/Userprofile');
//       });
//     } catch (err) {
//       Swal.fire({
//         title: "Error",
//         text: err.response.data.msg,
//         icon: "error"
//       });
//     }
//   };

//   return (
//     <div>
//         <div className="container1 mt-5 mb-5">
//           <div className="screen">
//             <div className="screen__content">
//               <form className="login" onSubmit={handleSubmit}>
//                 <div className="login__field">
//                   <i className="login__icon fas fa-user"></i>
//                   <input type="text" className="login__input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="User name / Email" />
//                 </div>
//                 <div className="login__field">
//                   <i className="login__icon fas fa-lock"></i>
//                   <input type="password" className="login__input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//                 </div>
//                 <button className="button login__submit " type='submit'>
//                   <span className="button__text text-dark">Log In Now</span>
//                   <i className="button__icon fas fa-chevron-right"></i>
//                 </button>
//               </form>
//               <div className="social-login">
//                 <h3 className='text-dark'>log in via</h3>
//                 <div className="social-icons">
//                   <Link href="#" className="social-login__icon fab fa-instagram text-dark"></Link>
//                   <Link href="#" className="social-login__icon fab fa-facebook text-dark"></Link>
//                   <Link href="#" className="social-login__icon fab fa-twitter text-dark"></Link>
//                 </div>
//               </div>
//             </div>
//             <div className="screen__background">
//               <span className="screen_backgroundshape screenbackground_shape4"></span>
//               <span className="screen_backgroundshape screenbackground_shape3"></span>
//               <span className="screen_backgroundshape screenbackground_shape2"></span>
//               <span className="screen_backgroundshape screenbackground_shape1"></span>
//             </div>
//           </div>
//         </div>
   
//     </div>
//   );
// };

// export default Loginn;