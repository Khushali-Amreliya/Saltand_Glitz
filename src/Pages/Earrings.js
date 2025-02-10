import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./Product/productCard";
import Helmet from "../Components/Helmet";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Earrings = () => {

    const [filters, setFilters] = useState({
        title: "",
        priceLimit: "",
        sortBy: "",
        priceOrder: "",
        discountLimit: "",
        typeBy: "",
        shopFor: "",
        occasionBy: ""
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSelectFilterChange = (combinedValue) => {
        const [sortBy, priceOrder] = combinedValue.split('_');  // Split combined value
        setFilters({
            ...filters,
            sortBy,    // Set the sortBy value
            priceOrder // Set the priceOrder value
        });
    };
    const handleFilterChange = (type, value) => {
        setFilters((prevFilters) => {
            if (type === "occasionBy") {
                // Toggle values in an array (for multi-select filters)
                const updatedOccasions = prevFilters.occasionBy.includes(value)
                    ? prevFilters.occasionBy.filter((item) => item !== value)
                    : [...prevFilters.occasionBy, value];

                return { ...prevFilters, occasionBy: updatedOccasions };
            } else {
                // For single value filters
                return {
                    ...prevFilters,
                    [type]: prevFilters[type] === value ? "" : value,
                };
            }
        });
    };

    const clearFilters = () => {
        setFilters({});
        window.location.reload(); // Refresh the page
    };

    const fetchFilteredProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("https://saltandglitz-api.vercel.app/v1/upload/filterProduct", {
                ...filters,
                occasionBy: filters.subCategory // Send `subCategory` as `occasionBy`
            });
            // const ringProducts = response.data.updatedProducts.filter(item => item.category === "Earring"); // Filter rings only

            console.log(response.data.updatedProducts);

            setProducts(response.data.updatedProducts);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
        setLoading(false);
    }, [filters]); // filters ko dependency bana diya hai

    useEffect(() => {
        fetchFilteredProducts();
    }, [fetchFilteredProducts]); // useEffect me include kar diya

    // Initial product images
    // const images = ["assets/img/product_img1.jpg", "assets/img/product_img.jpg"];

    // Scroll to the top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const getUploadData = async () => {

        let response = await axios.get("https://saltandglitz-api.vercel.app/v1/upload/get_upload")
        // const ringProducts = response.data.filter(item => item.category === "Earring"); // Filter rings only
        console.log("Get Data",response.data);
        setProducts(response.data);
    };

    useEffect(() => {
        getUploadData();
    }, []);

    // const discountOptions = [
    //     ...new Set(products.map((product) => `${product.discount}%`)),
    // ];

    // console.log(products);

    // // Fetch products data on component mount
    // useEffect(() => {
    //     setProducts(productsData);
    //     window.scrollTo(0, 0);
    // }, []);

    // const [showMoreDiscount, setShowMoreDiscount] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleProductClick = (id) => {
        // navigate(`/product/${id}`); // Navigate to ProductDetails page with the product ID
        navigate(`/Productdetails/${id}`); // Navigate to ProductDetails page with the product ID
        // console.log(id);
    };

    return (
        <Helmet title="Engagement">
            <>
                {loading && <Loader />}
                <section className="bg_product_page mb-2 mb-lg-5">
                    <div className="container">
                        <div className=" flex-column text-start min-vh-25 py-3">
                            <div>
                                <h6 className="mb-1">
                                    Jewellery Designs &nbsp;
                                    <span>7992 Designs</span>
                                </h6>
                                <p>Home &gt; Jewellery</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container-fluid mt-2 mb-4">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 d-lg-block d-none">
                            <div className="sticky-header px-5">
                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2 d-flex justify-content-between align-items-center">
                                    <h6 className="filter_main_title">FILTERS</h6>
                                    <button className="btn btn-link p-0 clear_btn_Filter" onClick={clearFilters}>
                                        Clear All
                                    </button>
                                </div>
                                {/* Price */}
                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                    <h2 className="mt-3 filter_title">Price</h2>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="below20k"
                                            name="priceLimit"
                                            checked={filters.priceLimit === "below20k"}
                                            onChange={() => handleFilterChange("priceLimit", "below20k")}
                                        />
                                        <label className="form-check-label" htmlFor="below20k">
                                            Below ₹20,000
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="20kTo30k"
                                            name="priceLimit"
                                            checked={filters.priceLimit === "20kTo30k"}
                                            onChange={() => handleFilterChange("priceLimit", "20kTo30k")}
                                        />
                                        <label className="form-check-label" htmlFor="20kTo30k">
                                            ₹20,000 - ₹30,000
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="30kTo50k"
                                            name="priceLimit"
                                            checked={filters.priceLimit === "30kTo50k"}
                                            onChange={() => handleFilterChange("priceLimit", "30kTo50k")}
                                        />
                                        <label className="form-check-label" htmlFor="30kTo50k">
                                            ₹30,000 - ₹50,000
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="50kTo100k"
                                            name="priceLimit"
                                            checked={filters.priceLimit === "50kTo100k"}
                                            onChange={() => handleFilterChange("priceLimit", "50kTo100k")}
                                        />
                                        <label className="form-check-label" htmlFor="50kTo100k">
                                            ₹50,000 - ₹1,00,000
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="100kTo200k"
                                            name="priceLimit"
                                            checked={filters.priceLimit === "100kTo200k"}
                                            onChange={() => handleFilterChange("priceLimit", "100kTo200k")}
                                        />
                                        <label className="form-check-label" htmlFor="100kTo200k">
                                            ₹1,00,000 - ₹2,00,000
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="200kTo300k"
                                            name="priceLimit"
                                            checked={filters.priceLimit === "200kTo300k"}
                                            onChange={() => handleFilterChange("priceLimit", "200kTo300k")}
                                        />
                                        <label className="form-check-label" htmlFor="200kTo300k">
                                            ₹2,00,000 - ₹3,00,000
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="300kTo500k"
                                            name="priceLimit"
                                            checked={filters.priceLimit === "300kTo500k"}
                                            onChange={() => handleFilterChange("priceLimit", "300kTo500k")}
                                        />
                                        <label className="form-check-label" htmlFor="300kTo500k">
                                            ₹3,00,000 - ₹5,00,000
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="above500k"
                                            name="priceLimit"
                                            checked={filters.priceLimit === "above500k"}
                                            onChange={() => handleFilterChange("priceLimit", "above500k")}
                                        />
                                        <label className="form-check-label" htmlFor="above500k">
                                            Above ₹5,00,000
                                        </label>
                                    </div>
                                </div>

                                {/* Product Type */}
                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                    <h2 className="filter_title mt-3">Product Type</h2>
                                    {["Earring", "Ring", "Necklace", "Bracelet"].map(
                                        (category, index) => (
                                            <div className="form-check my-2" key={index}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={category}
                                                    id={`category${index}`}
                                                    checked={filters.title?.includes(category) || false}
                                                    onChange={() =>
                                                        handleFilterChange("title", category)
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`category${index}`}
                                                >
                                                    {category}
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Material */}
                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                    <h2 className="filter_title mt-3">Material</h2>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            <span>
                                                <img
                                                    alt=""
                                                    src="assets/img/lp-sprite (4).png"
                                                    className="img-fluid me-2"
                                                    style={{ width: "25px" }}
                                                ></img>
                                            </span>
                                            Solitaire
                                            {/* <span>(12)</span> */}
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            <span>
                                                <img
                                                    alt=""
                                                    src="assets/img/lp-sprite (1).png"
                                                    className="img-fluid me-2"
                                                    style={{ width: "25px" }}
                                                ></img>
                                            </span>
                                            Gold
                                            {/* <span>(10)</span> */}
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            <span>
                                                <i className="ri-checkbox-blank-fill me-2 fs-5" style={{ color: "#EBEBEB" }}></i>
                                            </span>
                                            Platinum
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            <span>
                                                <img
                                                    alt=""
                                                    src="assets/img/lp-sprite (3).png"
                                                    className="img-fluid me-2"
                                                    style={{ width: "25px" }}
                                                ></img>
                                            </span>
                                            Gemstone
                                            {/* <span>(58)</span> */}
                                        </label>
                                    </div>
                                </div>

                                {/* Shop For */}
                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                    <h2 className="filter_title mt-3">Shop For</h2>

                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="shopForWomen"
                                            checked={filters.typeBy === "female"}
                                            onChange={() => handleFilterChange("typeBy", "female")}
                                        />
                                        <label className="form-check-label" htmlFor="shopForWomen">
                                            Women
                                        </label>
                                    </div>

                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="shopForMen"
                                            checked={filters.typeBy === "male"}
                                            onChange={() => handleFilterChange("typeBy", "male")}
                                        />
                                        <label className="form-check-label" htmlFor="shopForMen">
                                            Men
                                        </label>
                                    </div>
                                </div>

                                {/* Occasion */}
                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                    <h2 className="filter_title mt-3">Occasion</h2>

                                    {["solitire", "Anniversary", "Daily Wear", "Evening"].map((occasion, index) => (
                                        <div className="form-check my-2" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`occasion_${index}`}
                                                checked={filters.occasionBy.includes(occasion)}
                                                onChange={() => handleFilterChange("occasionBy", occasion)}
                                            />
                                            <label className="form-check-label" htmlFor={`occasion_${index}`}>
                                                {occasion}
                                            </label>
                                        </div>
                                    ))}
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

                                {/* Discount */}
                                {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                    <h2 className="filter_title mt-3">Discount</h2>
                                    {discountOptions
                                        .slice(0, showMoreDiscount ? discountOptions.length : 4)
                                        .map((item, index) => (
                                            <div className="form-check my-2" key={index}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`discount${index}`}
                                                    checked={selectedDiscounts.includes(item)}
                                                    onChange={() => handleFilterChange("discount", item)}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`discount${index}`}
                                                >
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
                                                <i className="ri-arrow-up-s-line fs-4 pe-1"></i>Show
                                                Less
                                            </>
                                        ) : (
                                            <>
                                                <i className="ri-arrow-down-s-line fs-4 pe-1"></i>
                                                {discountOptions.length - 4} More
                                            </>
                                        )}
                                    </button>
                                </div> */}

                                {/* Discount Range */}
                                {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                    <h2 className="filter_title mt-3">Discount Ranges</h2>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="discountRange1"
                                            checked={selectedDiscountRanges.includes("15 - 20")}
                                            onChange={() =>
                                                handleFilterChange("discountRange", "15 - 20")
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="discountRange1"
                                        >
                                            15 - 20 <span>(271)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="discountRange2"
                                            checked={selectedDiscountRanges.includes("Below 10")}
                                            onChange={() =>
                                                handleFilterChange("discountRange", "Below 10")
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="discountRange2"
                                        >
                                            Below 10 <span>(47)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="discountRange3"
                                            checked={selectedDiscountRanges.includes("10 - 15")}
                                            onChange={() =>
                                                handleFilterChange("discountRange", "10 - 15")
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="discountRange3"
                                        >
                                            10 - 15 <span>(26)</span>
                                        </label>
                                    </div>
                                </div> */}

                                {/* Weight Ranges */}
                                {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                    <h2 className="filter_title mt-3">Weight Ranges</h2>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            0 - 2 g<span>(19)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            2 - 5 g<span>(360)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            5 - 10 g<span>(55)</span>
                                        </label>
                                    </div>
                                </div> */}

                                {/* Metal */}
                                {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                    <h2 className="filter_title mt-3">Metal</h2>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            18 KT Yellow
                                            <span>(112)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            14 KT White
                                            <span>(111)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            18 KT Rose
                                            <span>(30)</span>
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            18 KT Two Tone
                                            <span>(25)</span>
                                        </label>
                                    </div>
                                </div> */}

                            </div>
                        </div>

                        {/* Small Device Filter*/}
                        <div className="container-fluid filter_midium_divice d-lg-none d-xl-none d-block">
                            <div className="row text-center pt-3">
                                {/* <div className="col-md-4 col-sm-4 col-4">
                                    <p className="">CATEGORIES</p>
                                </div> */}
                                <div className="col-md-6 col-sm-6 col-6">
                                    <p
                                        className=""
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasBottomSort"
                                        aria-controls="offcanvasBottom"
                                    >
                                        SORT
                                    </p>
                                    <div
                                        className="offcanvas offcanvas-bottom offcanvas_sort"
                                        tabIndex="-1"
                                        id="offcanvasBottomSort"
                                        aria-labelledby="offcanvasBottomLabel"
                                    >
                                        <div className="offcanvas-header">
                                            <h5
                                                className="offcanvas-title fw-bold"
                                                id="offcanvasBottomLabel"
                                            >
                                                Sort Design By
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close text-reset"
                                                data-bs-dismiss="offcanvas"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="offcanvas-body small m-0 p-0">
                                            <div className="mb-2 text-left">
                                                <p onClick={() => handleSelectFilterChange("featured")} className="filter-option">Featured</p>
                                                <p onClick={() => handleSelectFilterChange("newestFirst")} className="filter-option">Latest</p>
                                                <p onClick={() => handleSelectFilterChange("newestFirst_highToLow")} className="filter-option">High to Low</p>
                                                <p onClick={() => handleSelectFilterChange("newestFirst_lowToHigh")} className="filter-option">Low to High</p>
                                            </div>
                                            <div className="container-fluid filter_offcanvas py-3">
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6 col-6">
                                                        <button className="btn w-100 filter_md_btn" onClick={clearFilters}>
                                                            Clear All
                                                        </button>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-6">
                                                        <button className="btn w-100 text-light filter_md_btn1">
                                                            APPLY FILTERS
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-6">
                                    <p
                                        className=""
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasBottom"
                                        aria-controls="offcanvasBottom"
                                    >
                                        FILTER
                                    </p>
                                    <div
                                        className="offcanvas offcanvas-bottom"
                                        tabIndex="-1"
                                        id="offcanvasBottom"
                                        aria-labelledby="offcanvasBottomLabel"
                                    >
                                        <div className="offcanvas-header">
                                            <h5
                                                className="offcanvas-title fw-bold "
                                                id="offcanvasBottomLabel"
                                            >
                                                Filters
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close text-reset"
                                                data-bs-dismiss="offcanvas"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="offcanvas-body small m-0 p-0">
                                            <div className="sticky-header px-5">
                                                {/* Price */}
                                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                                    <h2 className="mt-3 filter_title">Price</h2>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="below20k"
                                                            name="priceLimit"
                                                            checked={filters.priceLimit === "below20k"}
                                                            onChange={() => handleFilterChange("priceLimit", "below20k")}
                                                        />
                                                        <label className="form-check-label" htmlFor="below20k">
                                                            Below ₹20,000
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="20kTo30k"
                                                            name="priceLimit"
                                                            checked={filters.priceLimit === "20kTo30k"}
                                                            onChange={() => handleFilterChange("priceLimit", "20kTo30k")}
                                                        />
                                                        <label className="form-check-label" htmlFor="20kTo30k">
                                                            ₹20,000 - ₹30,000
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="30kTo50k"
                                                            name="priceLimit"
                                                            checked={filters.priceLimit === "30kTo50k"}
                                                            onChange={() => handleFilterChange("priceLimit", "30kTo50k")}
                                                        />
                                                        <label className="form-check-label" htmlFor="30kTo50k">
                                                            ₹30,000 - ₹50,000
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="50kTo100k"
                                                            name="priceLimit"
                                                            checked={filters.priceLimit === "50kTo100k"}
                                                            onChange={() => handleFilterChange("priceLimit", "50kTo100k")}
                                                        />
                                                        <label className="form-check-label" htmlFor="50kTo100k">
                                                            ₹50,000 - ₹1,00,000
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="100kTo200k"
                                                            name="priceLimit"
                                                            checked={filters.priceLimit === "100kTo200k"}
                                                            onChange={() => handleFilterChange("priceLimit", "100kTo200k")}
                                                        />
                                                        <label className="form-check-label" htmlFor="100kTo200k">
                                                            ₹1,00,000 - ₹2,00,000
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="200kTo300k"
                                                            name="priceLimit"
                                                            checked={filters.priceLimit === "200kTo300k"}
                                                            onChange={() => handleFilterChange("priceLimit", "200kTo300k")}
                                                        />
                                                        <label className="form-check-label" htmlFor="200kTo300k">
                                                            ₹2,00,000 - ₹3,00,000
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="300kTo500k"
                                                            name="priceLimit"
                                                            checked={filters.priceLimit === "300kTo500k"}
                                                            onChange={() => handleFilterChange("priceLimit", "300kTo500k")}
                                                        />
                                                        <label className="form-check-label" htmlFor="300kTo500k">
                                                            ₹3,00,000 - ₹5,00,000
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="above500k"
                                                            name="priceLimit"
                                                            checked={filters.priceLimit === "above500k"}
                                                            onChange={() => handleFilterChange("priceLimit", "above500k")}
                                                        />
                                                        <label className="form-check-label" htmlFor="above500k">
                                                            Above ₹5,00,000
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Discount */}
                                                {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                                    <h2 className="filter_title mt-3">Discount</h2>
                                                    {discountOptions
                                                        .slice(
                                                            0,
                                                            showMoreDiscount ? discountOptions.length : 4
                                                        )
                                                        .map((item, index) => (
                                                            <div className="form-check my-2" key={index}>
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`discount${index}`}
                                                                    checked={selectedDiscounts.includes(item)}
                                                                    onChange={() =>
                                                                        handleFilterChange("discount", item)
                                                                    }
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`discount${index}`}
                                                                >
                                                                    {item}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    <button
                                                        onClick={() =>
                                                            setShowMoreDiscount(!showMoreDiscount)
                                                        }
                                                        className="btn btn-link p-0 show_btn"
                                                    >
                                                        {showMoreDiscount ? (
                                                            <>
                                                                <i className="ri-arrow-up-s-line fs-4 pe-1"></i>
                                                                Show Less
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="ri-arrow-down-s-line fs-4 pe-1"></i>
                                                                {discountOptions.length - 4} More
                                                            </>
                                                        )}
                                                    </button>
                                                </div> */}

                                                {/* Discount Range */}
                                                {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                                    <h2 className="filter_title mt-3">Discount_Ranges</h2>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="discountRange1"
                                                            checked={selectedDiscountRanges.includes(
                                                                "15 - 20"
                                                            )}
                                                            onChange={() =>
                                                                handleFilterChange("discountRange", "15 - 20")
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="discountRange1"
                                                        >
                                                            15 - 20 <span>(271)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="discountRange2"
                                                            checked={selectedDiscountRanges.includes(
                                                                "Below 10"
                                                            )}
                                                            onChange={() =>
                                                                handleFilterChange("discountRange", "Below 10")
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="discountRange2"
                                                        >
                                                            Below 10 <span>(47)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="discountRange3"
                                                            checked={selectedDiscountRanges.includes(
                                                                "10 - 15"
                                                            )}
                                                            onChange={() =>
                                                                handleFilterChange("discountRange", "10 - 15")
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="discountRange3"
                                                        >
                                                            10 - 15 <span>(26)</span>
                                                        </label>
                                                    </div>
                                                </div> */}

                                                {/* Product Type */}
                                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                                    <h2 className="filter_title mt-3">Product Type</h2>
                                                    {["Earring", "Ring", "Necklace", "Bracelet"].map(
                                                        (category, index) => (
                                                            <div className="form-check my-2" key={index}>
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    value={category}
                                                                    id={`category${index}`}
                                                                    checked={filters.title?.includes(category) || false}
                                                                    onChange={() =>
                                                                        handleFilterChange("title", category)
                                                                    }
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`category${index}`}
                                                                >
                                                                    {category}
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>

                                                {/* Weight Ranges */}
                                                {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                                    <h2 className="filter_title mt-3">Weight Ranges</h2>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            0 - 2 g<span>(19)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            2 - 5 g<span>(360)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            5 - 10 g<span>(55)</span>
                                                        </label>
                                                    </div>
                                                </div> */}

                                                {/* Material */}
                                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                                    <h2 className="filter_title mt-3">Material</h2>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            <span>
                                                                <img
                                                                    alt=""
                                                                    src="assets/img/lp-sprite (4).png"
                                                                    className="img-fluid me-2"
                                                                    style={{ width: "25px" }}
                                                                ></img>
                                                            </span>
                                                            Solitaire
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            <span>
                                                                <img
                                                                    alt=""
                                                                    src="assets/img/lp-sprite (1).png"
                                                                    className="img-fluid me-2"
                                                                    style={{ width: "25px" }}
                                                                ></img>
                                                            </span>
                                                            Gold
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            <span>
                                                                <i className="ri-checkbox-blank-fill me-2 fs-5" style={{ color: "#EBEBEB" }}></i>
                                                            </span>
                                                            Platinum
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            <span>
                                                                <img
                                                                    alt=""
                                                                    src="assets/img/lp-sprite (3).png"
                                                                    className="img-fluid me-2"
                                                                    style={{ width: "25px" }}
                                                                ></img>
                                                            </span>
                                                            Gemstone
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Metal */}
                                                {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                                    <h2 className="filter_title mt-3">Metal</h2>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            18 KT Yellow
                                                            <span>(112)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            14 KT White
                                                            <span>(111)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            18 KT Rose
                                                            <span>(30)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            18 KT Two Tone
                                                            <span>(25)</span>
                                                        </label>
                                                    </div>
                                                </div> */}

                                                {/* Shop For */}
                                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                                    <h2 className="filter_title mt-3">Shop For</h2>

                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="shopForWomen"
                                                            checked={filters.typeBy === "female"}
                                                            onChange={() => handleFilterChange("typeBy", "female")}
                                                        />
                                                        <label className="form-check-label" htmlFor="shopForWomen">
                                                            Women
                                                        </label>
                                                    </div>

                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="shopForMen"
                                                            checked={filters.typeBy === "male"}
                                                            onChange={() => handleFilterChange("typeBy", "male")}
                                                        />
                                                        <label className="form-check-label" htmlFor="shopForMen">
                                                            Men
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Occasion */}
                                                <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                                    <h2 className="filter_title mt-3">Occasion</h2>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            Engagement
                                                            <span>(71)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            Anniversary
                                                            <span>(29)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            Daily Wear
                                                            <span>(228)</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault"
                                                        >
                                                            Evening
                                                            <span>(83)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="container-fluid filter_offcanvas py-3">
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6 col-6">
                                                        <button className="btn w-100 filter_md_btn" onClick={clearFilters}>
                                                            Clear All
                                                        </button>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-6">
                                                        <button
                                                            className="btn w-100 text-light filter_md_btn1"
                                                            data-bs-dismiss="offcanvas"
                                                            aria-label="Close"
                                                        >
                                                            APPLY FILTERS
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col d-lg-flex d-none justify-content-end">
                                    <select
                                        className="form-select custom-select w-auto"
                                        value={`${filters.sortBy}_${filters.priceOrder}`}  // Combine the values of sortBy and priceOrder
                                        onChange={(e) => handleSelectFilterChange(e.target.value)}  // Pass combined value
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="newestFirst">Latest</option>
                                        <option value="newestFirst_lowToHigh">Low to High</option>
                                        <option value="newestFirst_highToLow">High to Low</option>
                                    </select >
                                </div>
                            </div>
                            <div className="row">
                                {products.length > 0 ? (
                                    products.map((item, index) => (
                                        <React.Fragment key={item.id} onClick={() => handleProductClick(item.id)}>
                                            {/* Product Card */}
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 card_shadow p-0 px-1">
                                                <Link>
                                                    <ProductCard Productsitem={item} />
                                                </Link>
                                            </div>

                                            {/* Insert Image After Every 4 Products */}
                                            {/* {(index + 1) % 4 === 0 &&
                                                Math.floor(index / 4) < images.length && (
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <img
                                                            alt={`Product ${Math.floor(index / 4) + 1}`}
                                                            src={images[Math.floor(index / 4)]}
                                                            className="img py-2"
                                                            style={{ borderRadius: "40px" }}
                                                        />
                                                    </div>
                                                )} */}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <div className="text-center w-100 py-5">
                                        <h4>No products found</h4>
                                        <p>
                                            Oops! There are no products available under your current
                                            selection.
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* <div className="pagination">
                                <ul>{renderPagination()}</ul>
                            </div> */}
                        </div>
                    </div>
                </section>
            </>
        </Helmet>
    );
};

export default Earrings;




// import React, { useEffect, useState } from "react";
// import ProductCard from "./Product/productCard";
// import Helmet from "../Components/Helmet";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Earrings = () => {
//     const [filters, setFilters] = useState({
//         title: "",
//         priceLimit: "",
//         sortBy: "",
//         priceOrder: "",
//         discountLimit: "",
//         typeBy: "",
//         shopFor: "",
//         occasionBy: ""
//     });
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleSelectFilterChange = (combinedValue) => {
//         const [sortBy, priceOrder] = combinedValue.split('_');  // Split combined value
//         setFilters({
//             ...filters,
//             sortBy,    // Set the sortBy value
//             priceOrder // Set the priceOrder value
//         });
//     };
//     const handleFilterChange = (type, value) => {
//         setFilters((prevFilters) => {
//             const updatedFilters = { ...prevFilters };

//             if (updatedFilters[type] === value) {
//                 delete updatedFilters[type];
//             } else {
//                 updatedFilters[type] = value;
//             }

//             return updatedFilters;
//         });
//     };

//     const fetchFilteredProducts = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.post("https://saltandglitz-api.vercel.app/v1/upload/filterProduct", filters);
//             console.log(response.data.updatedProducts);

//             setProducts(response.data.updatedProducts);
//             // setAvailablePriceRanges(response.data.availablePriceRanges);
//         } catch (err) {
//             setError(err.response?.data?.message || "Something went wrong");
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchFilteredProducts();
//     }, [filters]); // Run whenever filters change

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);
//     const [selectedCategories, setSelectedCategories] = useState([]);

//     const getUploadData = async () => {

//         let getData = await axios.get("https://saltandglitz-api.vercel.app/v1/upload/get_upload")
//         // console.log(getData.data);
//         setProducts(getData.data);
//     };

//     useEffect(() => {
//         getUploadData();
//     }, []);

//     // console.log(products);

//     return (
//         <Helmet title="Engagement">
//             <>
//                 <section className="container-fluid mt-2 mb-4">
//                     <div className="row">
//                         <div className="col-xl-3 col-lg-3 d-lg-block d-none">
//                             <div className="sticky-header px-5">
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h6 className="fiter_main_title">FILTERS</h6>
//                                 </div>
//                                 {/* Price */}
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="mt-3 filter_title">Price</h2>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="below20k"
//                                             name="priceLimit"
//                                             checked={filters.priceLimit === "below20k"}
//                                             onChange={() => handleFilterChange("priceLimit", "below20k")}
//                                         />
//                                         <label className="form-check-label" htmlFor="below20k">
//                                             Below ₹20,000
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="20kTo30k"
//                                             name="priceLimit"
//                                             checked={filters.priceLimit === "20kTo30k"}
//                                             onChange={() => handleFilterChange("priceLimit", "20kTo30k")}
//                                         />
//                                         <label className="form-check-label" htmlFor="20kTo30k">
//                                             ₹20,000 - ₹30,000
//                                         </label>
//                                     </div>
//                                     {/* Repeat similar blocks for other price ranges */}
//                                 </div>

//                                 {/* Product Type */}
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Product Type</h2>
//                                     {["Earring", "Ring", "Necklace", "Bracelet"].map(
//                                         (category, index) => (
//                                             <div className="form-check my-2" key={index}>
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     value={category}
//                                                     id={`category${index}`}
//                                                     checked={selectedCategories.includes(category)}
//                                                     onChange={() =>
//                                                         handleFilterChange("category", category)
//                                                     }
//                                                 />
//                                                 <label
//                                                     className="form-check-label"
//                                                     htmlFor={`category${index}`}
//                                                 >
//                                                     {category}
//                                                 </label>
//                                             </div>
//                                         )
//                                     )}
//                                 </div>

//                                 {/* Material */}
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Material</h2>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             <span>
//                                                 <img
//                                                     alt=""
//                                                     src="assets/img/lp-sprite (4).png"
//                                                     className="img-fluid me-2"
//                                                     style={{ width: "25px" }}
//                                                 ></img>
//                                             </span>
//                                             Solitaire
//                                             <span>(12)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             <span>
//                                                 <img
//                                                     alt=""
//                                                     src="assets/img/lp-sprite (1).png"
//                                                     className="img-fluid me-2"
//                                                     style={{ width: "25px" }}
//                                                 ></img>
//                                             </span>
//                                             Gold
//                                             <span>(10)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             <span>
//                                                 <img
//                                                     alt=""
//                                                     src="assets/img/lp-sprite (2).png"
//                                                     className="img-fluid me-2"
//                                                     style={{ width: "25px" }}
//                                                 ></img>
//                                             </span>
//                                             Diamond
//                                             <span>(426)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             <span>
//                                                 <img
//                                                     alt=""
//                                                     src="assets/img/lp-sprite (3).png"
//                                                     className="img-fluid me-2"
//                                                     style={{ width: "25px" }}
//                                                 ></img>
//                                             </span>
//                                             Gemstone
//                                             <span>(58)</span>
//                                         </label>
//                                     </div>
//                                 </div>

//                                 {/* Shop For */}
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Shop For</h2>

//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="shopForWomen"
//                                             checked={filters.typeBy === "female"}
//                                             onChange={() => handleFilterChange("typeBy", "female")}
//                                         />
//                                         <label className="form-check-label" htmlFor="shopForWomen">
//                                             Women
//                                         </label>
//                                     </div>

//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="shopForMen"
//                                             checked={filters.typeBy === "male"}
//                                             onChange={() => handleFilterChange("typeBy", "male")}
//                                         />
//                                         <label className="form-check-label" htmlFor="shopForMen">
//                                             Men
//                                         </label>
//                                     </div>
//                                 </div>

//                                 {/* Occasion */}
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Occasion</h2>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             Engagement
//                                             <span>(71)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             Anniversary
//                                             <span>(29)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             Daily Wear
//                                             <span>(228)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             Evening
//                                             <span>(83)</span>
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-lg-9">
//                             <div className="row">
//                                 <div className="col d-lg-flex d-none justify-content-end">
//                                     <select
//                                         className="form-select custom-select w-auto"
//                                         value={`${filters.sortBy}_${filters.priceOrder}`}  // Combine the values of sortBy and priceOrder
//                                         onChange={(e) => handleSelectFilterChange(e.target.value)}  // Pass combined value
//                                     >
//                                         <option value="">Default</option>
//                                         <option value="newestFirst">Newest First</option>
//                                         <option value="newestFirst_lowToHigh">Low to High</option>
//                                         <option value="newestFirst_highToLow">High to Low</option>
//                                         <option value="featured">Featured</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 {products.length > 0 ? (
//                                     products.map((product) => (
//                                         <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 card_shadow p-0 px-1" >
//                                             <Link>
//                                                 <ProductCard Productsitem={product} />
//                                             </Link>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="text-center w-100 py-5">
//                                         <h4>No products found</h4>
//                                         <p>
//                                             Oops! There are no products available under your current selection.
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </>
//         </Helmet>
//     );
// };

// export default Earrings;

