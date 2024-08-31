import ReviewPoint from "../common/reviewPoint";
import "../../scss/ranking/itemBox.scss";

const ItemBox: React.FC = () => {
  return (
    <>
      <div className="rankingItemBox">
        <div className="rankingNum">1</div>
        <div className="rankingInfoBox">
          <div className="rankingImg">
            <img src="" alt="" />
          </div>
          <div className="rankingInfo">
            <span className="itemName">
              브랜드 <span>제품이름</span>
            </span>
            <ReviewPoint />
            <span className="itemPrice">
              정가 <span>24,000원</span>
              /50ml
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemBox;
