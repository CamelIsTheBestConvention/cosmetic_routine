import styled from "styled-components";
import TopRoutineBoxImg from "./topRoutineBoxImg";
import TopRoutineBoxInfo from "./topRoutineBoxInfo";

interface routineItem {
  routine_key: string;
  for_age: number;
  for_gender: string;
  isLiked: boolean;
  price_total: number;
  average_rating: number;
  routine_name: string;
  reviews: number;
  user: { username: string };
  problem: number[];
  tags: string[];
}

interface routineData {
  routine: routineItem;
  onClick: () => void;
}

const BannerBox: React.FC<routineData> = ({ routine, onClick }) => {
  return (
    <>
      <BannerBoxWrapper onClick={onClick}>
        {/* 이미지 */}
        <TopRoutineBoxImg routine_key={routine?.routine_key} />
        {/* 정보 */}
        <TopRoutineBoxInfo routine={routine} />
      </BannerBoxWrapper>
    </>
  );
};
export default BannerBox;

const BannerBoxWrapper = styled.div`
  min-width: 300px;
  height: 400px;
  border: 3px solid #ffa4e4;
  border-radius: 20px;
  margin-right: 20px;
`;
