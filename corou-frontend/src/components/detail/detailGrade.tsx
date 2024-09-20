import { useEffect, useState } from "react";
import ReviewPoint from "../common/reviewPoint";
import axios from "axios";

interface ItemData {
  average_rating: number;
  brand_name: string;
  category: string;
  description: string;
  item_key: number;
  item_name: string;
  item_price: number;
  volume: number;
}

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
  const [itemData, setItemData] = useState<ItemData[]>([]);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const fetchFindItem = async (item_key: number) => {
    try {
      const response = await axios.get(`${backPort}/api/item/key/${item_key}`);
      console.log("아이템 잘 받아오는지 데이터", response.data);

      return response.data;
    } catch (error) {
      console.error("아이템 가져오는 중 에러 발생", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllItemData = async () => {
      const promises = routineList.map((routine) =>
        fetchFindItem(routine.item_key)
      );
      const results = await Promise.all(promises);
      setItemData(results.filter((item) => item !== null));
    };

    if (routineList.length > 0) {
      fetchAllItemData();
    }
  }, [routineList]);

  return (
    <>
      <div className="detailGradeWrapper">
        <div className="detailGradeTitle">
          <div>
            <span>
              {routineName} : {routineGrade}단계 루틴
            </span>
            {/* <span>0/{routineGrade} 제품 보유중</span> */}
          </div>
          {/* <div>
            <span>보유중인 제품 제외하기</span>
            <input type="checkbox" />
          </div> */}
        </div>
        <div className="detailGradeItem">
          {hasRoutine && routineList.length > 0 ? (
            routineList.map((routine, index) => {
              const item = itemData[index];
              return (
                <div className="detailGradeBox" key={index}>
                  <span>
                    {routine.step_number}단계: {routine.step_name}
                  </span>
                  <div className="detailItemInfo">
                    <div>
                      <img
                        src={`/assets/item/${item?.item_key}.jpg`}
                        alt={item?.item_name}
                      />
                    </div>
                    <div>
                      <span>{item?.brand_name}</span>
                      <span>{`${item?.item_name} / ${item?.volume}ml`}</span>
                      <span>{`₩ ${item?.item_price.toLocaleString()}`}</span>
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
              );
            })
          ) : (
            <div>루틴 정보가 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};
export default DetailGrade;
