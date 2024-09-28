import styled from "styled-components";
import AboutHeader from "../components/common/aboutHeader";
import SearchBar from "../components/common/searchBar";
import RankingList from "../components/ranking/rankingList";
import MainFooter from "../components/common/mainFooter";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Ranking: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <>
      <RankingWrapper>
        <AboutHeader Title="제품 랭킹" onBack={handleBackPage} />
        <SearchBar onSearch={handleSearch} />
        <RankingList searchQuery={searchQuery} />
        <MainFooter />
      </RankingWrapper>
    </>
  );
};
export default Ranking;

const RankingWrapper = styled.div`
  width: 100%;
`;
