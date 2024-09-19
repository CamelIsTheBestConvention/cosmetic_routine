import styled from "styled-components";
import RankingFilter from "./rankingFilter";
import RankingItem from "./rankingItem";
import { useEffect, useState } from "react";
import axios from "axios";

interface itemProps {
  average_rating: number;
  category: string;
  description: string;
  item_key: number;
  item_name: string;
  item_price: number;
}

const RankingList: React.FC = () => {
  const [mainFilter, setMainFilter] = useState<string>("");
  const [subFilter, setSubFilter] = useState<string>("");
  const [rankingData, setRankingData] = useState<itemProps[]>([]);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const fetchRankingData = async () => {
    try {
      // const response = await axios.get(`${backPort}/api/item`, {
      //   params: {
      //     mainFilter: mainFilter,
      //     subFilter: subFilter,
      //   },
      // });
      const response = await axios.get(`${backPort}/api/item`);
      console.log(response.data);
      setRankingData(response.data);
    } catch (error) {
      console.error("랭킹 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchRankingData();
  }, [mainFilter, subFilter]);

  return (
    <>
      <RankingListWrapper>
        <RankingFilter
          mainFilter={mainFilter}
          setMainFilter={setMainFilter}
          subFilter={subFilter}
          setSubFilter={setSubFilter}
        />
        <RankingItem rankingData={rankingData} />
      </RankingListWrapper>
    </>
  );
};
export default RankingList;

const RankingListWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
