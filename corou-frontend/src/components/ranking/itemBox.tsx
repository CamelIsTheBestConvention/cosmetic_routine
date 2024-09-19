import ReviewPoint from "../common/reviewPoint";
import "../../scss/ranking/itemBox.scss";

interface ItemBoxProps {
  item: {
    average_rating: number;
    category: string;
    description: string;
    item_key: number;
    item_name: string;
    item_price: number;

    // brand: string;
    // imageUrl: string;
    // reviewPoint: number;
    // reviewCount: number;
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
            <img src={""} alt={`${item.item_name} 이미지`} />
          </div>
          <div className="rankingInfo">
            <span className="itemName">
              브랜드 <span>{item.item_name}</span>
            </span>
            <ReviewPoint />
            <span className="itemPrice">
              정가 <span>{item.item_price}원</span>
              /50ml
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemBox;
