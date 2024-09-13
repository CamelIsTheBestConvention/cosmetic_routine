import { useRef, useState } from "react";
import styled from "styled-components";
import { categoryFilters, skinFilters, ageFilters } from "../../data/Data.js";

interface RankingSubFilterProps {
  mainFilter: string;
  subFilter: string;
  setSubFilter: (filter: string) => void;
}

const RankingSubFilter: React.FC<RankingSubFilterProps> = ({
  mainFilter,
  subFilter,
  setSubFilter,
}) => {
  // 드래깅
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const handleSelect = (filter: string) => {
    setSubFilter(filter);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - wrapperRef.current.offsetLeft);
    setScrollLeft(wrapperRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !wrapperRef.current) return;
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    wrapperRef.current.scrollLeft = scrollLeft - walk;
  };

  // mainFilter에 따라 다른 서브 필터 목록을 설정
  const getSubFilterItems = () => {
    if (mainFilter === "category") {
      return categoryFilters;
    } else if (mainFilter === "skin") {
      return skinFilters;
    } else if (mainFilter === "age") {
      return ageFilters;
    } else {
      return [];
    }
  };

  const subFilters = getSubFilterItems();

  return (
    <>
      <RankingSubFilterWrapper
        ref={wrapperRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
      >
        {subFilters.map((filter) => (
          <FilterItem
            key={filter}
            isSelected={subFilter === filter}
            onClick={() => handleSelect(filter)}
          >
            {filter}
          </FilterItem>
        ))}
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
  overflow-x: hidden;
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
