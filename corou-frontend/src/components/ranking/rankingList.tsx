import styled from "styled-components";
import RankingFilter from "./rankingFilter";
import RankingItem from "./rankingItem";

const RankingList: React.FC = () => {
  return (
    <>
      <RankingListWrapper>
        <RankingFilter />
        <RankingItem />
      </RankingListWrapper>
    </>
  );
};
export default RankingList;

const RankingListWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
