import React from 'react'

const Contact = () => {
    return (
        <>
            <section className="bg_contact">
                <div className='contact_text'>
                    <h4>At Your Service</h4>
                    <p>From finding the perfect present to product personalization, master the art of holiday gifting with assistance from Tiffany & Co. client advisors. </p>
                </div>
            </section>
            <section className='container py-3'>
                <div className='contact_text_md'>
                    <h4>At Your Service</h4>
                    <p>From finding the perfect present to product personalization, master the art of holiday gifting with assistance from Tiffany & Co. client advisors. </p>
                </div>
            </section>
            <section className='container contact_details'>
                <h2 className='text-center font_main'>Contact Us</h2>
                <div className='row text-center py-5'>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                        <i class="ri-mail-line fs-4"></i>
                        <p className='p_main'>support@saltandglitz.com<i class="ri-arrow-drop-right-line fs-4 align-middle"></i></p>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                        <i class="ri-phone-line fs-4"></i>
                        <p className='p_main'>Call us at +91 7984369890<i class="ri-arrow-drop-right-line fs-4 align-middle"></i></p>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                        <i class="ri-vip-diamond-line fs-4"></i>
                        <p className='p_main'>Book an Appoinment with a Diamond Expert<i class="ri-arrow-drop-right-line fs-4 align-middle"></i></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact