import React, { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'
import OrderSummary from '../Process/OrderSummary';
import Loader from '../Loader';
import axios from 'axios';

const Login = () => {
  // const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const [formData, setFormData] = useState({ mobile: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        Swal.fire({
          title: 'Thank You',
          text: 'Login successful',
          icon: 'success',
          willClose: () => {
            navigate('/shipping');
          }
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
  // header scroll
  const [isScrolled, setIsScrolled] = useState(false);
    
  const handleScroll = useCallback(() => {
      console.log(window.scrollY);
      setIsScrolled(window.scrollY > 50);
      console.log(isScrolled);
  }, [isScrolled]);
  
  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [handleScroll]);

  return (
    <>
      {loading && <Loader />}
      <section className={`cart_header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="cart_header_left">
          <Link to="/cart" className="back-button">
            <i className="ri-arrow-left-line"></i>
          </Link>
          <div className="cart_logo">
            <i className="ri-shopping-cart-fill cart_logo_icon d-lg-block d-md-block d-sm-block d-none"></i>
            {/* <img alt='' src='assets/img/tiffco-logo-2.svg' className='cart_logo_icon'></img> */}
          </div>
        </div>

        {/* <div className="cart_header_center">
          <div className="toggle-buttons">
            <button className="toggle-button ">Shopping Cart ({totalQuantity})</button>
            <button className="toggle-button active d-lg-block d-none">Trial Cart (0)</button>
          </div>
        </div> */}

        <div className="cart_header_right">
          <Link to="/assistance" className="assistance-link">
            <span className='d-lg-block d-md-block d-sm-block d-none'>
              Need Assistance?
            </span>
            <i className="ri-whatsapp-line whatsapp-icon"></i>
          </Link>
        </div>
      </section>
      <section className='container-fluid'  style={{marginBottom:"100px"}}>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 pt-5 '>
            <section className='container mt-5 login_width'>
              <div className='text-center row'>
                <div className='signup_logo'>
                  <i className="ri-fingerprint-line fs-2"></i>
                  <h6>Signup with Tiffany & Co.</h6>
                  <div>
                    <p className='p_width_login'>Unlock Best prices and become an insider for our exclusive launches & offers. Complete your profile and get ₹250 worth of xCLusive Points.</p>
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
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 bg_login sticky-header'>
            <OrderSummary />
          </div>
        </div>
      </section>
      <section className="cart_footer">
        <div className="cart_footer_left pt-3">
          <p>
            <strong>Contact Us:</strong>&nbsp; +91-44-66075200 (Helpline) | contactus@caratlane.com
          </p>
        </div>
        <div className="cart_footer_right">
          <img src="assets/img/cart_footer_logo.png" alt="payment-icon" className="payment-icon" />
          <img src="assets/img/cart_footer_logo1.png" alt="MasterCard" className="payment-icon" />
          <img src="assets/img/cart_footer_logo2.png" alt="PayPal" className="payment-icon" />
          <img src="assets/img/cart_footer_logo3.png" alt="American Express" className="payment-icon" />
        </div>
      </section>
    </>
  )
}

export default Login