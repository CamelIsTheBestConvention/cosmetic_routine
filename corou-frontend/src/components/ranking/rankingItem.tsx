import styled from "styled-components";
import ReviewPoint from "../common/reviewPoint";
import ItemBox from "./itemBox";
import { useNavigate } from "react-router-dom";

interface RankingItemProps {
  rankingData: any[];
}

const RankingItem: React.FC<RankingItemProps> = ({ rankingData }) => {
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/api/item/${id}`);
  };

  return (
    <>
      <RankingItemWrapper>
        {rankingData.length > 0 ? (
          rankingData.map((item, index) => (
            <ItemBox
              key={index}
              item={item}
              rank={index + 1}
              onClick={() => handleItemClick(item.id)}
            />
          ))
        ) : (
          <p>랭킹 정보가 없습니다.</p>
        )}
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
