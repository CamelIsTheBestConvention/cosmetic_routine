import ReviewPoint from "../common/reviewPoint";

interface routineList {
  step_number: number;
  item_key: number[];
  step_name: string;
  description: string;
}

interface detailGradeData {
  routineGrade: number;
  routineList: routineList;
}

const DetailGrade: React.FC<detailGradeData> = ({
  routineGrade,
  routineList,
}) => {
  const hasRoutine = routineList;

  return (
    <>
      <div className="detailGradeWrapper">
        <div className="detailGradeTitle">
          <div>
            <span>취침 전 : {routineGrade}단계 루틴</span>
            <span>2/{routineGrade} 제품 보유중</span>
          </div>
          <div>
            <span>보유중인 제품 제외하기</span>
            <input type="checkbox" />
          </div>
        </div>
        <div className="detailGradeItem">
          {hasRoutine ? (
            <div className="detailGradeBox">
              <span>1단계:세안</span>
              <div className="detailItemInfo">
                {/* <div>
                  <img src={routineList[0].itemImg} alt="" />
                </div>
                <div>
                  <span>{routineList[0].brand}</span>
                  <span>
                    {routineList[0]?.name} & {routineList[0]?.size}
                  </span>
                  <span>₩ {routineList[0]?.price}</span>
                  <ReviewPoint />
                </div> */}
              </div>
              <div className="detailItemEffect">제품 효능 박스(일단 보류)</div>
            </div>
          ) : (
            <div>루틴 정보가 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};
export default DetailGrade;
