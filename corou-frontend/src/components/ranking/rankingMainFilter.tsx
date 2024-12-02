import { useState } from "react";
import styled from "styled-components";

interface RankingMainFilterProps {
  select: string;
  setSelect: (filter: string) => void;
}

const RankingMainFilter: React.FC<RankingMainFilterProps> = ({
  select,
  setSelect,
}) => {
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
          isSelected={select === "problem"}
          onClick={() => handleSelect("problem")}
        >
          트러블별
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
  color: ${({ isSelected }) => (isSelected ? "#fd73d4" : "black")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
`;
