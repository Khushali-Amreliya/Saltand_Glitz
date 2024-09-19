import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <section className='container-fluid footer_main'>
        <div className='row ps-3'>
          <div className='col-lg-2 col-md-6 col-sm-12 col-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Client Care</h6>
            <p><Link>Contact Us</Link></p>
            <p><Link>Track Your Order</Link></p>
            <p><Link>Book an Appointment</Link></p>
            <p><Link>Frequently Asked Questions</Link></p>
            <p><Link>Shipping & Returns</Link></p>
            <p><Link>Product Care & Repair</Link></p>
            <p><Link>Gift Cards</Link></p>
            <p><Link>Website Accessibility</Link></p>
          </div>
          <div className='col-lg-2 col-md-6 col-sm-12 col-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Our Company</h6>
            <p><Link>World of Tiffany</Link></p>
            <p><Link>Sustainability</Link></p>
            <p><Link>California Supply Chains Act</Link></p>
            <p><Link>California Privacy</Link></p>
            <p><Link>Tiffany Careers</Link></p>
            <p><Link>Website Policies</Link></p>
            <p><Link>Transparency in Coverage</Link></p>
            <p><Link>Do Not Sell or Share My Personal Information</Link></p>
            <p><Link>Opt-Out of Targeted Advertising</Link></p>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12 col-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Related Tiffany Sites</h6>
            <p><Link>Wedding & Gift Registry</Link></p>
            <p><Link>Business Accounts</Link></p>
            <p><Link>Tiffany for the Press</Link></p>
            <p><Link>The Tiffany & Co. Foundation</Link></p>
            <p><Link>Tiffany Alertline</Link></p>
            <p><Link>Site Index</Link></p>
          </div>
          <div className='col-lg-5 col-md-6 col-sm-12 col-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Latest from Tiffany</h6>
            <p style={{fontSize:"13px"}}>Be the first to know about exciting new designs, special events, store openings and much more
            </p>
            <input type='email' placeholder='Email' className="form-control border-bottom border-0 rounded-0 border-dark border-1" required></input>
            <button className='btn bg-dark text-light mt-3 mb-3'>Sign Up</button><br></br>
            <div className='text-center'>
              <i className="ri-instagram-line fs-2 px-3"></i>
              <i className="ri-facebook-box-fill fs-2 px-3"></i>
              <i className="ri-pinterest-fill fs-2 px-3"></i>
              <i className="ri-twitter-x-line fs-3 px-3"></i>
              <i className="ri-youtube-fill fs-2 px-3"></i>
            </div>
          </div>
          <h6 className='m-0 p-0 text-center pb-2'>© T&CO. 2024</h6>
        </div>
      </section>
    </>
  )
}

export default Footer