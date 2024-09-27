import styled from "styled-components";
import RankingFilter from "./rankingFilter";
import RankingItem from "./rankingItem";
import { useEffect, useState } from "react";
import axios from "axios";

const filterList = [
  "건성",
  "중성",
  "지성",
  "복합성",
  "수부지",
  "봄웜톤",
  "여름쿨톤",
  "가을웜톤",
  "겨울쿨톤",
  "아토피",
  "여드름",
  "민감성",
  "홍조",
  "각질",
  "속건조",
];

interface itemProps {
  average_rating: number;
  category: string;
  description: string;
  item_key: number;
  item_name: string;
  item_price: number;
  brand_name: string;
  volume: number;
}

interface RankingListProps {
  searchQuery: string;
}

const RankingList: React.FC<RankingListProps> = ({ searchQuery }) => {
  const [mainFilter, setMainFilter] = useState<string>("");
  const [subFilter, setSubFilter] = useState<string>("");
  const [rankingData, setRankingData] = useState<itemProps[]>([]);
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const [displayItems, setDisplayItems] = useState<itemProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchRankingData = async (query: string) => {
    try {
      const response = await axios.get(
        `${backPort}/api/item${query ? `/search/${query}` : ""}`
      );
      // const response = await axios.get(`${backPort}/api/item${query}`);
      console.log("아이템 데이터", response.data);
      setRankingData(response.data);
      setDisplayItems(response.data.slice(0, itemsPerPage));
    } catch (error) {
      console.error("랭킹 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchRankingData(searchQuery);
  }, [mainFilter, subFilter, searchQuery]);

  useEffect(() => {
    setDisplayItems(rankingData.slice(0, currentPage * itemsPerPage));
  }, [currentPage, rankingData]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filterRankingData = displayItems.filter((item) => {
    return subFilter ? item.category === subFilter : true;
  });

  return (
    <>
      <RankingListWrapper>
        <RankingFilter
          mainFilter={mainFilter}
          setMainFilter={setMainFilter}
          subFilter={subFilter}
          setSubFilter={setSubFilter}
        />
        <RankingItem rankingData={filterRankingData} />
      </RankingListWrapper>
    </>
  );
};
export default RankingList;

const RankingListWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
