import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { formatCurrency } from '../Utils/formateCurrency';
import products from '../fakedata/Product';
import { toast } from 'react-toastify';
import { cartAction } from '../Store/Slice/CartSlice';
import { signOut } from 'firebase/auth';
import auth from './firebase';

const Header = () => {
    const search = React.useRef(null);
    const searchmd = React.useRef(null);

    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const wishlistItem = useSelector(state => state.cart.wishlistItem);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const slider_search = {
        slidesToShow: 5, // Default: Show 5 slides
        slidesToScroll: 1, // Scroll one at a time
        infinite: false, // Disable infinite scrolling
        afterChange: (index) => setCurrentIndex(index), // Track index after change
        responsive: [
            {
                breakpoint: 1200, // For devices with width <= 1200px
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992, // For devices with width <= 992px
                settings: {
                    slidesToShow: 3,
                },
            }
        ],
    };

    const slider_search_md = {
        slidesToShow: 3, // Default: Show 5 slides
        slidesToScroll: 1, // Scroll one at a time
        infinite: false, // Disable infinite scrolling
        afterChange: (index) => setCurrentIndex(index), // Track index after change
        responsive: [
            {
                breakpoint: 1200, // For devices with width <= 1200px
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992, // For devices with width <= 992px
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768, // For devices with width <= 768px
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 576, // For devices with width <= 576px
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };
    const [searchTerm, setSearchTerm] = useState('');
    // const search = useRef();

    // Filtered products based on search term
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // To redirect after logout
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();



    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // Safely parse user data
                setIsLoggedIn(true); // Set logged in state if user exists
            } catch (error) {
                console.error('Error parsing user data:', error);
                toast.error('Error loading user data. Please log in again.');
                localStorage.removeItem('user'); // Clear invalid data
                navigate('/'); // Redirect to signup or login page
            }
        }
    }, [navigate]); // Include navigate as a dependency

    const handleLogout = async () => {
        if (!user) {
            toast.warn('You are not signed in.');
            return;
        }

        try {
            await signOut(auth);

            // Clear Redux cart and wishlist
            dispatch(cartAction.clearCartAndWishlist());

            // Clear user data
            localStorage.removeItem('user');
            setUser(null);
            setIsLoggedIn(false); // Update the login state to false

            toast.success('You have successfully logged out');
            navigate('/'); // Redirect to homepage after logout
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Something went wrong during log-out.');
        }
    };

    // recently viewd
    const recentlyViewed = useSelector(state => state.cart.recentlyViewed);

    return (
        <div className=" m-0 p-0">
            <section className='container-fluid text-center header_color py-1'>
                <Slider {...settings}>
                    <div>
                        <h6>This Holiday, enjoy complimentary shipping & extended returns with our Tiffany Blue® packaging.</h6>
                    </div>
                    <div>
                        <h6>Our gift to you: A Bird on a Rock charm to adorn your Tiffany Blue® bag, complimentary with every online delivery order.</h6>
                    </div>
                    <div>
                        <h6>New for the holidays: limited-edition Return to Tiffany® designs. </h6>
                    </div>
                </Slider>
            </section>

            {/* Large device */}
            <section className='container-fluid pt-2 d-lg-block d-md-none d-none'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-12 header_logo text-center'>
                        {/* <i className="ri-search-line"></i> */}
                        {/* searchbar */}
                        <form action="" className='ps-4'>
                            <div className="p-1 bg-light rounded rounded-pill shadow-sm">
                                <div className="input-group" data-bs-toggle="offcanvas" data-bs-target="#searchOffcanvas" aria-controls="searchOffcanvas">
                                    <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" className="form-control border-0 bg-light" />
                                    <div className="input-group-append">
                                        <button id="button-addon1" type="submit" className="btn btn-link search_btn_header"><i className="fa fa-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* <i className="ri-map-pin-line"></i>
                        <i className="ri-contacts-line"></i> */}
                        {/* <form className='serach-box'>
                            <input type="text" className='serach' />
                            <div className="after"></div>
                            <input type="submit" className='serach'  />
                        </form>
                        <h4 className='serach-set'>&nbsp;</h4> */}

                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center'>
                        <div>
                            <Link to="/" className="text-decoration-none fs-5 text-dark">
                                {/* <img
                                    alt=''
                                    src='assets/img/tiffco-logo-2.svg'
                                    className='img-fluid w-50 mx-auto d-block'
                                /> */}
                                SALT & GLITZ
                            </Link>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-12 header_logo d-flex justify-content-end align-items-center'>
                        <Link className='text-decoration-none text-dark' to="/contact">
                            <i className="ri-contacts-line">
                                <span className='align-middle' style={{fontSize:"14px",fontWeight:"500"}}>&nbsp; Contact us</span>
                                
                            </i>
                        </Link>
                        <div className="dropdown drp_main">
                            <Link className="text-decoration-none text-dark dropdown-toggle" id="dropdownUserLink" role="button">
                                <i className="ri-user-line nav_icon text-center"></i>
                            </Link>
                            <ul className="dropdown-menu drp_icon" aria-labelledby="dropdownUserLink">
                                {isLoggedIn ? (
                                    <>
                                        <div className="">
                                            <p className="user-email px-3">{user ? user.email : 'Guest'}</p>
                                            <div className="underline mb-3 ms-3"></div>
                                            <ul className="profile-menu">
                                                <li className="mb-2">
                                                    <Link to="/Userprofile" className="profile-menu-item">
                                                        <i className="ri-user-3-fill"></i> My Account
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="" className="profile-menu-item logout" onClick={handleLogout}>
                                                        <i className="ri-logout-box-line"></i> Logout
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='p-3 header_login'>
                                            <h5>Your Account</h5>
                                            <p className='m-0 pt-2'>Access account & manage your orders.</p>
                                            <li className="dropdown-item pt-3">
                                                <Link to="/loginn" className="pe-2">
                                                    <button className='btn'>Login</button>
                                                </Link>
                                                <Link to="/signup">
                                                    <button className='btn'>Signup</button>
                                                </Link>
                                            </li>
                                        </div>
                                    </>
                                )}
                            </ul>
                        </div>

                        <Link className='text-decoration-none text-dark' to="/wishlist">
                            <i className="ri-heart-line text-center position-relative">
                                {wishlistItem.length > 0 && (
                                    <span className="badge badge-icon badge_icon_w text-center">{wishlistItem.length}</span>
                                )}
                            </i>
                        </Link>
                        <Link className='text-decoration-none text-dark' to="/cart">
                            <i className="ri-shopping-cart-2-line pe-0 position-relative">
                                {totalQuantity > 0 && (
                                    <span className="badge badge-icon">{totalQuantity}</span>
                                )}
                            </i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Small device */}
            <section className='container-fluid pt-2 d-md-block d-sm-block d-lg-none'>
                <div className='row'>
                    <div className='col-sm-2 col-2'>
                        <i className="ri-menu-line fs-5 fw-bolder" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" ></i>
                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                            <div className="offcanvas-header mb-0">
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                {/* <h5 id="offcanvasExampleLabel" className='text-light'>.</h5> */}
                                {/* <Link to={isLoggedIn ? "/Userprofile" : "/signup"} className='text-decoration-none text-dark'>
                                    <i className="ri-user-line"></i>
                                </Link> */}
                                <Link className="text-decoration-none text-dark dropdown-toggle" id="dropdownUserLink" role="button">
                                    <i className="ri-user-fill nav_icon text-center"></i>
                                </Link>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="jewellerymd">
                                            <i className="ri-subtract-line"></i>Jewellery
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="jewellerymd">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings1.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        ENGAGEMENT
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        DAILY WEAR
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COUPLE RINGS
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings4.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COCKTAIL
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings5.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        INFINITY
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings6.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Solitaire
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        platinum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings8.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        bands
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings9.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        promise rings
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings10.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        adjustable rings
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            diamond
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            Gemstone
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            navratna
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pearl
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            yellow gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            rose gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal8.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            white gold
                                                        </Link>
                                                    </li>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link>Under ₹ 10k</Link></li>
                                                    <li><Link>₹10k to ₹20k</Link></li>
                                                    <li><Link>₹20k to ₹30k</Link></li>
                                                    <li><Link>₹30k to ₹50k</Link></li>
                                                    <li><Link>₹50k to ₹75k</Link></li>
                                                    <li><Link>Above ₹ 75k</Link></li>
                                                    <li><Link>FOR MEN</Link></li>
                                                </div><div className='col-lg-4 pe-5'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/08-AUG/others/PostCard/RightSideBanner/RightSideBanner_Postcard.jpg' className='img-fluid'></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="dailywearmd">
                                            <i className="ri-subtract-line"></i>Office & Daily Wear
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="dailywearmd">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings1.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        ENGAGEMENT
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        DAILY WEAR
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COUPLE RINGS
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings4.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COCKTAIL
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings5.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        INFINITY
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings6.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Solitaire
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        platinum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings8.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        bands
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings9.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        promise rings
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings10.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        adjustable rings
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            diamond
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            Gemstone
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            navratna
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pearl
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            yellow gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            rose gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal8.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            white gold
                                                        </Link>
                                                    </li>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link>Under ₹ 10k</Link></li>
                                                    <li><Link>₹10k to ₹20k</Link></li>
                                                    <li><Link>₹20k to ₹30k</Link></li>
                                                    <li><Link>₹30k to ₹50k</Link></li>
                                                    <li><Link>₹50k to ₹75k</Link></li>
                                                    <li><Link>Above ₹ 75k</Link></li>
                                                    <li><Link>FOR MEN</Link></li>
                                                </div><div className='col-lg-4 pe-5'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Stud.jpg' className='img-fluid'></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="engagementmd">
                                            <i className="ri-subtract-line"></i>Love & Engagement
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="engagementmd">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings1.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        ENGAGEMENT
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        DAILY WEAR
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COUPLE RINGS
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings4.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COCKTAIL
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings5.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        INFINITY
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings6.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Solitaire
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        platinum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings8.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        bands
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings9.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        promise rings
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings10.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        adjustable rings
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            diamond
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            Gemstone
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            navratna
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pearl
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            yellow gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            rose gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center"
                                                            data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal8.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            white gold
                                                        </Link>
                                                    </li>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link>Under ₹ 10k</Link></li>
                                                    <li><Link>₹10k to ₹20k</Link></li>
                                                    <li><Link>₹20k to ₹30k</Link></li>
                                                    <li><Link>₹30k to ₹50k</Link></li>
                                                    <li><Link>₹50k to ₹75k</Link></li>
                                                    <li><Link>Above ₹ 75k</Link></li>
                                                    <li><Link>FOR MEN</Link></li>
                                                </div><div className='col-lg-4 pe-5'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Bracelets.jpg' className='img-fluid'></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="giftsmd">
                                            <i className="ri-subtract-line"></i>Gifts
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="giftsmd">
                                            <div className='row'>
                                                <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 p-0 m-0'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/07_JULY/others/PostCard/PostCard_DropDown.jpg' className='img-fluid'></img>
                                                </div>
                                                <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 p-0 m-0'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/11_NOV/HPBanner/Gift/01/Mark-Your-Anniversary_DropDown2X.jpg' className='img-fluid'></img>
                                                </div>
                                                <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 p-0 m-0'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/11_NOV/HPBanner/Gift/01/Gifts-Under-20K_DropDown2X.jpg' className='img-fluid'></img>
                                                </div>
                                                <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 p-0 m-0'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/07_JULY/others/DropDown/GiftingPeak_DropDown.jpg' className='img-fluid'></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            <i className="ri-subtract-line"></i>Know Your Diamond
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="/aboutUs" id="navbarDropdown" data-bs-dismiss="offcanvas" aria-label="Close">
                                            <i className="ri-subtract-line"></i>About Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='btn_md'>
                                <Link to="/loginn" data-bs-dismiss="offcanvas"><button className='btn'><span>Log In</span></button></Link>
                                <Link to="/signup" data-bs-dismiss="offcanvas"><button className='btn mt-2'><span>Sign Up</span></button></Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-8 col-7 d-flex justify-content-center align-items-center'>
                        <div>
                            {/* <Link to="/">
                                <img
                                    alt=''
                                    src='assets/img/tiffco-logo-2.svg'
                                    className='mx-auto d-block main_logo'
                                />
                            </Link> */}
                            <Link to="/" className="text-decoration-none fs-5 text-dark">
                                {/* <img
                                    alt=''
                                    src='assets/img/tiffco-logo-2.svg'
                                    className='img-fluid w-50 mx-auto d-block'
                                /> */}
                                SALT & GLITZ
                            </Link>
                        </div>
                    </div>

                    <div className='col-sm-2 col-3 d-flex justify-content-center align-items-center'>
                        <Link className='text-decoration-none text-dark pe-3' to="/wishlist">
                            <i className="ri-heart-line pe-0 position-relative">
                                {wishlistItem.length > 0 && (
                                    <span className="badge badge-icon">{wishlistItem.length}</span>
                                )}
                            </i>
                        </Link>
                        <Link className='text-decoration-none text-dark' to="/cart">
                            <i className="ri-shopping-cart-line pe-0 position-relative">
                                {totalQuantity > 0 && (
                                    <span className="badge badge-icon">{totalQuantity}</span>
                                )}
                            </i>
                        </Link>
                    </div>
                    <form action="" className='pt-3'>
                        <div className="p-1 bg-light rounded rounded-pill shadow-sm">
                            <div className="input-group" data-bs-toggle="offcanvas" data-bs-target="#mdsearchOffcanvas" aria-controls="mdsearchOffcanvas">
                                <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" className="form-control border-0 bg-light" />
                                <div className="input-group-append">
                                    <button id="button-addon1" type="submit" className="btn btn-link search_btn_header"><i className="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/* Dropdown */}
            <section className='container-fluid'>
                <div className='row'>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light pt-0 pb-1">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="jewellery">
                                            Jewellery
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="jewellery">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings1.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        ENGAGEMENT
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        DAILY WEAR
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COUPLE RINGS
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings4.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COCKTAIL
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings5.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        INFINITY
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Solitaire
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        platinum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings8.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        bands
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings9.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        promise rings
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings10.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        adjustable rings
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            diamond
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            Gemstone
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            navratna
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pearl
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            yellow gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            rose gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal8.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            white gold
                                                        </Link>
                                                    </li>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link>Under ₹ 10k</Link></li>
                                                    <li><Link>₹10k to ₹20k</Link></li>
                                                    <li><Link>₹20k to ₹30k</Link></li>
                                                    <li><Link>₹30k to ₹50k</Link></li>
                                                    <li><Link>₹50k to ₹75k</Link></li>
                                                    <li><Link>Above ₹ 75k</Link></li>
                                                    <li><Link>FOR MEN</Link></li>
                                                </div><div className='col-lg-4 pe-5'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/08-AUG/others/PostCard/RightSideBanner/RightSideBanner_Postcard.jpg' className='img-fluid'></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="dailywear">
                                            Office & Daily Wear
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="dailywear">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings1.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        ENGAGEMENT
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        DAILY WEAR
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COUPLE RINGS
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings4.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COCKTAIL
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings5.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        INFINITY
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Solitaire
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        platinum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings8.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        bands
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings9.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        promise rings
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings10.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        adjustable rings
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            diamond
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            Gemstone
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            navratna
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pearl
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            yellow gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            rose gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal8.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            white gold
                                                        </Link>
                                                    </li>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link>Under ₹ 10k</Link></li>
                                                    <li><Link>₹10k to ₹20k</Link></li>
                                                    <li><Link>₹20k to ₹30k</Link></li>
                                                    <li><Link>₹30k to ₹50k</Link></li>
                                                    <li><Link>₹50k to ₹75k</Link></li>
                                                    <li><Link>Above ₹ 75k</Link></li>
                                                    <li><Link>FOR MEN</Link></li>
                                                </div><div className='col-lg-4 pe-5'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Stud.jpg' className='img-fluid'></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="engagement">
                                            Love & Engagement
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="engagement">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings1.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        ENGAGEMENT
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        DAILY WEAR
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COUPLE RINGS
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings4.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COCKTAIL
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings5.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        INFINITY
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Solitaire
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        platinum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings8.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        bands
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings9.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        promise rings
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='assets/img/rings10.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        adjustable rings
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            diamond
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            Gemstone
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            navratna
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pearl
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            yellow gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            rose gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='assets/img/metal8.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            white gold
                                                        </Link>
                                                    </li>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link>Under ₹ 10k</Link></li>
                                                    <li><Link>₹10k to ₹20k</Link></li>
                                                    <li><Link>₹20k to ₹30k</Link></li>
                                                    <li><Link>₹30k to ₹50k</Link></li>
                                                    <li><Link>₹50k to ₹75k</Link></li>
                                                    <li><Link>Above ₹ 75k</Link></li>
                                                    <li><Link>FOR MEN</Link></li>
                                                </div><div className='col-lg-4 pe-5'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Bracelets.jpg' className='img-fluid'></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="gifts">
                                            Gifts
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="gifts">
                                            <div className='row px-4'>
                                                <div className='col-lg-3 p-0 m-0'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/07_JULY/others/PostCard/PostCard_DropDown.jpg' className='img-fluid'></img>
                                                </div>
                                                <div className='col-lg-3 p-0 m-0'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/11_NOV/HPBanner/Gift/01/Mark-Your-Anniversary_DropDown2X.jpg' className='img-fluid'></img>
                                                </div>
                                                <div className='col-lg-3 p-0 m-0'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/11_NOV/HPBanner/Gift/01/Gifts-Under-20K_DropDown2X.jpg' className='img-fluid'></img>
                                                </div>
                                                <div className='col-lg-3 p-0 m-0'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/07_JULY/others/DropDown/GiftingPeak_DropDown.jpg' className='img-fluid'></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            Know Your Diamond
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="/aboutUs" id="navbarDropdown">
                                            About Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </section>

            {/*LARGE OFFCANVAS */}
            <div className="offcanvas offcanvas-start offcanvas_start_search" tabIndex="-1" id="searchOffcanvas" aria-labelledby="offcanvasSearchLabel">
                <div className="offcanvas-header offcanvas_header_search">
                    <h5 className="offcanvas-title w-100 pe-3" id="offcanvasSearchLabel">
                        <form action="" className='pt-3' onSubmit={(e) => e.preventDefault()}>
                            <div className="p-1 bg-light rounded rounded-pill shadow-sm">
                                <div className="input-group">
                                    <input
                                        type="search"
                                        placeholder="What're you searching for?"
                                        className="form-control border-0 bg-light"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-link search_btn_header">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </h5>
                    <button type="button" className="btn-close btn_close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <h5 className='trending_title'>Search Results</h5>
                    <div className='row offcanvas_search'>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (
                                <div className='col-lg-6 px-4' key={item.id}>
                                    <div className="search-item">
                                        <Link to={`/productDetail/${item.id}`} className="text-decoration-none text-dark" >
                                            <div className="left">
                                                <img src={item.image01} alt={item.title} className='img-fluid search_offcanvas_arrow' />
                                                <span>{item.title}</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>

                    <h5 className="trending_title pt-4">Recently Viewed</h5>
                    <div className="row position-relative">
                        {recentlyViewed.length > 0 ? (
                            <>
                                {/* Prev Button */}
                                {currentIndex > 0 && (
                                    <div>
                                        <button
                                            onClick={() => search?.current?.slickPrev()}
                                            className="pre-btn-set"
                                        >
                                            <i className="ri-arrow-left-wide-line"></i>
                                        </button>
                                    </div>
                                )}

                                <Slider ref={search} {...slider_search}>
                                    {recentlyViewed.map((item) => (
                                        <div
                                            className="card border-0 w-100 mx-auto d-block"
                                            key={item.id}
                                        >
                                            <Link to={`/productDetail/${item.id}`}>
                                                <img
                                                    alt={item.title}
                                                    src={item.image01}
                                                    className="img-fluid px-2 position-relative"
                                                />
                                            </Link>
                                            <div className="card-body cartlane">
                                                <h6>
                                                    {formatCurrency(item.price)}{" "}
                                                    <span>
                                                        <del>{formatCurrency(item.delprice)}</del>
                                                    </span>
                                                </h6>
                                                <p>{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>

                                {/* Next Button */}
                                {currentIndex < recentlyViewed.length - slider_search.slidesToShow && (
                                    <div>
                                        <button
                                            onClick={() => search?.current?.slickNext()}
                                            className="next-btn-set float-end"
                                        >
                                            <i className="ri-arrow-right-wide-line"></i>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center w-100 pt-5">
                                <p>You haven't viewed any products yet. Start exploring now!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/*MD OFFCANVAS */}
            <div className="offcanvas offcanvas-bottom rounded-0" tabIndex="-1" id="mdsearchOffcanvas" aria-labelledby="mdoffcanvasSearchLabel">
                <div className="offcanvas-header offcanvas_header_search">
                    <h5 className="offcanvas-title w-100 pe-3" id="offcanvasSearchLabel">
                        <form action="" className='pt-3' onSubmit={(e) => e.preventDefault()}>
                            <div className="p-1 bg-light rounded rounded-pill shadow-sm">
                                <div className="input-group">
                                    <input
                                        type="search"
                                        placeholder="What're you searching for?"
                                        className="form-control border-0 bg-light"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-link search_btn_header">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </h5>
                    <button type="button" className="btn-close btn_close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <h5 className='trending_title'>Search Results</h5>
                    <div className='row offcanvas_search'>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (
                                <div className='col-lg-6 px-4' key={item.id}>
                                    <div className="search-item">
                                        <Link to={`/productDetail/${item.id}`} className="text-decoration-none text-dark">
                                            <div className="left">
                                                <img src={item.image01} alt={item.title} className='img-fluid search_offcanvas_arrow' />
                                                <span>{item.title}</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>

                    <h5 className="trending_title pt-4">Recently Viewed</h5>
                    <div className="row position-relative">
                        {recentlyViewed.length > 0 ? (
                            <>
                                {/* Prev Button */}
                                {currentIndex > 0 && (
                                    <div>
                                        <button
                                            onClick={() => searchmd?.current?.slickPrev()}
                                            className="pre-btn-set"
                                        >
                                            <i className="ri-arrow-left-wide-line"></i>
                                        </button>
                                    </div>
                                )}

                                <Slider ref={searchmd} {...slider_search_md}>
                                    {recentlyViewed.map((item) => (
                                        <div
                                            className="card border-0 w-100 mx-auto d-block"
                                            key={item.id}
                                        >
                                            <Link to={`/productDetail/${item.id}`}>
                                                <img
                                                    alt={item.title}
                                                    src={item.image01}
                                                    className="img-fluid px-2 position-relative"
                                                />
                                            </Link>
                                            <div className="card-body cartlane">
                                                <h6>
                                                    {formatCurrency(item.price)}{" "}
                                                    <span>
                                                        <del>{formatCurrency(item.delprice)}</del>
                                                    </span>
                                                </h6>
                                                <p>{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>

                                {/* Next Button */}
                                {currentIndex < recentlyViewed.length - slider_search_md.slidesToShow && (
                                    <div>
                                        <button
                                            onClick={() => searchmd?.current?.slickNext()}
                                            className="next-btn-set float-end"
                                        >
                                            <i className="ri-arrow-right-wide-line"></i>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center w-100 pt-5">
                                <p>You haven't viewed any products yet. Start exploring now!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
