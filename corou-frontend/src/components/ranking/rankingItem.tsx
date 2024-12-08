import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import notRanking from "../../img/notRanking.png";
import ItemBox from "./itemBox";

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

interface rankingItemProps {
  rankingData: itemProps[];
}

const RankingItem: React.FC<rankingItemProps> = ({ rankingData }) => {
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/item/${id}`);
  };

  return (
    <>
      <RankingItemWrapper>
        {rankingData.length > 0 ? (
          rankingData.map((item) => (
            <ItemBox
              key={item.item_key}
              item={item}
              rank={rankingData.indexOf(item) + 1}
              onClick={() => handleItemClick(item.item_key)}
            />
          ))
        ) : (
          <div className="notItemWrapper">
            <div>
              <img src={notRanking} alt="랭킹 정보가 없습니다." />
            </div>
            <p>제품 정보가 없습니다.</p>
          </div>
        )}
      </RankingItemWrapper>
    </>
  );
};
export default RankingItem;

const RankingItemWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  /* padding: 20px 0; */
`;
