import styled from "styled-components";
import OtherFilter from "./otherFilter";
import PriceFilter from "./priceFilter";
import React, { useState } from "react";

const DropdownFilter = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
      <div>
        <FilterToggle
          onClick={toggleFilterVisibility}
          style={{ cursor: "pointer" }}
        >
          필터 {isFilterVisible ? "▲" : "▼"}
        </FilterToggle>
        {isFilterVisible && (
          <>
            <OtherFilter />
            <PriceFilter />
          </>
        )}
      </div>
    </>
  );
};
export default DropdownFilter;

const FilterToggle = styled.div`
  text-align: right;
  margin-right: 5%;
  font-size: 12px;
  color: #888888;
`;
