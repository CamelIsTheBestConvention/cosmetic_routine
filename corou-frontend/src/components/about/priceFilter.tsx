import React, { useState } from "react";
import styled from "styled-components";

interface PriceFilterProps {
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  minCount: number;
  setMinCount: React.Dispatch<React.SetStateAction<number>>;
  maxCount: number;
  setMaxCount: React.Dispatch<React.SetStateAction<number>>;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minCount,
  setMinCount,
  maxCount,
  setMaxCount,
}) => {
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
          onChange={(e) => setMinCount(Number(e.target.value))}
        />
        ~
        <FilterInput
          type="text"
          value={maxCount}
          onChange={(e) => setMaxCount(Number(e.target.value))}
        />
      </AsideFilterWrapper>

      <AsideFilterWrapper>
        <FilterTitle>가격대</FilterTitle>
        <FilterInput
          type="text"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        ~
        <FilterInput
          type="text"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </AsideFilterWrapper>
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
