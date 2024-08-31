import ReviewPoint from "../common/reviewPoint";

const DetailGrade: React.FC = () => {
  return (
    <>
      <div className="detailGradeWrapper">
        <div className="detailGradeTitle">
          <div>
            <span>취침 전 : 4단계 루틴</span>
            <span>2/4 제품 보유중</span>
          </div>
          <div>
            <span>보유중인 제품 제외하기</span>
            <input type="checkbox" />
          </div>
        </div>
        <div className="detailGradeItem">
          <div className="detailGradeBox">
            <span>1단계:세안</span>
            <div className="detailItemInfo">
              <div>
                <img src="#" alt="" />
              </div>
              <div>
                <span>브랜드</span>
                <span>제품명 & 용량</span>
                <span>₩ 00,000</span>
                <ReviewPoint />
              </div>
            </div>
            <div className="detailItemEffect">제품 효능 박스(일단 보류)</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailGrade;
