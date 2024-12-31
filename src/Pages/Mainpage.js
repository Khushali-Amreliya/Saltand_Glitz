// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick'
// import products from '../fakedata/Product';
// import { formatCurrency } from '../Utils/formateCurrency';

// const Mainpage = () => {
//   const getSlidesToShow = () => {
//     const width = window.innerWidth;
//     if (width >= 1200) {
//       return 4;
//     } else if (width >= 992) {
//       return 3;
//     } else if (width >= 576) {
//       return 2;
//     } else {
//       return 1;
//     }
//   };

//   const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

//   useEffect(() => {
//     const handleResize = () => {
//       setSlidesToShow(getSlidesToShow());
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const slidermenu = React.useRef(null);
//   const slider1 = React.useRef(null);

//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };
//   const settings1 = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 6000,
//     slidesToShow: slidesToShow,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   const settings2 = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 6000,
//     slidesToShow: slidesToShow,
//     slidesToScroll: 1,
//     arrows: true,
//   };
//   return (
//     <>
//       {/* <h1>Scheduled Task at 3:00 AM IST</h1>
//       <ScheduledTask /> */}
//       <section className='container-fluid d-lg-none d-md-none d-block'>
//         <div className='row'>
//           <div className='div_img'>
//             <div className='img_carousel'>
//               <img alt='Latest' src='assets/img/carousel1.webp' className='img-fluid item3' />
//               <h5>Latest</h5>
//             </div>
//             <div className='img_carousel'>
//               <img alt='Best Sellers' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_bestseller.png' className='img-fluid item3' />
//               <h5>Best Sellers</h5>
//             </div>
//             <div className='img_carousel'>
//               <img alt='Rings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/App/mobile_rings_1.png' className='img-fluid item3' />
//               <h5>Rings</h5>
//             </div>
//             <div className='img_carousel'>
//               <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_earrings.png' className='img-fluid item3' />
//               <h5>Earrings</h5>
//             </div>
//             <div className='img_carousel'>
//               <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_mangalsutra.png' className='img-fluid item3' />
//               <h5>Mangalsutras</h5>
//             </div>
//             <div className='img_carousel'>
//               <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_necklace.png' className='img-fluid item3' />
//               <h5>Necklaces</h5>
//             </div> <div className='img_carousel'>
//               <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_gifts.png' className='img-fluid item3' />
//               <h5>Wedding Gifs</h5>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className='container-fluid m-0 p-0 mb-5'>
//         <Slider {...settings}>
//           <div>
//             <img alt='' src='assets/img/banner1.jpg' className='img-fluid  banner_class'></img>
//           </div>
//           <div>
//             <img alt='' src='assets/img/banner2.jpg' className='img-fluid  banner_class'></img>
//           </div>
//           <div>
//             <img alt='' src='https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw00ae15cf/homepage/HeroBanner/fod-plp-desktop.jpg' className='img-fluid banner_class'></img>
//           </div>
//           <div>
//             <img alt='' src='assets/img/banner2.jpg' className='img-fluid  banner_class'></img>
//           </div>
//         </Slider>
//       </section>
//       <section className='container pb-5 pt-3'>
//         <div>
//           <h3 className='font_main text-center pb-3'>Solitaire</h3>
//           <div className='row position-relative'>
//             <div className='d-lg-block d-md-block d-sm-block d-none'>
//               <button onClick={() => slidermenu?.current?.slickPrev()} className='prev_btn absoluteSlider' ><i className="ri-arrow-left-wide-line"></i></button>
//             </div>
//             <div className=''>
//               <Slider ref={slidermenu} {...settings1}>
//                 {products.map((item) => (
//                   <div className='card border-0' key={item.id}>
//                     <Link to={`/productDetail/${item.id}`}>
//                       <img alt={item.title} src={item.image01} className='img-fluid px-2' />
//                     </Link>
//                     <div className='card-body'>
//                       <h6>{item.title}</h6>
//                       <p>
//                         {formatCurrency(item.price)} <span><del>{formatCurrency(item.delprice)}</del></span>
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//               <Link to="/earrings" className='text-decoration-none'>
//                 <button className='btn mx-auto d-block viewall_btn'>
//                   <span>View All</span>
//                 </button>
//               </Link>

