import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Pages/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../Pages/Product/productCard';
import Filter from '../Filter/Filter';
import Mdfilter from '../Filter/Mdfilter';
import Helmet from '../Components/Helmet';
import Sort from '../Filter/Sort';

const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { category = "", subCategory = "" } = useParams(); // Provide default empty string

    // Convert hyphen (-) back to space only if it's not empty
    const decodedCategory = category ? category.replace(/-/g, " ") : "";
    const decodedSubCategory = subCategory ? subCategory.replace(/-/g, " ") : "";
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchFilteredProducts = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "https://saltandglitz-api-131827005467.asia-south2.run.app/v1/upload/filterProduct",
                {
                    title: decodedCategory || "",  // Agar category empty ho toh "" bheje
                    subCategory: decodedSubCategory || "",
                    ...filters,
                }
            );
            console.log(response);
            

            let filteredProducts = response.data.updatedProducts;

            // Agar category ya subCategory nahi hai, toh saare products show karo
            if (decodedCategory) {
                filteredProducts = filteredProducts.filter(item =>
                    item.category === decodedCategory &&
                    (!decodedSubCategory || item.subCategory === decodedSubCategory)
                );
            }

            if (filteredProducts.length === 0) {
                setError("Oops! No products found.");
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

    useEffect(() => {
        fetchFilteredProducts();
    }, [category, subCategory]);

    return (
        <Helmet title={`${category} Products`}>
            <>
                <section className="bg_product_page mb-2 mb-lg-5">
                    <div className="container">
                        <div className=" flex-column text-start min-vh-25 py-3">
                            <div>
                                <h6 className="mb-1">
                                    {category} Designs &nbsp;
                                    <span>{products.length} Designs</span>
                                </h6>
                                <p>Home &gt; Jewellery &gt; {category}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='container-fluid mt-2 mb-4'>
                    <div className='row'>
                        <div className="col-xl-3 col-lg-3 d-lg-block d-none">
                            <Filter onFilterApply={(filterData) => fetchFilteredProducts(filterData)} />

                        </div>
                        <Mdfilter onFilterApply={(filterData) => fetchFilteredProducts(filterData)} />

                        <div className="col-lg-9">
                            <Sort onFilterApply={(sortData) => fetchFilteredProducts(sortData)} />

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
                                            <Link to={`/product/${item.id}`}>
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

export default CollectionPage;