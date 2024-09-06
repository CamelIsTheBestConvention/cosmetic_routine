import "../../scss/detail/detailInfo.scss";
import DetailProfile from "./detailProfile";
import DetailTitle from "./detailTitle";
import DetailCheck from "./detailCheck";
import DetailTag from "./detailTag";
import DetailGrade from "./detailGrade";
import DetailBtnBox from "./detailBtnBox";
import { useEffect, useState } from "react";
import axios from "axios";

interface routineObject {
  id: number;
  brand: string;
  name: string;
  size: number;
  price: number;
  itemImg: string;
}

interface routineData {
  nickname: string;
  reviewPoint: string;
  reviewMember: number;
  profileImg: string;
  check: string[];
  tag: string[];
  routineGrade: number;
  routineList: routineObject[];
  itemList: string[];
}

interface detailRoutineData {
  data: routineData[];
}

const DetailInfo: React.FC<detailRoutineData> = ({ data }) => {
  const hasData = data && data.length > 0;

  return (
    <>
      {hasData ? (
        <div className="detailInfoWrapper">
          <h4>{data[0]?.nickname}의 루틴</h4>
          <DetailTitle
            reviewPoint={data[0]?.reviewPoint}
            reviewMember={data[0]?.reviewMember}
          />
          <DetailProfile
            profileImg={data[0]?.profileImg}
            profileNickname={data[0]?.nickname}
          />
          <DetailCheck check={data[0]?.check} />
          <DetailTag tag={data[0]?.tag} />
          <DetailGrade
            routineGrade={data[0]?.routineGrade}
            routineList={data[0]?.routineList}
          />
          <DetailBtnBox itemList={data[0]?.itemList} />
        </div>
      ) : (
        <div>루틴 정보가 없습니다.</div>
      )}
    </>
  );
};
export default DetailInfo;
