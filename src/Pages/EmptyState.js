import React from 'react'
import { Link } from 'react-router-dom'

const EmptyState = () => {
    return (
        <>
            <div className="empty-state-container">
                <div className="image-container">
                    {/* Placeholder for the illustration */}
                    <i className="ri-shopping-cart-fill" style={{ fontSize: "80px" }}></i>
                </div>
                <h1 className="title p-0 m-0">There is nothing here!</h1>
                <p className="subtitle">Let's do some retail therapy.</p>
                <div className='d-lg-block d-none'>
                    <Link to="/"><button className="start-button">START SHOPPING</button></Link>
                </div>
                
                <div className="footer">
                    <div className="footer-item">
                        <img src="assets/img/delivery.png" alt="BIS" className="img-fluid " />
                        <p>BIS 100% Hallmarked Jewellery</p>
                    </div>
                    <div className="footer-item">
                        <img src="assets/img/pdp-delivery-tah-sprite (3).png" alt="Tanishq" className="img-fluid " />
                        <p>Trust of Tanishq Titan Privileges</p>
                    </div>
                    <div className="footer-item">
                        <img src="assets/img/pdp-delivery-tah-sprite (2).png" alt="Caratlane" className="img-fluid " />
                        <p>100% Certified by Caratlane</p>
                    </div>
                </div>
                <div className='d-lg-none d-block filter_midium_divice w-100 py-2'>
                    <Link to="/"><button className="btn start_btn_md">START SHOPPING</button></Link>
                </div>
            </div>
        </>
    )
}

export default EmptyState