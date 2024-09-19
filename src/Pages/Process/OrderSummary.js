import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartAction } from '../../Store/Slice/CartSlice';
import { formatCurrency } from '../../Utils/formateCurrency';

const OrderSummary = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.cartItem);
    const [subtotal, setSubtotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [couponDiscount, setCouponDiscount] = useState(0); // New state for coupon discount in rupees
    const discountPercentage = useSelector(state => state.cart.discount); // Renamed for clarity

    const deleteItem = (itemId) => {
        dispatch(cartAction.deleteItem({ id: itemId }));
    };

    const calculateSubtotal = useCallback(() => {
        return cartItems.reduce((total, item) => total + Number(item.totalprice), 0);
    }, [cartItems]);

    const updateAmounts = useCallback(() => {
        const newSubtotal = calculateSubtotal();
        setSubtotal(newSubtotal);

        // Calculate discount amount in rupees
        const calculatedDiscount = newSubtotal * (discountPercentage / 100);
        setCouponDiscount(calculatedDiscount);

        // Calculate total amount after discount
        const discountedAmount = newSubtotal - calculatedDiscount;
        setTotalAmount(discountedAmount);
    }, [calculateSubtotal, discountPercentage]);

    useEffect(() => {
        updateAmounts();
    }, [cartItems, discountPercentage, updateAmounts]);

    return (
        <div className='login_product px-3'>
            <h5 className='pb-3 fw-bold'>Order Summary</h5>
            {
                cartItems.map((item) => (
                    <div className='row align-items-center d-flex py-1' key={item.id}>
                        <div className='col-lg-3 col-md-4 col-sm-12 col-12'>
                            <Link to={`/productDetail/${item.id}`}>
                                <img alt={item.title} src={item.image01} className='img-fluid cart_img' />
                            </Link>
                        </div>
                        <div className='col-lg-9 col-md-8 col-sm-12 col-12 pt-3 d-flex justify-content-between'>
                            <div>
                                <h6 className='m-0 pb-1 login_title'>{item.title}</h6>
                                <p className='login_SKU m-0 p-0'>SKU: JS02322-1YP900</p>
                                <p className='login_quantity m-0 py-2'>Quantity: {item.quantity}</p>
                                <p className='login_delivery m-0 p-0'>Expected Delivery by - 30th Aug</p>
                                <p className='login_price'>{formatCurrency(item.totalprice)}</p>
                            </div>
                            <span className='delete__btn float-end' onClick={() => deleteItem(item.id)}>
                                <i className="ri-close-circle-fill"></i>
                            </span>
                        </div>
                    </div>
                ))
            }
            <div className='login_total summary_border'>
                <h6 className='login_subtotal'>
                    SUBTOTAL
                    <span>{formatCurrency(subtotal)}</span>
                </h6>
                <h6 className='login_discount'>
                    COUPON DISCOUNT
                    <span className="fw-bold">- {formatCurrency(couponDiscount.toFixed())}</span>
                </h6>
                <h6 className='login_shipping'>
                    SHIPPING CHARGES
                    <span>FREE</span>
                </h6>
            </div>
            <h6 className='login_cost fw-bold'>
                TOTAL COST
                <span>{formatCurrency(totalAmount.toFixed())}</span>
            </h6>
            <p className='text-center fw-bold' style={{ color: "#8863fb", fontSize: "14px" }}>Need Help?</p>
            <p className='text-center login_SKU'>We’re available by phone +91-44-66075200 (Toll Free) every day, 9 AM to 1 AM IST (Mon - Sun)</p>
            <div className='text-center pt-3'>
                <i className="ri-phone-line fs-4 bg-dark text-light rounded-pill p-2 vertical-align-middle"></i>
                <i className="ri-whatsapp-line fs-4 bg-dark text-light rounded-pill p-2 vertical-align-middle mx-3"></i>
                <i className="ri-mail-line fs-4 bg-dark text-light rounded-pill p-2 vertical-align-middle"></i>
            </div>
        </div>
    )
}

export default OrderSummary