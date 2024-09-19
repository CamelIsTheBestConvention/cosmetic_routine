import ReviewPoint from "../common/reviewPoint";

interface routineList {
  description: string;
  item_key: number;
  routine_key: number;
  step_name: string;
  step_number: number;
}

interface detailGradeData {
  routineGrade: number;
  routineList: routineList[];
  routineName: string;
}

const DetailGrade: React.FC<detailGradeData> = ({
  routineGrade,
  routineList,
  routineName,
}) => {
  const hasRoutine = routineList;

  return (
    <>
      <div className="detailGradeWrapper">
        <div className="detailGradeTitle">
          <div>
            <span>
              {routineName} : {routineGrade}단계 루틴
            </span>
            <span>0/{routineGrade} 제품 보유중</span>
          </div>
          {/* <div>
            <span>보유중인 제품 제외하기</span>
            <input type="checkbox" />
          </div> */}
        </div>
        <div className="detailGradeItem">
          {hasRoutine ? (
            routineList.map((routine, index) => (
              <div className="detailGradeBox" key={index}>
                <span>
                  {routine.step_number}단계: {routine.step_name}
                </span>
                <div className="detailItemInfo">
                  <div>{/* <img src={routine.itemImg} alt="" /> */}</div>
                  <div>
                    <span>브랜드</span>
                    <span>제품명 & 용량</span>
                    <span>₩ 00,000</span>
                    <ReviewPoint />
                  </div>
                </div>
                <span style={{ margin: "10px 0" }}>
                  설명 : {routine.description}
                </span>
                <div className="detailItemEffect">
                  제품 효능 박스(일단 보류)
                </div>
              </div>
            ))
          ) : (
            <div>루틴 정보가 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};
export default DetailGrade;
