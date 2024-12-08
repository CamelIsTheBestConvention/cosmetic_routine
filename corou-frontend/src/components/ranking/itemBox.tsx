import "../../scss/ranking/itemBox.scss";
import ReviewPoint from "../common/reviewPoint";

interface ItemBoxProps {
  item: {
    average_rating: number;
    category: string;
    description: string;
    item_key: number;
    item_name: string;
    item_price: number;
    brand_name: string;
    volume: number;
  };
  rank: number;
  onClick: () => void;
}

const ItemBox: React.FC<ItemBoxProps> = ({ item, rank, onClick }) => {
  return (
    <>
      <div className="rankingItemBox" onClick={onClick}>
        <div className="rankingNum">{rank}</div>
        <div className="rankingInfoBox">
          <div className="rankingImg">
            <img
              src={`/assets/item/${item?.item_key}.jpg`}
              alt={`${item.item_name} 이미지`}
            />
          </div>
          <div className="rankingInfo">
            <span className="itemName">
              {item?.brand_name} <span>{item?.item_name}</span>
            </span>
            <ReviewPoint />
            <span className="itemPrice">
              정가 <span>{item?.item_price.toLocaleString()}원</span>/
              {item?.volume}ml
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemBox;
