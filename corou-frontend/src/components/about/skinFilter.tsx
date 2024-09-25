import styled from "styled-components";
import React, { useState } from "react";

interface SkinFilterProps {
  onSkinChange: (skinType: number) => void;
}

const SkinFilter: React.FC<SkinFilterProps> = ({ onSkinChange }) => {
  const [selectedSkinType, setSelectedSkinType] = useState<number | null>(null);

  const skinTypeMap: { [key: string]: number } = {
    지성: 1,
    건성: 2,
    중성: 3,
    복합성: 4,
    수부지: 5,
  };

  const handleRadioChange = (skinType: string) => {
    const skinTypeNumber = skinTypeMap[skinType];
    setSelectedSkinType(skinTypeNumber);
    onSkinChange(skinTypeNumber);
  };

  return (
    <>
      <SkinFilterWrapper>
        {["지성", "건성", "중성", "복합성", "수부지"].map((skin) => (
          <Label
            key={skin}
            isSelected={selectedSkinType === skinTypeMap[skin]}
            onClick={() => handleRadioChange(skin)}
          >
            <input
              type="radio"
              name="skinType"
              value={skin}
              checked={selectedSkinType === skinTypeMap[skin]}
              onChange={() => handleRadioChange(skin)}
            />
            {skin}
          </Label>
        ))}
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

const Label = styled.label<{ isSelected: boolean }>`
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
