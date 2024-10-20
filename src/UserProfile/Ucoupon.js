import React from 'react';
import Uprofile from './Uprofile';

const Ucoupon = () => {
    return (
        <>
            <div className=''>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 m-0 p-0'>
                            <Uprofile />
                        </div>
                        <div className='col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 m-0 p-0'>
                            <h3 className='p-3 main_title_copoun_profile'>All Offers</h3>
                            <div className="coupon-cards-container">
                                {/* Coupon Card 1 */}
                                <div className="coupon-card">
                                    <div className=''>
                                        <div className="discount-circle">
                                            <h2>3% OFF</h2>
                                        </div>
                                    </div>
                                    <div className="coupon-details">
                                        <p>Flat 3% off on Both studded and Preset jewellery above 50k bill value with max Cap 4k</p>
                                        <p>Code: <strong>EXTRA3</strong> <span className="copy-code">Copy Code</span></p>
                                        <div className="expiration">
                                            <p>Expires on November 04 2024</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Coupon Card 2 */}
                                <div className="coupon-card">
                                    <div className="discount-circle">
                                        <h2>5% OFF</h2>
                                    </div>
                                    <div className="coupon-details">
                                        <p>Flat 5% off on Both studded and Preset jewellery above 1 Lac bill value with max Cap 9K</p>
                                        <p>Code: <strong>EXTRA5</strong> <span className="copy-code">Copy Code</span></p>
                                        <div className="expiration">
                                            <p>Expires on November 04 2024</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Coupon Card 3 */}
                                <div className="coupon-card">
                                    <div className="discount-circle">
                                        <h2>5% OFF</h2>
                                    </div>
                                    <div className="coupon-details">
                                        <p>Flat 5% Off on Solitaire Mount SKU</p>
                                        <p>Code: <strong>MOUNT5</strong> <span className="copy-code">Copy Code</span></p>
                                        <div className="expiration">
                                            <p>Expires on November 04 2024</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Coupon Card 4 */}
                                <div className="coupon-card">
                                    <div className="discount-circle">
                                        <h2>3% OFF</h2>
                                    </div>
                                    <div className="coupon-details">
                                        <p>Flat 3% Off on Loose Solitaires Only</p>
                                        <p>Code: <strong>PERFECT3 </strong> <span className="copy-code">Copy Code</span></p>
                                        <div className="expiration">
                                            <p>Expires on November 04 2024</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Coupon Card 5 */}
                                <div className="coupon-card">
                                    <div className="discount-circle">
                                        <h2>20% OFF</h2>
                                    </div>
                                    <div className="coupon-details">
                                        <p>Get Extra 20% OFF on Shaya - Silver Jewellery on and above 10000</p>
                                        <p>Code: <strong>SHAYAFEST20  </strong> <span className="copy-code">Copy Code</span></p>
                                        <div className="expiration">
                                            <p>Expires on November 04 2024</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Coupon Card 6 */}
                                <div className="coupon-card">
                                    <div className="discount-circle">
                                        <h2>10% OFF</h2>
                                    </div>
                                    <div className="coupon-details">
                                        <p>Get Extra 10% OFF on Shaya - Silver Jewellery on and above 5000</p>
                                        <p>Code: <strong>SHAYAFEST10 </strong> <span className="copy-code">Copy Code</span></p>
                                        <div className="expiration">
                                            <p>Expires on November 04 2024</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ucoupon;