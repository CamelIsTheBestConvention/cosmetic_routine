import { useState } from "react";
import styled from "styled-components";

const RankingMainFilter: React.FC = () => {
  const [select, setSelect] = useState<string>("");

  const handleSelect = (filter: string) => {
    setSelect(filter);
  };

  return (
    <>
      <RankingMainFilterWrapper>
        <FilterItem
          isSelected={select === "category"}
          onClick={() => handleSelect("category")}
        >
          카테고리별
        </FilterItem>
        <FilterItem
          isSelected={select === "skin"}
          onClick={() => handleSelect("skin")}
        >
          피부별
        </FilterItem>
        <FilterItem
          isSelected={select === "age"}
          onClick={() => handleSelect("age")}
        >
          연령대별
        </FilterItem>
      </RankingMainFilterWrapper>
    </>
  );
};
export default RankingMainFilter;

const RankingMainFilterWrapper = styled.div`
  width: 90%;
  margin: 30px auto 20px auto;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #ffa4e4;
  padding-bottom: 15px;
`;

const FilterItem = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
`;
