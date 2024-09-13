import ReviewPoint from "../common/reviewPoint";
import "../../scss/ranking/itemBox.scss";

interface ItemBoxProps {
  item: {
    brand: string;
    itemName: string;
    price: number;
    imageUrl: string;
    reviewPoint: number;
    reviewCount: number;
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
            <img src={item.imageUrl} alt={`${item.itemName} 이미지`} />
          </div>
          <div className="rankingInfo">
            <span className="itemName">
              {item.brand} <span>{item.itemName}</span>
            </span>
            <ReviewPoint />
            <span className="itemPrice">
              정가 <span>{item.price}원</span>
              /50ml
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemBox;
