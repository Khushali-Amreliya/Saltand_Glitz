import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Filter = ({ onFilterApply }) => {
  const [filters, setFilters] = useState({
    title: "",
    priceLimit: "",
    sortBy: "",
    priceOrder: "",
    discountLimit: "",
    typeBy: "",
    shopFor: "",
    occasionBy: "",
    materialBy: "",
    giftFor: ""
  });

  const [showMorePrices, setShowMorePrices] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreOccasion, setShowMoreOccasion] = useState(false)
  const [showMoreGifts, setShowMoreGifts] = useState(false);
  const [showViewMore, setShowViewMore] = useState(false);

  const handleFilterChange = (type, value) => {
    const updatedFilters = { ...filters, [type]: value };
    setFilters(updatedFilters);
    onFilterApply(updatedFilters); // Parent component ko notify karo
  };

  const clearFilters = () => {
    setFilters({});
    window.location.reload(); // Refresh the page
  };

  const categories = ["Earring", "Ring", "Ladies Bracelet"];
  const priceRanges = [
    { id: "below20k", label: "Below ₹20,000" },
    { id: "20kTo30k", label: "₹20,000 - ₹30,000" },
    { id: "30kTo50k", label: "₹30,000 - ₹50,000" },
    { id: "50kTo100k", label: "₹50,000 - ₹1,00,000" },
    { id: "100kTo200k", label: "₹1,00,000 - ₹2,00,000" },
    { id: "200kTo300k", label: "₹2,00,000 - ₹3,00,000" },
    { id: "300kTo500k", label: "₹3,00,000 - ₹5,00,000" },
    { id: "above500k", label: "Above ₹5,00,000" }
  ];
  const occasion = ["Solitaire Rings", "Engagement Rings", "Cocktail Rings", "Wedding Rings", "Couple Rings", "Dailywear Rings", "Platinum Rings", "Bands Rings", "Infinity Rings", "Promise Rings"];
  const material = ["Solitaire", "Gold", "Platinum", "Gemstone"];
  const giftfor = ["Gift for Her", "Gift for Graduate", "Gift for Birthday", "Gift for Wedding", "Gift for Engagement", "Gift for Anniversary"];

  return (
    <div className="sticky-header px-5">
      <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2 d-flex justify-content-between align-items-center">
        <h6 className="filter_main_title">FILTERS</h6>
        <button className="btn btn-link p-0 clear_btn_Filter" onClick={clearFilters}>
          Clear All
        </button>
      </div>
      {/* Price Filter */}
      <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
        <h2 className="mt-3 filter_title">Price</h2>
        {priceRanges.slice(0, showMorePrices ? priceRanges.length : 4).map((price, index) => (
          <div className="form-check my-2" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              id={price.id}
              name="priceLimit"
              checked={filters.priceLimit === price.id}
              onChange={() => handleFilterChange("priceLimit", price.id)}
            />
            <label className="form-check-label" htmlFor={price.id}>
              {price.label}
            </label>
          </div>
        ))}
        {priceRanges.length > 4 && (
          <button className="btn p-0 show_more_btn" onClick={() => setShowMorePrices(!showMorePrices)}>
            {showMorePrices ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
            {showMorePrices ? "Show Less" : "More"}
          </button>
        )}
      </div>

      {/* Product Type */}
      <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
        <h2 className="filter_title mt-3">Product Type</h2>
        {categories.slice(0, showMoreCategories ? categories.length : 4).map((category, index) => (
          <div className="form-check my-2" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              value={category}
              id={`category${index}`}
              checked={filters.title?.includes(category) || false}
              onChange={() => handleFilterChange("title", category)}
            />
            <label className="form-check-label" htmlFor={`category${index}`}>
              {category}
            </label>
          </div>
        ))}
        {categories.length > 4 && (
          <button className="btn p-0 show_more_btn" onClick={() => setShowMoreCategories(!showMoreCategories)}>
            {showMoreCategories ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
            {showMoreCategories ? "Show Less" : "More"}
          </button>
        )}
      </div>

      {/* Material */}
      <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
        <h2 className="filter_title mt-3">Material</h2>
        {material.map((material, index) => (
          <div className="form-check my-2" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              value={material}
              id={`material${index}`}
              checked={filters.materialBy?.includes(material) || false}
              onChange={() => handleFilterChange("materialBy", material)}
            />
            <label className="form-check-label" htmlFor={`material${index}`}>
              {material}
            </label>
          </div>
        ))}
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

      {!showViewMore && (
        <button onClick={() => setShowViewMore(true)} className="btn mt-3 w-100 filter_viewmore_btn">view more</button>
      )}

      {/* Occasion */}
      {showViewMore && (
        <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
          <h2 className="filter_title mt-3">Occasion</h2>
          {occasion.slice(0, showMoreOccasion ? occasion.length : 4).map(
            (subCategory, index) => (
              <div className="form-check my-2" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={subCategory}
                  id={`subCategory${index}`}
                  checked={filters.occasionBy?.includes(subCategory) || false}
                  onChange={() =>
                    handleFilterChange("occasionBy", subCategory)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`subCategory${index}`}
                >
                  {subCategory}
                </label>
              </div>
            )
          )}
          {occasion.length > 4 && (
            <button className="btn p-0 show_more_btn" onClick={() => setShowMoreOccasion(!showMoreOccasion)}>
              {showMoreOccasion ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
              {showMoreOccasion ? "Show Less" : "More"}
            </button>
          )}
        </div>
      )}

      {/* Gift For */}
      {showViewMore && (
        <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
          <h2 className="filter_title mt-3">Gift For</h2>
          {giftfor.slice(0, showMoreGifts ? giftfor.length : 4).map((gift, index) => (
            <div className="form-check my-2" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                value={gift}
                id={`giftFor${index}`}
                checked={filters.giftFor === gift}
                onChange={() => handleFilterChange("giftFor", gift)}
              />
              <label className="form-check-label" htmlFor={`giftFor${index}`}>
                {gift}
              </label>
            </div>
          ))}
          {giftfor.length > 4 && (
            <button className="btn p-0 show_more_btn" onClick={() => setShowMoreGifts(!showMoreGifts)}>
              {showMoreGifts ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
              {showMoreGifts ? "Show Less" : "More"}
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default Filter;
