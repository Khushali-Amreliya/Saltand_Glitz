import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <>
      <section className='container-fluid footer_main d-lg-block d-md-block d-none  '>
        <div className='row ps-3'>
          <div className='col-lg-2 col-md-6 col-sm-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Client Care</h6>
            <p><Link to="">Contact Us</Link></p>
            <p><Link to="">Track Your Order</Link></p>
            <p><Link to="">Book an Appointment</Link></p>
            <p><Link to="">Frequently Asked Questions</Link></p>
            <p><Link to="">Shipping & Returns</Link></p>
            <p><Link to="">Product Care & Repair</Link></p>
            <p><Link to="">Gift Cards</Link></p>
            <p><Link to="">Website Accessibility</Link></p>
          </div>

          <div className='col-lg-2 col-md-6 col-sm-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Our Company</h6>
            <p><Link to="">World of Tiffany</Link></p>
            <p><Link to="">Sustainability</Link></p>
            <p><Link to="">California Supply Chains Act</Link></p>
            <p><Link to="">California Privacy</Link></p>
            <p><Link to="">Tiffany Careers</Link></p>
            <p><Link to="/return">Return Policies</Link></p>
            <p><Link to="/exchange">Exchange & Buy Back Policies</Link></p>
            <p><Link to="/warranty">Warranty Policies</Link></p>
            <p><Link to="">Opt-Out of Targeted Advertising</Link></p>
          </div>

          <div className='col-lg-3 col-md-6 col-sm-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Related Tiffany Sites</h6>
            <p><Link to="">Wedding & Gift Registry</Link></p>
            <p><Link to="">Business Accounts</Link></p>
            <p><Link to="">Tiffany for the Press</Link></p>
            <p><Link to="">The Tiffany & Co. Foundation</Link></p>
            <p><Link to="">Tiffany Alertline</Link></p>
            <p><Link to="">Site Index</Link></p>
          </div>

          <div className='col-lg-5 col-md-6 col-sm-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Latest from Tiffany</h6>
            <p style={{ fontSize: "13px" }} className='footer_email_p'>
              Be the first to know about exciting new designs, special events, store openings, and much more.
            </p>
            <input
              type='email'
              placeholder='Email'
              className="form-control border-bottom border-0 rounded-0 border-dark border-1"
              required
            />
            <button className='btn bg-dark text-light mt-3 mb-3'>Sign Up</button>
            <div className='text-center'>
              <i className="ri-instagram-line fs-2 px-3"></i>
              <i className="ri-facebook-box-fill fs-2 px-3"></i>
              <i className="ri-pinterest-fill fs-2 px-3"></i>
              <i className="ri-twitter-x-line fs-3 px-3"></i>
              <i className="ri-youtube-fill fs-2 px-3"></i>
            </div>
          </div>
        </div>
        <h6 className='m-0 p-0 text-center pb-2'>© T&CO. 2024</h6>

      </section>
      <section className='container footer_main py-3 d-sm-block d-lg-none d-md-none'>
        <div className='row'>
          <div className='faq-container'>
            {faqData.map((faq, index) => (
              <div key={index} className='faq'>
                <div
                  className='faq-question'
                  onClick={() => toggleFAQ(index)}
                  style={{ cursor: 'pointer' }}
                >
                  {faq.question}
                  <span className='toggle-icon'>
                    {activeIndex === index ? '-' : '+'}
                  </span>
                </div>
                <div
                  className={`faq-answer ${activeIndex === index ? 'open' : ''}`}
                  style={{ display: activeIndex === index ? 'block' : 'none' }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
          <div className='text-center pt-3'>
            <i className="ri-instagram-line fs-2 px-3"></i>
            <i className="ri-facebook-box-fill fs-2 px-3"></i>
            <i className="ri-pinterest-fill fs-2 px-3"></i>
            <i className="ri-twitter-x-line fs-3 px-3"></i>
            <i className="ri-youtube-fill fs-2 px-3"></i>

            <h6 className='m-0 p-0 text-center pt-3'>© T&CO. 2024</h6>

          </div>
        </div>
      </section>
    </>

  );
};
const faqData = [
  {
    question: "Client Care",
    answer: (
      <div>
        <p><Link to="">Contact Us</Link></p>
        <p><Link to="">Track Your Order</Link></p>
        <p><Link to="">Book an Appointment</Link></p>
        <p><Link to="">Frequently Asked Questions</Link></p>
        <p><Link to="">Shipping & Returns</Link></p>
        <p><Link to="">Product Care & Repair</Link></p>
        <p><Link to="">Gift Cards</Link></p>
        <p><Link to="">Website Accessibility</Link></p>
      </div>
    )
  },
  {
    question: "Our Company",
    answer: (
      <div>
        <p><Link to="">World of Tiffany</Link></p>
        <p><Link to="">Sustainability</Link></p>
        <p><Link to="">California Supply Chains Act</Link></p>
        <p><Link to="">California Privacy</Link></p>
        <p><Link to="">Tiffany Careers</Link></p>
        <p><Link to="/return">Return Policy</Link></p>
        <p><Link to="/exchange">Transparency in Coverage</Link></p>
        <p><Link to="/warranty">Warranty Policies</Link></p>
        <p><Link to="">Opt-Out of Targeted Advertising</Link></p>
      </div>
    ),
  },
  {
    question: 'Related Tiffany Sites',
    answer: (
      <div>
        <p><Link to="">Wedding & Gift Registry</Link></p>
        <p><Link to="">Business Accounts</Link></p>
        <p><Link to="">Tiffany for the Press</Link></p>
        <p><Link to="">The Tiffany & Co. Foundation</Link></p>
        <p><Link to="">Tiffany Alertline</Link></p>
        <p><Link to="">Site Index</Link></p>
      </div>
    ),
  },
  {
    question: 'Latest from Tiffany',
    answer: (
      <div>
        <p style={{ fontSize: "13px" }}>
          Be the first to know about exciting new designs, special events, store openings, and much more.
        </p>
        <input
          type='email'
          placeholder='Email'
          className="form-control border-bottom border-0 rounded-0 border-dark border-1"
          required
        />
        <button className='btn bg-dark text-light mt-3 mb-3'>Sign Up</button>

      </div>
    ),
  },
];
export default Footer;
