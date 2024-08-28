import ReviewPoint from "../common/reviewPoint";

const RankingItem: React.FC = () => {
  return (
    <>
      <div>
        <div>1</div>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <span>
              브랜드 <span>제품이름</span>
            </span>
            <ReviewPoint />
            <span>
              정가 <span>24,000원</span>
              <span>/50ml</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default RankingItem;
