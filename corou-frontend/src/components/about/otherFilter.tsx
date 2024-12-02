import styled from "styled-components";
import React, { useState } from "react";
import { options } from "../../data/Data";

interface OtherFilterProps {
  onCheckedChange: (checkedItems: number[]) => void;
  selectedFilters: number[];
}

const OtherFilter: React.FC<OtherFilterProps> = ({
  onCheckedChange,
  selectedFilters,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    let updatedItems;

    if (selectedFilters.includes(value)) {
      updatedItems = selectedFilters.filter((item) => item !== value);
    } else {
      updatedItems = [...selectedFilters, value];
    }

    // 부모에게 업데이트된 상태 전달
    onCheckedChange(updatedItems);
  };

  return (
    <>
      <FilterWrapper>
        {options.map((option, index) => (
          <Label key={index} isChecked={selectedFilters.includes(index + 6)}>
            <input
              type="checkbox"
              value={index + 6}
              checked={selectedFilters.includes(index + 6)}
              onChange={handleCheckboxChange}
            />
            {option}
          </Label>
        ))}
      </FilterWrapper>
    </>
  );
};
export default OtherFilter;

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 10px;
  padding: 10px;
`;

const Label = styled.label<{ isChecked: boolean }>`
  width: 60px;
  padding: 2px 0;
  cursor: pointer;
  margin: 0 auto;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => (props.isChecked ? "#FFA4E4" : "white")};
  border: 1px solid #c9c9c9;
  border-radius: 15px;

  &:hover {
    background-color: #ffa4e4;
  }

  input[type="checkbox"] {
    display: none;
  }
`;
