import styled from "styled-components";
import AboutHeader from "../components/common/aboutHeader";
import MainHeader from "../components/common/mainHeader";
import SearchBar from "../components/ranking/searchBar";
import RankingList from "../components/ranking/rankingList";

const Ranking: React.FC = () => {
  return (
    <>
      <RankingWrapper>
        <AboutHeader Title="제품 랭킹" onBack={""} />
        <SearchBar />
        <RankingList />
      </RankingWrapper>
    </>
  );
};
export default Ranking;

const RankingWrapper = styled.div`
  width: 100%;
`;
