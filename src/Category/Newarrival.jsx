import React, { useEffect, useState } from 'react';
import Loader from '../Pages/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../Pages/Product/productCard';
import Filter from '../Filter/Filter';
import Mdfilter from '../Filter/Mdfilter';
import Helmet from '../Components/Helmet';
import Sort from '../Filter/Sort';

const Newarrival = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});

    // API Call to get all products (only when no filters applied)
    const getUploadData = async () => {
        if (Object.keys(filters).length > 0) return; // Filters active hone par ye call na ho
        setLoading(true);
        setError(null);
        try {
            let response = await axios.get("https://saltandglitz-api-131827005467.asia-south2.run.app/v1/upload/get_upload");
            // console.log(response);

            const categoryProducts = response.data

            setProducts(categoryProducts.toReversed().slice(0, 8));
        } catch (err) {
            setError("Failed to load products.");
        }
        setLoading(false);
    };

    useEffect(() => {
        getUploadData();
    }, []);

    // Function to update products based on filters
    const applyFilters = async (appliedFilters) => {
        console.log("Filters Applied:", appliedFilters);
        setLoading(true);
        setFilters(appliedFilters);
        console.log(filters);

        try {
            const response = await axios.post("https://saltandglitz-api-131827005467.asia-south2.run.app/v1/upload/filterProduct", appliedFilters);

            console.log("Filtered Response:", response.data.updatedProducts);

            const filteredProducts = response.data.updatedProducts
            setProducts(filteredProducts.toReversed().slice(0, 8));

            if (filteredProducts.length === 0) {
                setError("Oops! There are no products available under your current selection.");
                setProducts([]);
            } else {
                setError(null);
                setProducts(filteredProducts);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
            setProducts([]);
        }
        setLoading(false);
    };
    return (
        <Helmet title="New Arrivals">
            <>
                <section className="bg_product_page mb-2 mb-lg-5">
                    <div className="container">
                        <div className=" flex-column text-start min-vh-25 py-3">
                            <div>
                                <h6 className="mb-1">
                                    New Arrivals Designs &nbsp;
                                    <span>{products.length} Designs</span>
                                </h6>
                                <p>Home &gt; Jewellery</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='container-fluid mt-2 mb-4'>
                    <div className='row'>
                        <div className="col-xl-3 col-lg-3 d-lg-block d-none">
                            <Filter onFilterApply={applyFilters} />
                        </div>
                        <Mdfilter onFilterApply={applyFilters} />
                        <div className="col-lg-9">
                            <Sort onFilterApply={applyFilters} />
                            <div className="row">
                                {loading ? (
                                    <Loader />
                                ) : error ? (
                                    <div className="text-center w-100 py-5">
                                        <h4>{error}</h4>
                                        <p>Oops! There are no products available under your current selection.</p>
                                    </div>
                                ) : products.length > 0 ? (
                                    products.map((item) => (
                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 card_shadow p-0 px-1" key={item.id}>
                                            <Link>
                                                <ProductCard Productsitem={item} />
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </Helmet>
    )
}

export default Newarrival