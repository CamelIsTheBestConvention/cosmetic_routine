import { useEffect, useState } from "react";
import RankingMainFilter from "./rankingMainFilter";
import RankingSubFilter from "./rankingSubFilter";

interface RankingFilterProps {
  mainFilter: string;
  setMainFilter: (filter: string) => void;
  subFilter: string;
  setSubFilter: (filter: string) => void;
}

const RankingFilter: React.FC<RankingFilterProps> = ({
  mainFilter,
  setMainFilter,
  subFilter,
  setSubFilter,
}) => {
  useEffect(() => {
    console.log("메인필터", mainFilter);
    console.log("서브필터", subFilter);
  }, [subFilter]);

  return (
    <>
      <div>
        <RankingMainFilter select={mainFilter} setSelect={setMainFilter} />
        <RankingSubFilter
          mainFilter={mainFilter}
          subFilter={subFilter}
          setSubFilter={setSubFilter}
        />
      </div>
    </>
  );
};
export default RankingFilter;
