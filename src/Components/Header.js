import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const Header = () => {
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const wishlistItem = useSelector(state => state.cart.wishlistItem);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className=" m-0 p-0" style={{ borderBottom: "2px solid #b2ebf7" }}>
            <section className='container-fluid text-center header_color py-1'>
                <Slider {...settings}>
                    <div>
                        <h6>BEST D2C GAMECHANGER BRAND 2023</h6>
                    </div>
                    <div>
                        <h6>FEMINA POWER BRANDS 2023</h6>
                    </div>
                </Slider>
            </section>

            {/* Large device */}
            <section className='container-fluid pt-2 d-lg-block d-md-none d-none'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-12 header_logo text-center'>
                        {/* <i className="ri-search-line"></i> */}
                        <form action="" className='ps-4'>
                            <div className="p-1 bg-light rounded rounded-pill shadow-sm">
                                <div className="input-group">
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
                            <Link to="/">
                                <img
                                    alt=''
                                    src='assets/img/tiffco-logo-2.svg'
                                    className='img-fluid w-50 mx-auto d-block'
                                />
                            </Link>
                        </div>
                    </div>

                    <div className='col-lg-3 col-md-3 col-sm-12 header_logo d-flex justify-content-center align-items-center text-center'>
                        <Link to="/Uprofile" className='text-decoration-none text-dark'>
                            <i className="ri-user-line"></i>
                        </Link>
                        <Link className='text-decoration-none text-dark pe-4' to="/wishlist">
                            <i className="ri-heart-fill pe-0 position-relative">
                                {wishlistItem.length > 0 && (
                                    <span className="badge badge-icon">{wishlistItem.length}</span>
                                )}
                            </i>
                        </Link>
                        <Link className='text-decoration-none text-dark' to="/cart">
                            <i className="ri-shopping-cart-fill pe-0 position-relative">
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
                            <div className="offcanvas-header">
                                <h5 id="offcanvasExampleLabel"></h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            <i className="ri-subtract-line"></i> Jewellery
                                        </Link>
                                        <ul className="dropdown-menu dropdown-md-content" aria-labelledby="navbarDropdown">
                                            <div className='row'>
                                                <div className='col-lg-3 pe-5'>
                                                    <h6 to="" className='border-dropdown'>Shop By Category</h6>
                                                    <li><Link>Necklaces & Pendants</Link></li>
                                                    <li data-bs-dismiss="offcanvas"><Link to="/earrings">Earrings</Link></li>
                                                    <li><Link>Bracelets</Link></li>
                                                    <li><Link>Rings</Link></li>
                                                    <li><Link>Fine Watches</Link></li>
                                                    <li><Link>Brooches</Link></li>
                                                    <li><Link>Men's Jewelry</Link></li>
                                                </div>
                                                <div className='col-lg-3 pe-5'>
                                                    <h6 to="" className='border-dropdown'>Shop By Category</h6>
                                                    <li><Link>Necklaces & Pendants</Link></li>
                                                    <li><Link>Earrings</Link></li>
                                                    <li><Link>Bracelets</Link></li>
                                                    <li><Link>Rings</Link></li>
                                                    <li><Link>Fine Watches</Link></li>
                                                    <li><Link>Brooches</Link></li>
                                                    <li><Link>Men's Jewelry</Link></li>
                                                </div><div className='col-lg-3 pe-5'>
                                                    <h6 to="" className='border-dropdown'>Shop By Category</h6>
                                                    <li><Link>Necklaces & Pendants</Link></li>
                                                    <li><Link>Earrings</Link></li>
                                                    <li><Link>Bracelets</Link></li>
                                                    <li><Link>Rings</Link></li>
                                                    <li><Link>Fine Watches</Link></li>
                                                    <li><Link>Brooches</Link></li>
                                                    <li><Link>Men's Jewelry</Link></li>
                                                </div><div className='col-lg-3 pe-5'>
                                                    <h6 to="" className='border-dropdown'>Shop By Category</h6>
                                                    <li><Link>Necklaces & Pendants</Link></li>
                                                    <li><Link>Earrings</Link></li>
                                                    <li><Link>Bracelets</Link></li>
                                                    <li><Link>Rings</Link></li>
                                                    <li><Link>Fine Watches</Link></li>
                                                    <li><Link>Brooches</Link></li>
                                                    <li><Link>Men's Jewelry</Link></li>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            <i className="ri-subtract-line"></i> Office & Daily Wear
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            <i className="ri-subtract-line"></i> Love & Engagement
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            <i className="ri-subtract-line"></i> Gifts
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            <i className="ri-subtract-line"></i> Know Your Diamond
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            <i className="ri-subtract-line"></i> About Us
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
                            <Link to="/">
                                <img
                                    alt=''
                                    src='assets/img/tiffco-logo-2.svg'
                                    className='mx-auto d-block main_logo'
                                />
                            </Link>
                        </div>
                    </div>

                    <div className='col-sm-2 col-3 d-flex justify-content-center align-items-center'>
                        <Link className='text-decoration-none text-dark pe-3' to="/wishlist">
                            <i className="ri-heart-fill pe-0 position-relative">
                                {wishlistItem.length > 0 && (
                                    <span className="badge badge-icon">{wishlistItem.length}</span>
                                )}
                            </i>
                        </Link>
                        <Link className='text-decoration-none text-dark' to="/cart">
                            <i className="ri-shopping-cart-fill pe-0 position-relative">
                                {totalQuantity > 0 && (
                                    <span className="badge badge-icon">{totalQuantity}</span>
                                )}
                            </i>
                        </Link>
                    </div>
                    <form action="" className='pt-3'>
                        <div className="p-1 bg-light rounded rounded-pill shadow-sm">
                            <div className="input-group">
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
            <section className='container'>
                <div className='row'>
                    <div className='justify-content-center d-flex'>
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            Jewellery
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="navbarDropdown">
                                            <div className='row'>
                                                <div className='col-lg-3 pe-5'>
                                                    <h6 to="" className='border-dropdown'>Shop By Category</h6>
                                                    <li><Link>Necklaces & Pendants</Link></li>
                                                    <li><Link to="/earrings">Earrings</Link></li>
                                                    <li><Link>Bracelets</Link></li>
                                                    <li><Link>Rings</Link></li>
                                                    <li><Link>Fine Watches</Link></li>
                                                    <li><Link>Brooches</Link></li>
                                                    <li><Link>Men's Jewelry</Link></li>
                                                </div>
                                                <div className='col-lg-3 pe-5'>
                                                    <h6 to="" className='border-dropdown'>Shop By Category</h6>
                                                    <li><Link>Necklaces & Pendants</Link></li>
                                                    <li><Link>Earrings</Link></li>
                                                    <li><Link>Bracelets</Link></li>
                                                    <li><Link>Rings</Link></li>
                                                    <li><Link>Fine Watches</Link></li>
                                                    <li><Link>Brooches</Link></li>
                                                    <li><Link>Men's Jewelry</Link></li>
                                                </div><div className='col-lg-3 pe-5'>
                                                    <h6 to="" className='border-dropdown'>Shop By Category</h6>
                                                    <li><Link>Necklaces & Pendants</Link></li>
                                                    <li><Link>Earrings</Link></li>
                                                    <li><Link>Bracelets</Link></li>
                                                    <li><Link>Rings</Link></li>
                                                    <li><Link>Fine Watches</Link></li>
                                                    <li><Link>Brooches</Link></li>
                                                    <li><Link>Men's Jewelry</Link></li>
                                                </div><div className='col-lg-3 pe-5'>
                                                    <h6 to="" className='border-dropdown'>Shop By Category</h6>
                                                    <li><Link>Necklaces & Pendants</Link></li>
                                                    <li><Link>Earrings</Link></li>
                                                    <li><Link>Bracelets</Link></li>
                                                    <li><Link>Rings</Link></li>
                                                    <li><Link>Fine Watches</Link></li>
                                                    <li><Link>Brooches</Link></li>
                                                    <li><Link>Men's Jewelry</Link></li>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            Office & Daily Wear
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            Love & Engagement
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            Gifts
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            Know Your Diamond
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            About Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Header;
