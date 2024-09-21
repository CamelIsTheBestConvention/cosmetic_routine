import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface routineData {
  average_rating: number;
  for_age: number;
  for_gender: string;
  price_total: number;
  routine_key: number;
  routine_name: string;
  steps: number;
  user: { username: string };
}

const MainHeader: React.FC = () => {
  const [routineData, setRoutineData] = useState<routineData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  useEffect(() => {
    const fetchRoutineData = async (query: string) => {
      try {
        const response = await axios.get(
          `${backPort}/api/routine/search/${query}`
        );
        console.log("메인검색 데이터", response.data);
        setRoutineData(response.data);
      } catch (error) {
        console.error("루틴 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (searchQuery.trim().length > 2) {
      fetchRoutineData(searchQuery);
    } else {
      setRoutineData([]);
    }
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <SearchWrapper>
        <Search>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchQuery}
            onChange={handleInputChange}
          />
        </Search>
        {searchQuery.trim().length > 0 && routineData.length > 0 && (
          <SearchResults>
            {routineData.map((item) => (
              <div key={item.routine_key}>
                <h3>{item.routine_name}</h3>
                <span>{item.user.username}님의 루틴</span>
                <span>₩{item.price_total}</span>
                <span>루틴 단계 : {item.steps}단계</span>
              </div>
            ))}
          </SearchResults>
        )}
      </SearchWrapper>
      <Space></Space>
    </>
  );
};
export default MainHeader;

const SearchWrapper = styled.div`
  width: 30%;
  min-width: 430px;
  position: fixed;
  top: 0;
  padding-top: 20px;
  background-color: white;
  z-index: 10;
`;

const Search = styled.div`
  width: 80%;
  margin: 0 auto 10px auto;
  background-color: #f3f3f3;
  padding: 5px 0;
  border-radius: 20px;
  display: flex;
  justify-content: center;

  input {
    width: 90%;
    padding: 8px 0;
    font-size: 1.1rem;
    border: none;
    outline: none;
    background-color: inherit;
  }
`;

const Space = styled.div`
  height: 60px;
  /* margin-top: 30px; */
`;

const SearchResults = styled.div`
  width: 80%;
  height: 200px;
  margin: 0 auto;
  border: 3px solid rgba(255, 164, 228, 0.5);
  border-radius: 14px;
  margin-top: -10px;
  overflow-y: auto;

  div {
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid rgba(255, 164, 228, 0.5);
    /* border-radius: 12px; */
    padding: 5px;

    h3 {
      margin: 0;
    }
  }
`;
const ProductItem = styled.div``;
