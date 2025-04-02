import React, { useState } from "react";

const Sort = ({ onFilterApply }) => {
    const [filters, setFilters] = useState({
        sortBy: "",
        priceOrder: "",
        featured: "",
    });

    const handleSelectFilterChange = (combinedValue) => {
        let updatedFilters = {};

        if (combinedValue === "featured") {
            updatedFilters = { featured: "featured", sortBy: "", priceOrder: "" };
        } else if (combinedValue !== "default") {
            const [sortBy, priceOrder] = combinedValue.split("_");
            updatedFilters = { sortBy: sortBy || "", priceOrder: priceOrder || "", featured: "" };
        }

        // ✅ Preserve previous filters while applying sort
        onFilterApply(updatedFilters);
    };

    return (
        <div className="row">
            <div className="col d-lg-flex d-none justify-content-end" style={{ fontSize: "10px" }}>
                <select
                    className="form-select custom-select w-auto"
                    value={
                        filters.featured
                            ? "featured"
                            : filters.sortBy && filters.priceOrder
                                ? `${filters.sortBy}_${filters.priceOrder}`
                                : filters.sortBy || "default"
                    }
                    onChange={(e) => handleSelectFilterChange(e.target.value)}
                >
                    <option value="default" hidden>Featured</option>
                    <option value="featured">Featured</option>
                    <option value="newestFirst">Latest</option>
                    <option value="newestFirst_lowToHigh">Low to High</option>
                    <option value="newestFirst_highToLow">High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default Sort;
