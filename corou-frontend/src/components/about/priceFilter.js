import React, { useState } from "react";

const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <>
      <div>
        <div>제품 개수</div>
        <input /> ~
        <input />
      </div>
    </>
  );
};
export default PriceFilter;
