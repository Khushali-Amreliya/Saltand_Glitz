import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick'
import products from '../fakedata/Product';
import { formatCurrency } from '../Utils/formateCurrency';
// import ScheduledTask from '../ScheduledTask';

const Mainpage = () => {
  const getSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      return 4;
    } else if (width >= 992) {
      return 3;
    } else if (width >= 576) {
      return 2;
    } else {
      return 1;
    }
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slidermenu = React.useRef(null);
  const slider1 = React.useRef(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <>
      {/* <h1>Scheduled Task at 3:00 AM IST</h1>
      <ScheduledTask /> */}
      <section className='container-fluid m-0 p-0 mb-5'>
        <Slider {...settings}>
          <div>
            <img alt='' src='assets/img/banner1.jpg' className='img-fluid banner_class'></img>
          </div>
          <div>
            <img alt='' src='assets/img/banner2.jpg' className='img-fluid banner_class'></img>
          </div>
          <div>
            <img alt='' src='https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw00ae15cf/homepage/HeroBanner/fod-plp-desktop.jpg' className='img-fluid banner_class'></img>
          </div>
          <div>
            <img alt='' src='assets/img/banner2.jpg' className='img-fluid banner_class'></img>
          </div>
        </Slider>
      </section>
      <section className='container pb-4'>
        <div>
          <h3 className='fw-bold text-center pb-3'>Solitaire</h3>
          <div className='row position-relative'>
            <div className='d-lg-block d-md-block d-sm-block d-none'>
              <button onClick={() => slidermenu?.current?.slickPrev()} className='prev_btn absoluteSlider' ><i className="ri-arrow-left-wide-line"></i></button>
            </div>
            <div className=''>
              <Slider ref={slidermenu} {...settings1}>
                <div className='card border-0'>
                  <img alt='' src='assets/img/carousel_solitaire1.webp' className='img-fluid px-2'></img>
                  <div className='card-body text-center'>
                    <h6>Hardware By Tiffany</h6>
                    <p>Shop Now &gt;</p>
                  </div>
                </div>
                <div className='card border-0'>
                  <img alt='' src='assets/img/carousel_solitaire.webp' className='img-fluid px-2'></img>
                  <div className='card-body text-center'>
                    <h6>Hardware By Tiffany</h6>
                    <p>Shop Now &gt;</p>
                  </div>
                </div>
                <div className='card border-0'>
                  <img alt='' src='assets/img/carousel_solitaire2.webp' className='img-fluid px-2'></img>
                  <div className='card-body text-center'>
                    <h6>Hardware By Tiffany</h6>
                    <p>Shop Now &gt;</p>
                  </div>
                </div>
                <div className='card border-0'>
                  <img alt='' src='assets/img/carousel_solitaire1.webp' className='img-fluid px-2'></img>
                  <div className='card-body text-center'>
                    <h6>Hardware By Tiffany</h6>
                    <p>Shop Now &gt;</p>
                  </div>
                </div>
              </Slider>
            </div>
            <div className='d-lg-block d-md-block d-sm-block d-none'>
              <button onClick={() => slidermenu?.current?.slickNext()} className="next_btn absolute1"><i className="ri-arrow-right-wide-line"></i></button>
            </div>
          </div>
        </div>
      </section>
      <section className='container pb-5'>
        <div>
          <div className='text-center'>
            <h3 className='fw-bold pb-1 m-0 p-0'>Shop By Category</h3>
            <p>Brilliant design and unparalleled craftsmanship.</p>
          </div>
          <div className='row'>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
              <div className='card border-0'>
                <img alt='' src='assets/img/category_img.webp' className='img-fluid px-2'></img>
                <div className='card-body text-center'>
                  <h6>Hardware By Tiffany</h6>
                  <p>Shop Now &gt;</p>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
              <div className='card border-0'>
                <img alt='' src='assets/img/category_img.webp' className='img-fluid px-2'></img>
                <div className='card-body text-center'>
                  <h6>Hardware By Tiffany</h6>
                  <p>Shop Now &gt;</p>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
              <div className='card border-0'>
                <img alt='' src='assets/img/category_img.webp' className='img-fluid px-2'></img>
                <div className='card-body text-center'>
                  <h6>Hardware By Tiffany</h6>
                  <p>Shop Now &gt;</p>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
              <div className='card border-0'>
                <img alt='' src='assets/img/category_img.webp' className='img-fluid px-2'></img>
                <div className='card-body text-center'>
                  <h6>Hardware By Tiffany</h6>
                  <p>Shop Now &gt;</p>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
              <div className='card border-0'>
                <img alt='' src='assets/img/category_img.webp' className='img-fluid px-2'></img>
                <div className='card-body text-center'>
                  <h6>Hardware By Tiffany</h6>
                  <p>Shop Now &gt;</p>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
              <div className='card border-0'>
                <img alt='' src='assets/img/category_img.webp' className='img-fluid px-2'></img>
                <div className='card-body text-center'>
                  <h6>Hardware By Tiffany</h6>
                  <p>Shop Now &gt;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Section */}
      <section className='container'>
        <div>
          <h3 className='fw-bold text-center pb-4'>Best Of CartLane</h3>
          <div className='row position-relative'>
            <div className='d-lg-block d-md-block d-sm-block d-none'>
              <button onClick={() => slider1?.current?.slickPrev()} className='prev_btn absoluteSlider' ><i className="ri-arrow-left-wide-line"></i></button>
            </div>
            <div className=''>
              <Slider ref={slider1} {...settings2}>
                {products.map((item) => (
                  <div className='card border-0' key={item.id}>
                    <Link to={`/productDetail/${item.id}`}>
                      <img alt={item.title} src={item.image01} className='img-fluid px-2' />
                    </Link>
                    <div className='card-body cartlane'>
                      <h6>
                        {formatCurrency(item.price)} <span><del>{formatCurrency(item.delprice)}</del></span>
                      </h6>
                      <p>{item.title}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className='d-lg-block d-md-block d-sm-block d-none'>
              <button onClick={() => slider1?.current?.slickNext()} className="next_btn absolute1"><i className="ri-arrow-right-wide-line"></i></button>
            </div>
          </div>
        </div>
      </section>
      <section className='container-fluid my-5'>
        <div>
          <div className='row p-0 m-0'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-12 pe-0 m-0'>
              <img alt='' src='assets/img/Responsive_1.webp' className='img-fluid h-100 festival_img1'></img>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-6 col-12 ps-0 m-0'>
              <img alt='' src='assets/img/Responsive_2.webp' className='img-fluid pb-1 festival_img2'></img>
              <img alt='' src='assets/img/Responsive_3.webp' className='img-fluid  pt-3 festival_img3'></img>
            </div>
          </div>
        </div>
      </section>
      <section className='container my-5 pt-5'>
        <div>
          <div className='row'>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
              <div className='card border-0'>
                <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Gifts for the Graduate</h5>
                  <p>Shop Now &gt;</p>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
              <div className='card border-0'>
                <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Gifts for the Graduate</h5>
                  <p>Shop Now &gt;</p>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
              <div className='card border-0'>
                <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Gifts for the Graduate</h5>
                  <p>Shop Now &gt;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='container-fluid p-0 m-0'>
        <div>
          <img alt='' src='assets/img/gift_banner.webp' className='img-fluid'></img>
        </div>
      </section>
      <section className='container my-5'>
        <div>
          <div className='row service_p'>
            <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
              <i className="ri-truck-line fs-2"></i>
              <h6 className='fw-bold'>Complementary Shiping & Returns</h6>
              <p className='m-0 pb-1'>We offer complimentary shipping and returns on all Tiffany orders.</p>
              <p className='fw-bold'>Learn More &gt;</p>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
              <i className="ri-window-line fs-2"></i>
              <h6 className='fw-bold'>Tiffany At Your Service</h6>
              <p className='m-0 pb-1'>Our client care experts are always here to help.</p>
              <p className='fw-bold'>Contact Us &gt;</p>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
              <i className="ri-calendar-line fs-2"></i>
              <h6 className='fw-bold'>Book An Appointment</h6>
              <p className='m-0 pb-1'>We’re happy to help with in-store or virtual appointments.</p>
              <p className='fw-bold'>Book Now &gt;</p>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
              <i className="ri-mail-send-line fs-2"></i>
              <h6 className='fw-bold'>The Iconic Blue Box</h6>
              <p className='m-0 pb-1'>Your Tiffany purchase comes wrapped in our Blue Box packaging.</p>
              <p className='fw-bold'>Explore All Gifts &gt;</p>
            </div>
          </div>
        </div>
      </section>
      <section className='container-fluid p-0 m-0'>
        <div>
          <img alt='' src='assets/img/diamond_banner.webp' className='img-fluid'></img>
        </div>
      </section>
    </>
  )
}

export default Mainpage

// {`/productDetail/${item.id}`} ====> Line-203