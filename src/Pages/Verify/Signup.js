import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { GoogleAuthProvider, signInWithPopup ,signOut} from 'firebase/auth';
import auth from '../../Components/firebase';
import axios from 'axios';
import { toast } from 'react-toastify';

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
            const { displayName, email, phoneNumber } = result.user;
            const [firstName, lastName] = displayName ? displayName.split(' ') : ['', ''];

            setFormData({
                firstName,
                lastName,
                email: email || '',
                mobile: phoneNumber || '',
                gender: ''
            });
            setUser(result.user);
            toast.success(`Welcome, ${displayName || firstName}!`);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            toast.error('Something went wrong during sign-in.');
        } finally {
            setLoading(false);
        }
    };

    // Handle sign-out
    const handleSignOut = async () => {
        if (!user) {
            toast.warn('You are not signed in.');
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
            toast.success('You have successfully signed out.');
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Something went wrong during sign-out.');
        }
    };

    // Load user from local storage on mount
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

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/v1/login/create-User', formData);
            toast.success(response.data.message); // Show success toast

            // Clear form data after successful signup
            setFormData({
                mobile: '',
                email: '',
                firstName: '',
                lastName: '',
                gender: ''
            });
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message); // Show error toast
            } else {
                toast.error('Server error');
            }
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
                                {/* Input Fields for Signup */}
                                {['mobile', 'email', 'firstName', 'lastName'].map((field, index) => (
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-2' key={index}>
                                        <input
                                            type={field === 'email' ? 'email' : 'text'}
                                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                            className='form-control'
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                ))}
                                {/* Gender Radio Buttons */}
                                {['Male', 'Female', 'Other'].map((genderOption, index) => (
                                    <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-check m-0 me-5 text-center" key={index}>
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
                            <button className='mt-4 btn w-100 place_order_btn text-light' type='submit'>Sign Up</button>
                            <button className='mt-4 btn w-100 place_order_btn text-light' type='submit' onClick={handleSignOut}>Sign Up</button>
                        </form>
                    </div>
                    <p className='create_acc pt-2'>Already have an account?
                        <Link to="/loginn" className='text-decoration-none'><span> LOG IN</span></Link>
                    </p>
                </div>
            </section >
        </>
    );
};

export default Signup;
// import axios from 'axios';
// import { toast } from 'react-toastify'; // Make sure to install and import react-toastify

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         mobile: '',
//         gender: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/v1/login/create-User', formData);
//             toast.success(response.data.message); // Show success toast
//             // Redirect to welcome page or clear form, etc.
//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.message); // Show error toast
//             } else {
//                 toast.error('Server error');
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             {/* Input fields for first name, last name, email, mobile, gender */}
//             <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
//             <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
//             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//             <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required />
//             <select name="gender" value={formData.gender} onChange={handleChange} required>
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//             </select>
//             <button type="submit">Sign Up</button>
//         </form>
//     );
// };

// export default Signup;