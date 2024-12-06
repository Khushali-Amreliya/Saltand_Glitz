import React, { useEffect, useState } from 'react';
import ProductCard from './Product/productCard';
import productsData from '../fakedata/Product';
import Helmet from '../Components/Helmet';

const Earrings = () => {
    // Initial product images
    const images = [
        'assets/img/product_img1.jpg',
        'assets/img/product_img.jpg',
    ];

    // Scroll to the top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [products, setProducts] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const priceRanges = [
        '₹10,001 - ₹15,000',
        '₹20,001 - ₹30,000',
        'Under ₹5,000',
        '₹5,001 - ₹10,000',
        '₹15,001 - ₹20,000',
        '₹30,001 - ₹40,000',
        '₹40,000 - ₹50,000',
        '₹50,000 - ₹75,000',
        '₹1,50,001 - ₹2,00,000'
    ];

    const discountOptions = [...new Set(products.map(product => `${product.discount}%`))];

    // Fetch products data on component mount
    useEffect(() => {
        setProducts(productsData);
        window.scrollTo(0, 0);
    }, []);

    const [showMorePrices, setShowMorePrices] = useState(false);
    const [showMoreDiscount, setShowMoreDiscount] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // page starts from 1
    const itemsPerPage = 6; // Number of products per page

    const handleFilterChange = (type, value) => {
        let updatedSelection;
        switch (type) {
            case 'price':
                updatedSelection = selectedPriceRanges.includes(value)
                    ? selectedPriceRanges.filter(price => price !== value)
                    : [...selectedPriceRanges, value];
                setSelectedPriceRanges(updatedSelection);
                break;
            case 'discount':
                updatedSelection = selectedDiscounts.includes(value)
                    ? selectedDiscounts.filter(discount => discount !== value)
                    : [...selectedDiscounts, value];
                setSelectedDiscounts(updatedSelection);
                break;
            case 'discountRange':
                updatedSelection = selectedDiscountRanges.includes(value)
                    ? selectedDiscountRanges.filter(range => range !== value)
                    : [...selectedDiscountRanges, value];
                setSelectedDiscountRanges(updatedSelection);
                break;
            case 'category':
                updatedSelection = selectedCategories.includes(value)
                    ? selectedCategories.filter(category => category !== value)
                    : [...selectedCategories, value];
                setSelectedCategories(updatedSelection);
                break;
            default:
                break;
        }
    };

    const filterProducts = () => {
        return products.filter((product) => {
            // Price filter
            const matchesPrice =
                selectedPriceRanges.length === 0 ||
                selectedPriceRanges.some((range) => {
                    const [min, max] = range.split(' - ').map((value) =>
                        parseInt(value.replace(/[₹,]/g, '').trim(), 10)
                    );
                    return product.price >= min && product.price <= (max || Infinity);
                });

            // Discount filter
            const matchesDiscount =
                selectedDiscounts.length === 0 ||
                selectedDiscounts.includes(`${product.discount}%`);

            // Discount Range filter
            const matchesDiscountRange =
                selectedDiscountRanges.length === 0 ||
                selectedDiscountRanges.some((range) => {
                    if (range === 'Below 10') {
                        return product.discount < 10;
                    } else if (range === '10 - 15') {
                        return product.discount >= 10 && product.discount <= 15;
                    } else if (range === '15 - 20') {
                        return product.discount >= 15 && product.discount <= 20;
                    }
                    return false;
                });

            // Category filter
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);

            return matchesPrice && matchesDiscount && matchesDiscountRange && matchesCategory;
        });
    };

    const filteredProducts = filterProducts();

    // Paginate the filtered products
    const currentItems = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Handle pagination
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const renderPagination = () => {
        let paginationItems = [];
        let beforePage = currentPage - 1;
        let afterPage = currentPage + 1;

        if (currentPage > 1) {
            paginationItems.push(
                <li className="btn prev" key="prev" onClick={handlePrevPage}>
                    <span>Prev</span>
                </li>
            );
        }

        if (currentPage > 2) {
            paginationItems.push(
                <li className="numb" key={1} onClick={() => handlePageClick(1)}>
                    <span>1</span>
                </li>
            );
            if (currentPage > 3) {
                paginationItems.push(
                    <li className="dots" key="dots-before">
                        <span>...</span>
                    </li>
                );
            }
        }

        for (let pageNum = beforePage; pageNum <= afterPage; pageNum++) {
            if (pageNum > 0 && pageNum <= totalPages) {
                paginationItems.push(
                    <li
                        className={`numb ${currentPage === pageNum ? 'active' : ''}`}
                        key={pageNum}
                        onClick={() => handlePageClick(pageNum)}
                    >
                        <span>{pageNum}</span>
                    </li>
                );
            }
        }

        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                paginationItems.push(
                    <li className="dots" key="dots-after">
                        <span>...</span>
                    </li>
                );
            }
            paginationItems.push(
                <li className="numb" key={totalPages} onClick={() => handlePageClick(totalPages)}>
                    <span>{totalPages}</span>
                </li>
            );
        }

        if (currentPage < totalPages) {
            paginationItems.push(
                <li className="btn next" key="next" onClick={handleNextPage}>
                    <span>Next</span>
                </li>
            );
        }

        return paginationItems;
    };

    return (
        <Helmet title="Engagement">
            <>
                <section className='container-fluid mt-2 mb-4'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-3 d-lg-block d-none'>
                            <div className='sticky-header px-5'>
                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                    <h6 className='fiter_main_title'>FILTERS</h6>
                                </div>
                                {/* Ring Size */}
                                {/* <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                    <h2 className='fw-bold fs-5 mt-3'>Ring Size</h2>
                                    {
                                        ringSizes.map((size, index) => (
                                            <div className="form-check my-2" key={index}>
                                                <input className="form-check-input" type="checkbox" id={`ringSize${index}`}
                                                    checked={selectedRingSizes.includes(size)}
                                                    onChange={() => handleFilterChange('ringSize', size)} />
                                                <label className="form-check-label" htmlFor={`ringSize${index}`}>{size}</label>
                                            </div>
                                        ))
                                    }
                                    <button onClick={() => setShowMoreRingSizes(!showMoreRingSizes)} className="btn btn-link p-0 show_btn">
                                        {showMoreRingSizes ? (
                                            <>
                                                <i className="ri-arrow-up-s-line fs-4 pe-1"></i>Show Less
                                            </>
                                        ) : (
                                            <>
                                                <i className="ri-arrow-down-s-line fs-4 pe-1"></i>2 More
                                            </>
                                        )
                                        }
                                    </button>
                                </div> */}

                                {/* Price */}
                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                    <h2 className='mt-3 filter_title'>Price</h2>
                                    {priceRanges.slice(0, showMorePrices ? priceRanges.length : 4).map((price, index) => (
                                        <div className="form-check my-2" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`price${index}`}
                                                checked={selectedPriceRanges.includes(price)}
                                                onChange={() => handleFilterChange('price', price)}
                                            />
                                            <label className="form-check-label" htmlFor={`price${index}`}>
                                                {price}
                                            </label>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setShowMorePrices(!showMorePrices)}
                                        className="btn btn-link p-0 show_btn"
                                    >
                                        {showMorePrices ? (
                                            <>
                                                <i className="ri-arrow-up-s-line fs-4 pe-1"></i>Show Less
                                            </>
                                        ) : (
                                            <>
                                                <i className='ri-arrow-down-s-line fs-4 pe-1'></i>
                                                {priceRanges.length - 4} More
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Discount */}
                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                    <h2 className="filter_title mt-3">Discount</h2>
                                    {discountOptions.slice(0, showMoreDiscount ? discountOptions.length : 4).map((item, index) => (
                                        <div className="form-check my-2" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`discount${index}`}
                                                checked={selectedDiscounts.includes(item)}
                                                onChange={() => handleFilterChange('discount', item)}
                                            />
                                            <label className="form-check-label" htmlFor={`discount${index}`}>
                                                {item}
                                            </label>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setShowMoreDiscount(!showMoreDiscount)}
                                        className="btn btn-link p-0 show_btn"
                                    >
                                        {showMoreDiscount ? (
                                            <>
                                                <i className="ri-arrow-up-s-line fs-4 pe-1"></i>Show Less
                                            </>
                                        ) : (
                                            <>
                                                <i className="ri-arrow-down-s-line fs-4 pe-1"></i>
                                                {discountOptions.length - 4} More
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Discount Range */}
                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                    <h2 className='filter_title mt-3'>Discount Ranges</h2>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="discountRange1"
                                            checked={selectedDiscountRanges.includes('15 - 20')}
                                            onChange={() => handleFilterChange('discountRange', '15 - 20')}
                                        />
                                        <label className="form-check-label" htmlFor="discountRange1">
                                            15 - 20 <span>(271)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="discountRange2"
                                            checked={selectedDiscountRanges.includes('Below 10')}
                                            onChange={() => handleFilterChange('discountRange', 'Below 10')}
                                        />
                                        <label className="form-check-label" htmlFor="discountRange2">
                                            Below 10 <span>(47)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="discountRange3"
                                            checked={selectedDiscountRanges.includes('10 - 15')}
                                            onChange={() => handleFilterChange('discountRange', '10 - 15')}
                                        />
                                        <label className="form-check-label" htmlFor="discountRange3">
                                            10 - 15 <span>(26)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Product Type */}
                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                    <h2 className='filter_title mt-3'>Product Type</h2>
                                    {['Earring', 'Ring', 'Necklace', 'Bracelet'].map((category, index) => (
                                        <div className="form-check my-2" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={category}
                                                id={`category${index}`}
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleFilterChange('category', category)}
                                            />
                                            <label className="form-check-label" htmlFor={`category${index}`}>
                                                {category}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* Weight Ranges */}
                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                    <h2 className='filter_title mt-3'>Weight Ranges</h2>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            0 - 2 g
                                            <span>(19)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            2 - 5 g
                                            <span>(360)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            5 - 10 g
                                            <span>(55)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Material */}
                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                    <h2 className='filter_title mt-3'>Material</h2>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            <span><img alt='' src='assets/img/lp-sprite (4).png' className='img-fluid me-2' style={{ width: "25px" }}></img></span>
                                            Solitaire
                                            <span>(12)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            <span><img alt='' src='assets/img/lp-sprite (1).png' className='img-fluid me-2' style={{ width: "25px" }}></img></span>
                                            Gold
                                            <span>(10)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            <span><img alt='' src='assets/img/lp-sprite (2).png' className='img-fluid me-2' style={{ width: "25px" }}></img></span>
                                            Diamond
                                            <span>(426)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            <span><img alt='' src='assets/img/lp-sprite (3).png' className='img-fluid me-2' style={{ width: "25px" }}></img></span>
                                            Gemstone
                                            <span>(58)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Metal */}
                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                    <h2 className='filter_title mt-3'>Metal</h2>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            18 KT Yellow
                                            <span>(112)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            14 KT White
                                            <span>(111)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            18 KT Rose
                                            <span>(30)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            18 KT Two Tone
                                            <span>(25)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Shop For */}
                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                    <h2 className='filter_title mt-3'>Shop For</h2>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Women
                                            <span>(340)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Men
                                            <span>(75)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Occasion */}
                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                    <h2 className='filter_title mt-3'>Occasion</h2>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Engagement
                                            <span>(71)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Anniversary
                                            <span>(29)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Daily Wear
                                            <span>(228)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Evening
                                            <span>(83)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Small Device Filter*/}
                        <div className='container-fluid filter_midium_divice d-lg-none d-xl-none d-block'>
                            <div className='row text-center pt-3'>
                                <div className='col-md-4 col-sm-4 col-4'>
                                    <p className=''>CATEGORIES</p>
                                </div>
                                <div className='col-md-4 col-sm-4 col-4'>
                                    <p className='' data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomSort" aria-controls="offcanvasBottom">SORT</p>
                                    <div className="offcanvas offcanvas-bottom offcanvas_sort" tabIndex="-1" id="offcanvasBottomSort" aria-labelledby="offcanvasBottomLabel">
                                        <div className="offcanvas-header">
                                            <h5 className="offcanvas-title fw-bold" id="offcanvasBottomLabel">Sort Design By</h5>
                                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div className="offcanvas-body small m-0 p-0">
                                            <div className='mb-2 text-left'>
                                                <p>Featured</p>
                                                <p>Alphabetically, A-Z</p>
                                                <p>Alphabetically, Z-A</p>
                                                <p>High to Low</p>
                                                <p>Low to High</p>
                                                <p>Latest</p>
                                            </div>
                                            <div className='container-fluid filter_offcanvas py-3'>
                                                <div className='row'>
                                                    <div className='col-md-6 col-sm-6 col-6'>
                                                        <button className='btn w-100 filter_md_btn'>Clear All</button>
                                                    </div>
                                                    <div className='col-md-6 col-sm-6 col-6'>
                                                        <button className='btn w-100 text-light filter_md_btn1'>APPLY FILTERS</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-4 col-4'>
                                    <p className='' data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">FILTER</p>
                                    <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                                        <div className="offcanvas-header">
                                            <h5 className="offcanvas-title fw-bold " id="offcanvasBottomLabel">Filters</h5>
                                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div className="offcanvas-body small m-0 p-0">
                                            <div className='sticky-header px-5'>
                                                {/* Price */}
                                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                                    <h2 className='filter_title mt-3'>Price</h2>
                                                    {priceRanges.slice(0, showMorePrices ? priceRanges.length : 4).map((price, index) => (
                                                        <div className="form-check my-2" key={index}>
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={`price${index}`}
                                                                checked={selectedPriceRanges.includes(price)}
                                                                onChange={() => handleFilterChange('price', price)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`price${index}`}>
                                                                {price}
                                                            </label>
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => setShowMorePrices(!showMorePrices)}
                                                        className="btn btn-link p-0 show_btn"
                                                    >
                                                        {showMorePrices ? (
                                                            <>
                                                                <i className="ri-arrow-up-s-line fs-4 pe-1"></i>Show Less
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className='ri-arrow-down-s-line fs-4 pe-1'></i>
                                                                {priceRanges.length - 4} More
                                                            </>
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Discount */}
                                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                                    <h2 className='filter_title mt-3'>Discount</h2>
                                                    {discountOptions.slice(0, showMoreDiscount ? discountOptions.length : 4).map((item, index) => (
                                                        <div className="form-check my-2" key={index}>
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={`discount${index}`}
                                                                checked={selectedDiscounts.includes(item)}
                                                                onChange={() => handleFilterChange('discount', item)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`discount${index}`}>
                                                                {item}
                                                            </label>
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => setShowMoreDiscount(!showMoreDiscount)}
                                                        className="btn btn-link p-0 show_btn"
                                                    >
                                                        {showMoreDiscount ? (
                                                            <>
                                                                <i className="ri-arrow-up-s-line fs-4 pe-1"></i>Show Less
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="ri-arrow-down-s-line fs-4 pe-1"></i>
                                                                {discountOptions.length - 4} More
                                                            </>
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Discount Range */}
                                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                                    <h2 className='filter_title mt-3'>Discount_Ranges</h2>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="discountRange1"
                                                            checked={selectedDiscountRanges.includes('15 - 20')}
                                                            onChange={() => handleFilterChange('discountRange', '15 - 20')}
                                                        />
                                                        <label className="form-check-label" htmlFor="discountRange1">
                                                            15 - 20 <span>(271)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="discountRange2"
                                                            checked={selectedDiscountRanges.includes('Below 10')}
                                                            onChange={() => handleFilterChange('discountRange', 'Below 10')}
                                                        />
                                                        <label className="form-check-label" htmlFor="discountRange2">
                                                            Below 10 <span>(47)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="discountRange3"
                                                            checked={selectedDiscountRanges.includes('10 - 15')}
                                                            onChange={() => handleFilterChange('discountRange', '10 - 15')}
                                                        />
                                                        <label className="form-check-label" htmlFor="discountRange3">
                                                            10 - 15 <span>(26)</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Product Type */}
                                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                                    <h2 className='filter_title mt-3'>Product Type</h2>
                                                    {['Earring', 'Ring', 'Necklace', 'Bracelet'].map((category, index) => (
                                                        <div className="form-check my-2" key={index}>
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value={category}
                                                                id={`category${index}`}
                                                                checked={selectedCategories.includes(category)}
                                                                onChange={() => handleFilterChange('category', category)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`category${index}`}>
                                                                {category}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Weight Ranges */}
                                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                                    <h2 className='filter_title mt-3'>Weight Ranges</h2>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            0 - 2 g
                                                            <span>(19)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            2 - 5 g
                                                            <span>(360)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            5 - 10 g
                                                            <span>(55)</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Material */}
                                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                                    <h2 className='filter_title mt-3'>Material</h2>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            <span><img alt='' src='assets/img/lp-sprite (4).png' className='img-fluid me-2' style={{ width: "25px" }}></img></span>
                                                            Solitaire
                                                            <span>(12)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            <span><img alt='' src='assets/img/lp-sprite (1).png' className='img-fluid me-2' style={{ width: "25px" }}></img></span>
                                                            Gold
                                                            <span>(10)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            <span><img alt='' src='assets/img/lp-sprite (2).png' className='img-fluid me-2' style={{ width: "25px" }}></img></span>
                                                            Diamond
                                                            <span>(426)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            <span><img alt='' src='assets/img/lp-sprite (3).png' className='img-fluid me-2' style={{ width: "25px" }}></img></span>
                                                            Gemstone
                                                            <span>(58)</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Metal */}
                                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                                    <h2 className='filter_title mt-3'>Metal</h2>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            18 KT Yellow
                                                            <span>(112)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            14 KT White
                                                            <span>(111)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            18 KT Rose
                                                            <span>(30)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            18 KT Two Tone
                                                            <span>(25)</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Shop For */}
                                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                                    <h2 className='filter_title mt-3'>Shop For</h2>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Women
                                                            <span>(340)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Men
                                                            <span>(75)</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Occasion */}
                                                <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
                                                    <h2 className='filter_title mt-3'>Occasion</h2>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Engagement
                                                            <span>(71)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Anniversary
                                                            <span>(29)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Daily Wear
                                                            <span>(228)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Evening
                                                            <span>(83)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='container-fluid filter_offcanvas py-3'>
                                                <div className='row'>
                                                    <div className='col-md-6 col-sm-6 col-6'>
                                                        <button className='btn w-100 filter_md_btn'>Clear All</button>
                                                    </div>
                                                    <div className='col-md-6 col-sm-6 col-6'>
                                                        <button className='btn w-100 text-light filter_md_btn1' data-bs-dismiss="offcanvas" aria-label="Close">APPLY FILTERS</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-9'>
                            {/* <div className='row'>
                                <div className='d-xl-block d-lg-block d-none d-flex justify-content-end'>
                                    <div>
                                        <select className="form-select">
                                            <option value="default">Default</option>
                                            <option value="1">Alphabetically, A-Z</option>
                                            <option value="2">Alphabetically, Z-A</option>
                                            <option value="3">High Price</option>
                                            <option value="4">Low Price</option>
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                            <div className='row'>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            {/* Product Card */}
                                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 card_shadow p-0 px-1'>
                                                <ProductCard Productsitem={item} />
                                            </div>

                                            {/* Insert Image After Every 4 Products */}
                                            {(index + 1) % 4 === 0 && Math.floor(index / 4) < images.length && (
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                                    <img
                                                        alt={`Product ${Math.floor(index / 4) + 1}`}
                                                        src={images[Math.floor(index / 4)]}
                                                        className='img py-2'
                                                        style={{ borderRadius: "40px" }}
                                                    />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <div className="text-center w-100 py-5">
                                        <h4>No products found</h4>
                                        <p>Oops! There are no products available under your current selection.</p>
                                    </div>
                                )}
                            </div>
                            <div className='pagination'>
                                <ul>
                                    {renderPagination()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </Helmet>
    );
}

export default Earrings;