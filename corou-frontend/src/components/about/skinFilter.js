import styled from "styled-components";
import React, { useState } from "react";

const SkinFilter = () => {
  const [selectedSkinType, setSelectedSkinType] = useState("");

  const handleRadioChange = (e) => {
    setSelectedSkinType(e.target.value);
  };

  return (
    <>
      <SkinFilterWrapper>
        <Label
          isSelected={selectedSkinType === "지성"}
          onClick={() => setSelectedSkinType("지성")}
        >
          <input
            type="radio"
            name="skinType"
            value="지성"
            checked={selectedSkinType === "지성"}
            onChange={handleRadioChange}
          />
          지성
        </Label>

        <Label
          isSelected={selectedSkinType === "건성"}
          onClick={() => setSelectedSkinType("건성")}
        >
          <input
            type="radio"
            name="skinType"
            value="건성"
            checked={selectedSkinType === "건성"}
            onChange={handleRadioChange}
          />
          건성
        </Label>

        <Label
          isSelected={selectedSkinType === "중성"}
          onClick={() => setSelectedSkinType("중성")}
        >
          <input
            type="radio"
            name="skinType"
            value="중성"
            checked={selectedSkinType === "중성"}
            onChange={handleRadioChange}
          />
          중성
        </Label>

        <Label
          isSelected={selectedSkinType === "복합성"}
          onClick={() => setSelectedSkinType("복합성")}
        >
          <input
            type="radio"
            name="skinType"
            value="복합성"
            checked={selectedSkinType === "복합성"}
            onChange={handleRadioChange}
          />
          복합성
        </Label>

        <Label
          isSelected={selectedSkinType === "수부지"}
          onClick={() => setSelectedSkinType("수부지")}
        >
          <input
            type="radio"
            name="skinType"
            value="수부지"
            checked={selectedSkinType === "수부지"}
            onChange={handleRadioChange}
          />
          수부지
        </Label>
      </SkinFilterWrapper>
    </>
  );
};
export default SkinFilter;

const SkinFilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding-bottom: 10px;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => (props.isSelected ? "#FFA4E4" : "#A9A9A9")};

  input[type="radio"] {
    display: none;
  }

  &:hover {
    color: #ffa4e4;
  }
`;
