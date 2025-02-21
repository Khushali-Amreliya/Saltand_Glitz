import React, { useCallback, useEffect, useState } from 'react';
import OrderSummary from '../Process/OrderSummary';
import Loader from '../Loader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Shipping = () => {
    // const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const [showBillingForm, setShowBillingForm] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('HomeDelivery');
    const [formErrors, setFormErrors] = useState({
        pincode: '',
        mobile: '',
    });
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
        country: '',
        mobile: '',
        addressType: ''
    });

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleAddress = (e) => {
        if (e.target.value === "DifferentBillingAddress") {
            setShowBillingForm(true);
        } else {
            setShowBillingForm(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'pincode' && !/^\d{0,6}$/.test(value)) {
            return;
        }

        if (name === 'mobile' && !/^\d{0,10}$/.test(value)) {
            return;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const isPincodeValid = /^\d{6}$/.test(formData.pincode);
        const isMobileValid = /^\d{10}$/.test(formData.mobile);

        return (
            Object.values(formData).every(field => field.trim() !== '') &&
            isPincodeValid &&
            isMobileValid
        );
    };

    const handlePlaceOrder = async () =>{   
        const isPincodeValid = /^\d{6}$/.test(formData.pincode);
        const isMobileValid = /^\d{10}$/.test(formData.mobile);

        if (!validateForm() || !isPincodeValid || !isMobileValid) {
            setFormErrors({
                pincode: isPincodeValid ? '' : 'Pincode must be 6 digits.',
                mobile: isMobileValid ? '' : 'Mobile number must be 10 digits.',
            });
            toast.error("Please correct the errors in the form.")
            return;
        }

        setLoading(true);
        try {
            await axios.post('https://saltandglitz-api.vercel.app/v1/shipping/create-shipping', formData);
            setLoading(false);
            toast.success("Your address has been successfully added!")
        } catch (error) {
            console.error('Failed to add address:', error);
            setLoading(false);
            toast.error("There was an error submitting your address. Please try again.")
        }
    };

    const handleSubmitButton = () => {
        if (!validateForm()) {
            toast.error("Please Fill Out Your Shipping Address!")
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/gift');
        }, 1000);
    }

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
            <section className={`cart_header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="cart_header_left">
                    <Link to="/login-success" className="back-button">
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
            <section className='container-fluid mb_medium'>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 pb-3'>
                        {loading && <Loader />}
                        <section className='container mt-5 shipping_width'>
                            <div className='text-center row'>
                                <h6 className='delivery_title'>Delivery Details</h6>
                                <div className='row'>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-3 mx-auto d-block'>
                                        <div
                                            className={`delivery_shipping pe-2 p-0 pt-2 ${selectedOption === 'HomeDelivery' ? 'selected' : ''}`}
                                        >
                                            <div className='padding_width d-flex align-items-center justify-content-between pb-3 pt-2'>
                                                <p className='m-0'>Home Delivery</p>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="delivery"
                                                    id="radioOption1"
                                                    value="HomeDelivery"
                                                    checked={selectedOption === 'HomeDelivery'}
                                                    onChange={handleRadioChange}
                                                />
                                            </div>
                                            <div className='pick_up_shipping text-center padding_width'>
                                                <p className='fw-bolder'>Earliest Delivery dates selected for your Pincode</p>
                                            </div>
                                            <p className='btn btn_delivery' data-bs-target="#address" data-bs-toggle="modal"><i className="ri-add-line"></i>&nbsp;Change your delivery date</p>
                                        </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-3 mx-auto d-block'>
                                        <div
                                            className={`delivery_shipping pe-2 p-0 pt-2 ${selectedOption === 'InStorePickUp' ? 'selected' : ''}`}
                                        >
                                            <div className='padding_width d-flex align-items-center justify-content-between'>
                                                <p className='m-0'>In-store pick up</p>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="delivery"
                                                    id="radioOption2"
                                                    value="InStorePickUp"
                                                    checked={selectedOption === 'InStorePickUp'}
                                                    onChange={handleRadioChange}
                                                />
                                            </div>
                                            <div className='pick_up_shipping text-center'>
                                                <p className='fw-bolder'>Buy now, pick up from our store at your convenience</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping */}
                                <div className='mt-5'>
                                    <h6 className='delivery_title'>Shipping Address</h6>
                                    <div className='cart_Pincode mt-3'>
                                        <h6 data-bs-toggle="modal" data-bs-target="#address">
                                            <i className=" pe-2 fs-4"></i>
                                            <span style={{ fontSize: "13px" }}>Add a New Address</span>
                                            <span className='arrow_pin'>
                                                <i className="ri-add-line fs-5 text-center mx-auto d-block"></i>
                                            </span>
                                        </h6>
                                    </div>
                                    <div className="modal fade" id="address" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="col-lg-12 modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                            <div className="modal-content">
                                                <div className="modal-header border-0">
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body border-0 text-center pincode_modal">
                                                    <h6 className='fw-bold'>Add a New Address</h6>
                                                    <form>
                                                        <div className="row my-4 delivery_modal">
                                                            <div className="col">
                                                                <input type="text" className="form-control" placeholder="First Name" name="firstname" value={formData.firstname} onChange={handleChange} />
                                                            </div>
                                                            <div className="col">
                                                                <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row my-4 delivery_modal">
                                                            <div className="col">
                                                                <input type="text" className="form-control" placeholder="Street & House Number" name="address" value={formData.address} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row my-4 delivery_modal">
                                                            <div className="col">
                                                                <input type="text" className="form-control" placeholder="Additional Information (optional)" name="additionalInfo" />
                                                            </div>
                                                        </div>
                                                        <div className="row my-4 delivery_modal">
                                                            <div className="col">
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="Pincode"
                                                                    name="pincode"
                                                                    value={formData.pincode}
                                                                    onChange={handleChange}
                                                                />
                                                                {formErrors.pincode && <div className="text-danger">{formErrors.pincode}</div>}
                                                            </div>
                                                            <div className="col">
                                                                <input type="text" className="form-control" placeholder="City" name="city" value={formData.city} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row my-4 ">
                                                            <div className="col">
                                                                <select className="form-select delivery_modal_select" name="state" value={formData.state} onChange={handleChange}>
                                                                    <option value="">State</option>
                                                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                                    <option value="Assam">Assam</option>
                                                                    <option value="Bihar">Bihar</option>
                                                                    <option value="Gujarat">Gujarat</option>
                                                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                                                    <option value="Daman and Div">Daman and Div</option>
                                                                </select>
                                                            </div>
                                                            <div className="col">
                                                                <select className="form-select delivery_modal_select" name="country" value={formData.country} onChange={handleChange}>
                                                                    <option value="">Country</option>
                                                                    <option value="India">India</option>
                                                                    <option value="USA">USA</option>
                                                                    <option value="UK">UK</option>
                                                                    <option value="Australia">Australia</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="row my-4 delivery_modal">
                                                            <div className="col">
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="Mobile Number"
                                                                    name="mobile"
                                                                    value={formData.mobile}
                                                                    onChange={handleChange}
                                                                />
                                                                {formErrors.mobile && <div className="text-danger">{formErrors.mobile}</div>}
                                                            </div>
                                                        </div>
                                                        <p>Select Address Type</p>
                                                        <div className="row my-4">
                                                            <div className="col">
                                                                <select className="form-select delivery_modal_select" name="addressType" value={formData.addressType} onChange={handleChange}>
                                                                    <option value="">Select Address Type</option>
                                                                    <option value="Home">Home</option>
                                                                    <option value="Office">Office</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="modal-footer border-0 p-0">
                                                    <button
                                                        type="button"
                                                        className="w-100 p-3 btn btn_Save"
                                                        data-bs-dismiss="modal"
                                                        onClick={handlePlaceOrder}
                                                        disabled={!validateForm()}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Billing */}
                                <div>
                                    <h6 className='delivery_title'>Billing Address</h6>
                                    <div className="shipping_add mt-3 align-items-center justify-content-between d-flex">
                                        <label htmlFor="Shipping" className="address-label">
                                            <i className="pe-2 fs-4"></i>
                                            <span style={{ fontSize: "13px" }}>
                                                <strong>Same as Shipping Address</strong>
                                            </span>
                                        </label>
                                        <input
                                            className="form-check-input float-end align-middle"
                                            type="radio"
                                            name="address"
                                            id="Shipping"
                                            value="ShippingAddress"
                                            onChange={handleAddress}
                                            defaultChecked
                                        />
                                    </div>
                                    <div className="shipping_add mt-3 align-items-center justify-content-between d-flex">
                                        <label htmlFor="DifferentBilling" className="address-label">
                                            <i className="pe-2 fs-4"></i>
                                            <span style={{ fontSize: "13px" }}>
                                                <strong>Use a Different Billing Address</strong>
                                            </span>
                                        </label>
                                        <input
                                            className="form-check-input float-end align-middle"
                                            type="radio"
                                            name="address"
                                            id="DifferentBilling"
                                            value="DifferentBillingAddress"
                                            onChange={handleAddress}
                                        />
                                    </div>

                                    {
                                        showBillingForm && (
                                            <form>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="First Name" name="fname" />
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="Last Name" name="lname" />
                                                    </div>
                                                </div>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="Street & House Number" name="hnumber" />
                                                    </div>
                                                </div>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="Additional Information (optional)" name="hnumber" />
                                                    </div>
                                                </div>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <input type="number" className="form-control" placeholder="Pincode" name="pincode" />
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="City" name="city" />
                                                    </div>
                                                </div>
                                                <div className="row my-4 ">
                                                    <div className="col  ">
                                                        <select className="form-select delivery_modal_select" >
                                                            <option>State</option>
                                                            <option value="1">Andhra Pradesh</option>
                                                            <option value="2">Arunachal Pradesh</option>
                                                            <option value="3">Assam</option>
                                                            <option value="4">Bihar</option>
                                                            <option value="5">Chhattisgarh</option>
                                                            <option value="6">Daman and Div</option>
                                                        </select>
                                                    </div>
                                                    <div className="col">
                                                        <select className="form-select delivery_modal_select" >
                                                            <option>Country</option>
                                                            <option value="1">India</option>
                                                            <option value="2">Arunachal Pradesh</option>
                                                            <option value="3">Assam</option>
                                                            <option value="4">Bihar</option>
                                                            <option value="5">Chhattisgarh</option>
                                                            <option value="6">Daman and Div</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <input type="number" className="form-control" placeholder="Mobile Number" name="phone" />
                                                    </div>
                                                </div>
                                                <p>Select Address Type</p>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <p><strong>Home</strong>(7am-10pm delivery)</p>
                                                    </div>
                                                    <div className="col">
                                                        <p><strong>Office</strong>(10am-7pm delivery)</p>
                                                    </div>
                                                    <p>Preferences will help us plan your delivery. However, shipments can sometimes arrive early or later than planned.</p>
                                                </div>
                                            </form>
                                        )
                                    }

                                    <button className="btn btn_Save w-100 py-2" onClick={handleSubmitButton}>CONTINUE</button>
                                </div>
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
    );
};

export default Shipping;
