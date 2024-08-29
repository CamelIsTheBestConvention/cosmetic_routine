import RankingMainFilter from "./rankingMainFilter";
import RankingSubFilter from "./rankingSubFilter";

const RankingFilter: React.FC = () => {
  return (
    <>
      <div>
        <RankingMainFilter />
        <RankingSubFilter />
      </div>
    </>
  );
};
export default RankingFilter;
