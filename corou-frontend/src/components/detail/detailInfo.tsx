import "../../scss/detail/detailInfo.scss";
import DetailProfile from "./detailProfile";
import DetailTitle from "./detailTitle";
import DetailCheck from "./detailCheck";
import DetailTag from "./detailTag";
import DetailGrade from "./detailGrade";
import DetailBtnBox from "./detailBtnBox";
import { useEffect, useState } from "react";
import axios from "axios";
import MainFooter from "../common/mainFooter";

interface routineDetails {
  description: string;
  item_key: number;
  routine_key: number;
  step_name: string;
  step_number: number;
}

interface reviews {
  review_key: number;
  user_key: number;
  rating: number;
  review_content: string;
}

interface routineData {
  average_rating: number;
  for_age: number;
  for_gender: string;
  price_total: number;
  reviews: reviews[];
  routineDetails: routineDetails[];
  routine_key: number;
  routine_name: string;
  steps: number;
  user: { username: string };
}

interface detailRoutineData {
  data: routineData;
}

const DetailInfo: React.FC<detailRoutineData> = ({ data }) => {
  console.log("props 데이터", data);

  return (
    <>
      {data ? (
        <div className="detailInfoWrapper">
          <h4>{data?.user.username}님의 루틴</h4>
          <DetailTitle
            reviewPoint={data?.average_rating}
            reviewMember={2}
          />
          <DetailProfile
            profileImg={data?.user.username}
            profileNickname={data?.user.username}
          />
          <DetailCheck
            check={data?.routineDetails.map((detail) => detail.description)}
          />
          <DetailTag
            tag={data?.routineDetails.map((detail) => detail.step_name)}
          />
          <DetailGrade
            routineGrade={data?.steps}
            routineList={data?.routineDetails || []}
            routineName={data?.routine_name}
          />
          <DetailBtnBox
            itemList={data?.routineDetails.map((detail) => detail.item_key)}
          />
        </div>
      ) : (
        <div>루틴 정보가 없습니다.</div>
      )}
      <MainFooter />
    </>
  );
};
export default DetailInfo;
