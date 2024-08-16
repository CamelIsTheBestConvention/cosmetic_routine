import React, { useState } from "react";
import styled from "styled-components";

const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minCount, setMinCount] = useState("");
  const [maxCount, setMaxCount] = useState("");

  // const products = [
  //   { id: 1, name: "Product A", price: 100 },
  //   { id: 2, name: "Product B", price: 200 },
  //   { id: 3, name: "Product C", price: 300 },
  //   { id: 4, name: "Product D", price: 400 },
  //   { id: 5, name: "Product E", price: 500 },
  // ];

  // const filteredProducts = products
  //   .filter((product) => {
  //     const price = product.price;
  //     const isWithinPriceRange =
  //       (!minPrice || price >= Number(minPrice)) &&
  //       (!maxPrice || price <= Number(maxPrice));
  //     return isWithinPriceRange;
  //   })
  //   .filter((product, index, array) => {
  //     const isWithinCountRange =
  //       (!minCount || index + 1 >= Number(minCount)) &&
  //       (!maxCount || index + 1 <= Number(maxCount));
  //     return isWithinCountRange;
  //   });

  return (
    <>
      <AsideFilterWrapper>
        <FilterTitle>제품 개수</FilterTitle>
        <FilterInput
          type="text"
          value={minCount}
          onChange={(e) => setMinCount(e.target.value)}
        />
        ~
        <FilterInput
          type="text"
          value={maxCount}
          onChange={(e) => setMaxCount(e.target.value)}
        />
      </AsideFilterWrapper>

      <AsideFilterWrapper>
        <FilterTitle>가격대</FilterTitle>
        <FilterInput
          type="text"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        ~
        <FilterInput
          type="text"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </AsideFilterWrapper>

      {/* <div>
        <h3>제품 목록</h3>
        {filteredProducts.length > 0 ? (
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>
                {product.name} - {product.price}원
              </li>
            ))}
          </ul>
        ) : (
          <p>해당 조건에 맞는 제품이 없습니다.</p>
        )}
      </div> */}
    </>
  );
};
export default PriceFilter;

const AsideFilterWrapper = styled.div`
  display: flex;
  margin-left: 8%;
  margin-bottom: 10px;
`;

const FilterTitle = styled.div`
  width: 60px;
  font-size: 12px;
  text-align: right;
  line-height: 1.5;
  margin-right: 5%;
`;

const FilterInput = styled.input`
  width: 65px;
  border: 1px solid #c9c9c9;
  border-radius: 15px;
  margin: 0 5px;
  font-size: 12px;
`;
