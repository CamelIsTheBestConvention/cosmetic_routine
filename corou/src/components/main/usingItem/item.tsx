import "../../../scss/main/item.scss";

const Item: React.FC = () => {
  return (
    <>
      <div className="itemWrapper">
        <div className="num">1</div>
        <div className="itemImg">이미지</div>
        <div className="itemInfo">
          <p>브랜드</p>
          <p>제품명 & 용량</p>
          <p>₩ 00,000</p>
        </div>
      </div>
    </>
  );
};
export default Item;
