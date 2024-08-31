import styled from "styled-components";
import ReviewPoint from "../common/reviewPoint";
import ItemBox from "./itemBox";

const RankingItem: React.FC = () => {
  return (
    <>
      <RankingItemWrapper>
        <ItemBox />
        <ItemBox />
        <ItemBox />
        <ItemBox />
        <ItemBox />
        <ItemBox />
        <ItemBox />
      </RankingItemWrapper>
    </>
  );
};
export default RankingItem;

const RankingItemWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
`;
