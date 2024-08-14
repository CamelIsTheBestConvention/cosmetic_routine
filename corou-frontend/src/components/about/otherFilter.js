import styled from "styled-components";
import React, { useState } from "react";
import { options } from "./Data";

const OtherFilter = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (checkedItems.includes(value)) {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    } else {
      setCheckedItems([...checkedItems, value]);
    }
  };

  return (
    <>
      <FilterWrapper>
        {options.map((option, index) => (
          <Label key={index} isChecked={checkedItems.includes(option)}>
            <input
              type="checkbox"
              value={option}
              checked={checkedItems.includes(option)}
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

const Label = styled.label`
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
