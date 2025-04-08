import React, { useCallback, useEffect, useState } from 'react';
import OrderSummary from '../Process/OrderSummary';
import Loader from '../Loader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Shipping = () => {
    // const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const [showBillingForm, setShowBillingForm] = useState(false);
    const [cartId, setCartId] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('HomeDelivery');
    const [user, setUser] = useState({});

    useEffect(() => {
        // Fetch user profile from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []); // This will only run on component mount

    const fetchCart = async () => {
        try {
            let userId = user?._id || localStorage.getItem("guestUserId");

            const response = await axios.get(
                `https://saltandglitz-api-131827005467.asia-south2.run.app/v1/cart/getCart/${userId}`
            );
            // console.log(response.data.cart.cart_id);
            setCartId(response.data.cart.cart_id);
        } catch (err) {
            console.error("Error fetching cart data:", err);
        }
    };

    useEffect(() => {
        fetchCart(); // 👈 useEffect ke andar sirf call karo
    }, [user?._id]);

    const [formErrors, setFormErrors] = useState({
        postalCode: '',
    });
    const [formData, setFormData] = useState({

        street: '',
        postalCode: '',
        city: '',
        state: '',
        country: '',
    });
    const [billingData, setBillingData] = useState({
        street: '',
        postalCode: '',
        city: '',
        state: '',
        country: '',
    });

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleAddress = (e) => {
        const selectedOption = e.target.value;

        if (selectedOption === "ShippingAddress") {
            setBillingData({ ...formData }); // Copy shipping to billing
            setShowBillingForm(false); // Hide billing form
        } else {
            setBillingData({
                street: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            });
            setShowBillingForm(true); // Show billing form for editing
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingData(prev => ({ ...prev, [name]: value }));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'postalCode' && !/^\d{0,6}$/.test(value)) {
            return;
        }

        // if (name === 'mobile' && !/^\d{0,10}$/.test(value)) {
        //     return;
        // }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const isPincodeValid = /^\d{6}$/.test(formData.postalCode);
        // const isMobileValid = /^\d{10}$/.test(formData.mobile);

        return (
            Object.values(formData).every(field => field.trim() !== '') &&
            isPincodeValid
        );
    };

    const handlePlaceOrder = async () => {
        const isPincodeValid = /^\d{6}$/.test(formData.postalCode);

        if (!validateForm() || !isPincodeValid) {
            setFormErrors({
                postalCode: isPincodeValid ? '' : 'Pincode must be 6 digits.',
            });
            toast.error("Please correct the errors in the form.");
            return;
        }


        setLoading(true);
        try {
            const payload = {
                cartId: cartId,
                billingAddress: {
                    street: billingData.street,
                    city: billingData.city,
                    state: billingData.state,
                    postalCode: billingData.postalCode,
                    country: billingData.country
                },
                shippingAddress: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: formData.country
                }
            };

            await axios.post('https://saltandglitz-api-131827005467.asia-south2.run.app/v1/order/createOrder', payload);

            setLoading(false);
            toast.success("Your address has been successfully added!");
            navigate('/gift');
        } catch (error) {
            console.error('Failed to add address:', error);
            setLoading(false);
            toast.error("There was an error submitting your address. Please try again.");
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
        // console.log(window.scrollY);
        setIsScrolled(window.scrollY > 50);
        // console.log(isScrolled);
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
                        {/* <i className="ri-shopping-cart-fill cart_logo_icon d-lg-block d-md-block d-sm-block d-none"></i> */}
                        {/* <img alt='' src='/assets/img/tiffco-logo-2.svg' className='cart_logo_icon'></img> */}
                    </div>
                    <Link to="/" className="text-decoration-none text-dark">
                        SALT & GLITZ
                    </Link>
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
                                {/* <h6 className='delivery_title'>Delivery Details</h6> */}
                                {/* <div className='row'>
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
                                </div> */}

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
                                                                <input type="text" className="form-control" placeholder="First Name" name="firstname" value={user?.firstName || "firstName"} onChange={handleChange} />
                                                            </div>
                                                            <div className="col">
                                                                <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={user?.lastName || "lastName"} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row my-4 delivery_modal">
                                                            <div className="col">
                                                                <input type="text" className="form-control" placeholder="Street & House Number" name="street" value={formData.street} onChange={handleChange} />
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
                                                                    name="postalCode"
                                                                    value={formData.postalCode}
                                                                    onChange={handleChange}
                                                                />
                                                                {formErrors.postalCode && <div className="text-danger">{formErrors.postalCode}</div>}
                                                            </div>
                                                            <div className="col">
                                                                <input type="text" className="form-control" placeholder="City" name="city" value={formData.city} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row my-4 delivery_modal">
                                                            <div className="col">
                                                                <input type="text" className="form-control" placeholder="State" name="state" value={formData.state} onChange={handleChange} />
                                                            </div>
                                                            <div className="col">
                                                                <input type="text" className="form-control" placeholder="Country" name="country" value={formData.country} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row my-4 delivery_modal">
                                                            <div className="col">
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="Mobile Number"
                                                                    name="mobile"
                                                                    value={user?.mobileNumber || "Mobile"}
                                                                    onChange={handleChange}
                                                                />
                                                                {formErrors.mobile && <div className="text-danger">{formErrors.mobile}</div>}
                                                            </div>
                                                        </div>
                                                        {/* <p>Select Address Type</p>
                                                        <div className="row my-4">
                                                            <div className="col">
                                                                <select className="form-select delivery_modal_select" name="addressType" value={formData.addressType} onChange={handleChange}>
                                                                    <option value="">Select Address Type</option>
                                                                    <option value="Home">Home</option>
                                                                    <option value="Office">Office</option>
                                                                </select>
                                                            </div>
                                                        </div> */}
                                                    </form>
                                                </div>
                                                <div className="modal-footer border-0 p-0">
                                                    <button
                                                        type="button"
                                                        className="w-100 p-3 btn btn_Save"
                                                        data-bs-dismiss="modal"
                                                        // onClick={handlePlaceOrder}
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
                                            name="street"
                                            id="Shipping"
                                            value="ShippingAddress"
                                            onChange={handleAddress}
                                            
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
                                            name="street"
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
                                                        <input type="text" className="form-control" placeholder="First Name" name="firstname" value={user?.firstName || "firstName"} onChange={handleBillingChange} />
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={user?.lastName || "lastName"} onChange={handleBillingChange} />
                                                    </div>
                                                </div>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="Street & House Number" name="street" value={billingData.street} onChange={handleBillingChange} />
                                                    </div>
                                                </div>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="Additional Information (optional)" name="hnumber" />
                                                    </div>
                                                </div>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <input type="number" className="form-control" placeholder="Pincode" name="postalCode" value={billingData.postalCode} onChange={handleBillingChange} />
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="City" name="city" value={billingData.city} onChange={handleBillingChange} />
                                                    </div>
                                                </div>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col  ">
                                                        <input type="text" className="form-control" placeholder="State" name="state" value={billingData.state} onChange={handleBillingChange} />
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="Country" name="country" value={billingData.country} onChange={handleBillingChange} />
                                                    </div>
                                                </div>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <input type="number" className="form-control" placeholder="Mobile Number" name="mobile" value={user?.mobileNumber || "Mobile"} onChange={handleBillingChange} />
                                                    </div>
                                                </div>
                                                {/* <p>Select Address Type</p>
                                                <div className="row my-4 delivery_modal">
                                                    <div className="col">
                                                        <p><strong>Home</strong>(7am-10pm delivery)</p>
                                                    </div>
                                                    <div className="col">
                                                        <p><strong>Office</strong>(10am-7pm delivery)</p>
                                                    </div>
                                                    <p>Preferences will help us plan your delivery. However, shipments can sometimes arrive early or later than planned.</p>
                                                </div> */}
                                            </form>
                                        )
                                    }

                                    <button className="btn btn_Save w-100 py-2" onClick={handlePlaceOrder}>CONTINUE</button>
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
                        <strong>Contact Us:</strong>&nbsp; +91-44-66075200 (Helpline) | contactus@saltandglitz.com
                    </p>
                </div>
                <div className="cart_footer_right">
                    <img src="/assets/img/cart_footer_logo.png" alt="payment-icon" className="payment-icon" />
                    <img src="/assets/img/cart_footer_logo1.png" alt="MasterCard" className="payment-icon" />
                    <img src="/assets/img/cart_footer_logo2.png" alt="PayPal" className="payment-icon" />
                    <img src="/assets/img/cart_footer_logo3.png" alt="American Express" className="payment-icon" />
                </div>
            </section>
        </>
    );
};

export default Shipping;
