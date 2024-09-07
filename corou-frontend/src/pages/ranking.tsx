import styled from "styled-components";
import AboutHeader from "../components/common/aboutHeader";
import MainHeader from "../components/common/mainHeader";
import SearchBar from "../components/ranking/searchBar";
import RankingList from "../components/ranking/rankingList";
import MainFooter from "../components/common/mainFooter";
import { useNavigate } from "react-router-dom";

const Ranking: React.FC = () => {
  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <>
      <RankingWrapper>
        <AboutHeader Title="제품 랭킹" onBack={handleBackPage} />
        <SearchBar />
        <RankingList />
        <MainFooter />
      </RankingWrapper>
    </>
  );
};
export default Ranking;

const RankingWrapper = styled.div`
  width: 100%;
`;