//             </div>
//             <div className='d-lg-block d-md-block d-sm-block d-none'>
//               <button onClick={() => slidermenu?.current?.slickNext()} className="next_btn absolute1"><i className="ri-arrow-right-wide-line"></i></button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='container pb-5 shop_category'>
//         <div>
//           <div className='text-center'>
//             <h3 className='font_main pb-1 m-0 p-0'>Shop by Category</h3>
//             <p className='p_main pb-3'>Brilliant design and unparalleled craftsmanship.</p>
//           </div>
//           <div className='row'>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_22?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Necklaces & Pendants</h5>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_3?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Earrings</h5>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_23?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Bracelets</h5>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_34?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Rings</h5>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_25?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Eangagement Rings</h5>
//                   {/* <p>Shop Now &gt;</p> */}
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_20?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Home</h5>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Product Section */}
//       <section className='container'>
//         <div>
//           <h3 className='font_main text-center pb-4'>New Arrivals</h3>
//           <div className='row position-relative'>
//             <div className='d-lg-block d-md-block d-sm-block d-none'>
//               <button onClick={() => slider1?.current?.slickPrev()} className='prev_btn absoluteSlider' ><i className="ri-arrow-left-wide-line"></i></button>
//             </div>
//             <div className=''>
//               <Slider ref={slider1} {...settings2}>
//                 {products.map((item) => (
//                   <div className='card border-0' key={item.id}>
//                     <Link to={`/productDetail/${item.id}`}>
//                       <img alt={item.title} src={item.image01} className='img-fluid px-2' />
//                     </Link>
//                     <div className='card-body'>
//                       <h6 className=''>{item.title}</h6>
//                       <p>
//                         {formatCurrency(item.price)} <span><del>{formatCurrency(item.delprice)}</del></span>
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//               <Link to="/earrings" className='text-decoration-none'>
//                 <button className='btn mx-auto d-block viewall_btn'>
//                   <span>View All</span>
//                 </button>
//               </Link>
//             </div>
//             <div className='d-lg-block d-md-block d-sm-block d-none'>
//               <button onClick={() => slider1?.current?.slickNext()} className="next_btn absolute1"><i className="ri-arrow-right-wide-line"></i></button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='container-fluid my-5'>
//         <div>
//           <div className='row p-0 m-0'>
//             <div className='col-lg-6 col-md-6 col-sm-6 col-12 pe-0 m-0'>
//               <img alt='' src='assets/img/Responsive_1.webp' className='img-fluid h-100 festival_img1'></img>
//             </div>
//             <div className='col-lg-6 col-md-6 col-sm-6 col-12 ps-0 m-0'>
//               <img alt='' src='assets/img/Responsive_2.webp' className='img-fluid pb-1 festival_img2'></img>
//               <img alt='' src='assets/img/Responsive_3.webp' className='img-fluid  pt-3 festival_img3'></img>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='container my-5 pt-5 gift_sec_main'>
//         <div>
//           <div className='row'>
//             <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
//               <div className='card border-0'>
//                 <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Gifts for the Graduate</h5>
//                   <p className='line_hover'>Shop Now &nbsp; &gt;</p>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
//               <div className='card border-0'>
//                 <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Gifts for the Graduate</h5>
//                   <p className='line_hover'>Shop Now &nbsp; &gt;</p>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
//               <div className='card border-0'>
//                 <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Gifts for the Graduate</h5>
//                   <p className='line_hover'>Shop Now &nbsp; &gt;</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='container my-5 service_main'>
//         <div>
//           <div className='row service_p'>
//             <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
//               <i className="ri-truck-line fs-2"></i>
//               <h6 className=''>Complementary Shiping & Returns</h6>
//               <p className='m-0 pb-1'>We offer complimentary shipping and returns on all Tiffany orders.</p>
//               <span className='line_hover'>Learn More &nbsp; &gt;</span>
//             </div>
//             <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
//               <i className="ri-window-line fs-2"></i>
//               <h6 className=''>Tiffany At Your Service</h6>
//               <p className='m-0 pb-1'>We offer complimentary shipping and returns on all Tiffany orders.</p>
//               <span className='line_hover'>Contact Us &nbsp; &gt;</span>
//             </div>
//             <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
//               <i className="ri-calendar-line fs-2"></i>
//               <h6 className=''>Book An Appointment</h6>
//               <p className='m-0 pb-1'>We’re happy to help with in-store or virtual appointments.</p>
//               <span className='line_hover'>Book Now &nbsp; &gt;</span>
//             </div>
//             <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
//               <i className="ri-mail-send-line fs-2"></i>
//               <h6 className=''>The Iconic Blue Box</h6>
//               <p className='m-0 pb-1'>Your Tiffany purchase comes wrapped in our Blue Box packaging.</p>
//               <span className='line_hover'>Explore All Gifts &nbsp; &gt;</span>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='container-fluid p-0 m-0'>
//         <div>
//           <img alt='' src='assets/img/gift_banner.webp' className='img-fluid'></img>
//         </div>
//       </section>
//       {/* <section className='container-fluid p-0 m-0'>
//         <div>
//           <img alt='' src='assets/img/diamond_banner.webp' className='img-fluid'></img>
//         </div>
//       </section> */}
//     </>
//   )
// }

