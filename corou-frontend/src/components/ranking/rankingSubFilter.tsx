import { useState } from "react";
import styled from "styled-components";

const RankingSubFilter: React.FC = () => {
  const [select, setSelect] = useState<string>("");

  const handleSelect = (filter: string) => {
    setSelect(filter);
  };

  return (
    <>
      <RankingSubFilterWrapper>
        <FilterItem
          isSelected={select === "건성"}
          onClick={() => handleSelect("건성")}
        >
          건성
        </FilterItem>
        <FilterItem
          isSelected={select === "지성"}
          onClick={() => handleSelect("지성")}
        >
          지성
        </FilterItem>
        <FilterItem
          isSelected={select === "중성"}
          onClick={() => handleSelect("중성")}
        >
          중성
        </FilterItem>
        <FilterItem
          isSelected={select === "복합성"}
          onClick={() => handleSelect("복합성")}
        >
          복합성
        </FilterItem>
        <FilterItem
          isSelected={select === "민감성"}
          onClick={() => handleSelect("민감성")}
        >
          민감성
        </FilterItem>
        <FilterItem
          isSelected={select === "여드름"}
          onClick={() => handleSelect("여드름")}
        >
          여드름
        </FilterItem>
        <FilterItem
          isSelected={select === "아토피"}
          onClick={() => handleSelect("아토피")}
        >
          아토피
        </FilterItem>
        <FilterItem
          isSelected={select === "등등"}
          onClick={() => handleSelect("등등")}
        >
          등등
        </FilterItem>
      </RankingSubFilterWrapper>
    </>
  );
};
export default RankingSubFilter;

const RankingSubFilterWrapper = styled.div`
  width: 90%;
  font-size: 13px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  overflow-x: auto;
  flex-wrap: nowrap;
  padding-bottom: 10px;
`;

const FilterItem = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  text-align: center;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  white-space: nowrap;
  min-width: 50px;
`;
