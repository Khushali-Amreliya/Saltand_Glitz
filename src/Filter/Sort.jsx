import React, { useState } from 'react'

const Sort = ({ onFilterApply }) => {
    const [filters, setFilters] = useState({
        sortBy: "",
        priceOrder: "",
    });
    const handleSelectFilterChange = (combinedValue) => {
        const [sortBy, priceOrder] = combinedValue.split('_');  // Split combined value
        const updatedFilters = { ...filters, sortBy, priceOrder };
        setFilters(updatedFilters);
        onFilterApply(updatedFilters); // Parent component ko notify karo
    };
    return (
        <>
            <div className="row">
                <div className="col d-lg-flex d-none justify-content-end" style={{ fontSize: "10px" }}>
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
        </>
    )
}

export default Sort