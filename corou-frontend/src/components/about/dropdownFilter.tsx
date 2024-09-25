import styled from "styled-components";
import OtherFilter from "./otherFilter";
import PriceFilter from "./priceFilter";
import React, { useMemo, useState } from "react";

interface DropdownFilterProps {
  onFilterChange: (filter: number[]) => void;
  selectedFilters: number[];
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  minCount: number;
  setMinCount: React.Dispatch<React.SetStateAction<number>>;
  maxCount: number;
  setMaxCount: React.Dispatch<React.SetStateAction<number>>;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  onFilterChange,
  selectedFilters,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minCount,
  setMinCount,
  maxCount,
  setMaxCount,
}) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleOtherFilterChange = (checkedItems: number[]) => {
    onFilterChange(checkedItems);
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
            <OtherFilter
              selectedFilters={selectedFilters}
              onCheckedChange={handleOtherFilterChange}
            />
            <PriceFilter
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minCount={minCount}
              setMinCount={setMinCount}
              maxCount={maxCount}
              setMaxCount={setMaxCount}
            />
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