// export default Mainpage

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick'
// import products from '../fakedata/Product';
import { formatCurrency } from '../Utils/formateCurrency';
import axios from 'axios';
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


  const slidermenu = React.useRef(null);
  const slider1 = React.useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/upload/get_upload");
        console.log(response);
        setProducts(response.data); // Set products in state
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchProducts();
  }, []);
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
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };
  const navigate = useNavigate(); // Initialize useNavigate

  const handleProductClick = (id) => {
    // navigate(`/product/${id}`); // Navigate to ProductDetails page with the product ID
    navigate(`/Productdetails/${id}`); // Navigate to ProductDetails page with the product ID
    console.log(id);
  };
  return (
    <>
      {/* <h1>Scheduled Task at 3:00 AM IST</h1>
      <ScheduledTask /> */}
      <section className='container-fluid d-lg-none d-md-none d-block'>
        <div className='row'>
          <div className='div_img'>
            <div className='img_carousel'>
              <img alt='Latest' src='assets/img/carousel1.webp' className='img-fluid item3' />
              <h5>Latest</h5>
            </div>
            <div className='img_carousel'>
              <img alt='Best Sellers' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_bestseller.png' className='img-fluid item3' />
              <h5>Best Sellers</h5>
            </div>
            <div className='img_carousel'>
              <img alt='Rings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/App/mobile_rings_1.png' className='img-fluid item3' />
              <h5>Rings</h5>
            </div>
            <div className='img_carousel'>
              <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_earrings.png' className='img-fluid item3' />
              <h5>Earrings</h5>
            </div>
            <div className='img_carousel'>
              <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_mangalsutra.png' className='img-fluid item3' />
              <h5>Mangalsutras</h5>
            </div>
            <div className='img_carousel'>
              <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_necklace.png' className='img-fluid item3' />
              <h5>Necklaces</h5>
            </div> <div className='img_carousel'>
              <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_gifts.png' className='img-fluid item3' />
              <h5>Wedding Gifs</h5>
            </div>
          </div>
        </div>
      </section>

      <section className='container-fluid m-0 p-0 mb-5'>
        <Slider {...settings}>
          <div>
            <img alt='' src='assets/img/banner1.jpg' className='img-fluid  banner_class'></img>
          </div>
          <div>
            <img alt='' src='assets/img/banner2.jpg' className='img-fluid  banner_class'></img>
          </div>
          <div>
            <img alt='' src='https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw00ae15cf/homepage/HeroBanner/fod-plp-desktop.jpg' className='img-fluid banner_class'></img>
          </div>
          <div>
            <img alt='' src='assets/img/banner2.jpg' className='img-fluid  banner_class'></img>
          </div>
        </Slider>
      </section>
      <section className='container pb-5 pt-3'>
        <div>
          <h3 className='font_main text-center pb-3'>Solitaire</h3>
          <div className='row position-relative'>
            <div className='d-lg-block d-md-block d-sm-block d-none'>
              <button onClick={() => slidermenu?.current?.slickPrev()} className='prev_btn absoluteSlider' ><i className="ri-arrow-left-wide-line"></i></button>
            </div>
            <div className=''>
              <Slider ref={slidermenu} {...settings1}>
              {products.map((item) => (
                  <div className='card border-0' key={item._id} onClick={() => handleProductClick(item._id)}>
                    {/* <Link to={`/productDetail/${item._id}`}> */}
                    <Link to={`/Productdetails/${item._id}`}>
                      <img
                        alt={item.title}
                        src={item.image01}
                        className="img-fluid px-2"
                      />
                    {/* </Link> */}
                    </Link>
                    <div className="card-body">
                      <h6>{item.title}</h6>
                      <p>
                        {formatCurrency(item.total14KT)}{" "}
                        <span>
                          <del>{item.delprice ? formatCurrency(item.delprice) : ""}</del>
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
              <Link to="/earrings" className='text-decoration-none'>
                <button className='btn mx-auto d-block viewall_btn'>
                  <span>View All</span>
                </button>
              </Link>

            </div>
            <div className='d-lg-block d-md-block d-sm-block d-none'>
              <button onClick={() => slidermenu?.current?.slickNext()} className="next_btn absolute1"><i className="ri-arrow-right-wide-line"></i></button>
            </div>
          </div>
        </div>
      </section>
      <section className='container pb-5 shop_category'>
        <div>
          <div className='text-center'>
            <h3 className='font_main pb-1 m-0 p-0'>Shop by Category</h3>
            <p className='p_main pb-3'>Brilliant design and unparalleled craftsmanship.</p>
          </div>
          <div className='row'>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
              <div className='card border-0'>
                <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_22?$tile$&&fmt=webp' className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Necklaces & Pendants</h5>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
              <div className='card border-0'>
                <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_3?$tile$&&fmt=webp' className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Earrings</h5>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
              <div className='card border-0'>
                <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_23?$tile$&&fmt=webp' className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Bracelets</h5>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
              <div className='card border-0'>
                <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_34?$tile$&&fmt=webp' className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Rings</h5>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
              <div className='card border-0'>
                <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_25?$tile$&&fmt=webp' className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Eangagement Rings</h5>
                  {/* <p>Shop Now &gt;</p> */}
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
              <div className='card border-0'>
                <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_20?$tile$&&fmt=webp' className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Home</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Section */}
      <section className='container'>
        <div>
          <h3 className='font_main text-center pb-4'>New Arrivals</h3>
          <div className='row position-relative'>
            <div className='d-lg-block d-md-block d-sm-block d-none'>
              <button onClick={() => slider1?.current?.slickPrev()} className='prev_btn absoluteSlider' ><i className="ri-arrow-left-wide-line"></i></button>
            </div>
            <div className=''>
              <Slider ref={slider1} {...settings2}>
                {products.map((item) => (
                  <div className='card border-0' key={item.id} onClick={() => handleProductClick(item._id)}>
                    {/* <Link to={`/productDetail/${item._id}`}> */}
                    <Link to={`/Productdetails/${item._id}`}>
                      <img
                        alt={item.title}
                        src={item.image01}
                        className="img-fluid px-2"
                      />
                    {/* </Link> */}
                    </Link>
                    <div className="card-body">
                      <h6>{item.title}</h6>
                      <p>
                        {formatCurrency(item.total14KT)}{" "}
                        <span>
                          <del>{item.delprice ? formatCurrency(item.delprice) : ""}</del>
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
              <Link to="/earrings" className='text-decoration-none'>
                <button className='btn mx-auto d-block viewall_btn'>
                  <span>View All</span>
                </button>
              </Link>
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
      <section className='container my-5 pt-5 gift_sec_main'>
        <div>
          <div className='row'>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
              <div className='card border-0'>
                <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Gifts for the Graduate</h5>
                  <p className='line_hover'>Shop Now &nbsp; &gt;</p>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
              <div className='card border-0'>
                <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Gifts for the Graduate</h5>
                  <p className='line_hover'>Shop Now &nbsp; &gt;</p>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
              <div className='card border-0'>
                <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
                <div className='card-body text-center'>
                  <h5>Gifts for the Graduate</h5>
                  <p className='line_hover'>Shop Now &nbsp; &gt;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='container my-5 service_main'>
        <div>
          <div className='row service_p'>
            <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
              <i className="ri-truck-line fs-2"></i>
              <h6 className=''>Complementary Shiping & Returns</h6>
              <p className='m-0 pb-1'>We offer complimentary shipping and returns on all Tiffany orders.</p>
              <span className='line_hover'>Learn More &nbsp; &gt;</span>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
              <i className="ri-window-line fs-2"></i>
              <h6 className=''>Tiffany At Your Service</h6>
              <p className='m-0 pb-1'>We offer complimentary shipping and returns on all Tiffany orders.</p>
              <span className='line_hover'>Contact Us &nbsp; &gt;</span>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
              <i className="ri-calendar-line fs-2"></i>
              <h6 className=''>Book An Appointment</h6>
              <p className='m-0 pb-1'>We’re happy to help with in-store or virtual appointments.</p>
              <span className='line_hover'>Book Now &nbsp; &gt;</span>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
              <i className="ri-mail-send-line fs-2"></i>
              <h6 className=''>The Iconic Blue Box</h6>
              <p className='m-0 pb-1'>Your Tiffany purchase comes wrapped in our Blue Box packaging.</p>
              <span className='line_hover'>Explore All Gifts &nbsp; &gt;</span>
            </div>
          </div>
        </div>
      </section>
      <section className='container-fluid p-0 m-0'>
        <div>
          <img alt='' src='assets/img/gift_banner.webp' className='img-fluid'></img>
        </div>
      </section>
      {/* <section className='container-fluid p-0 m-0'>
        <div>
          <img alt='' src='assets/img/diamond_banner.webp' className='img-fluid'></img>
        </div>
      </section> */}
    </>
  )
}

export default Mainpage