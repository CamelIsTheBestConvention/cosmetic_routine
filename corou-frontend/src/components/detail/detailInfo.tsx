import "../../scss/detail/detailInfo.scss";
import DetailProfile from "./detailProfile";
import DetailTitle from "./detailTitle";
import DetailCheck from "./detailCheck";
import DetailTag from "./detailTag";
import DetailGrade from "./detailGrade";
import DetailBtnBox from "./detailBtnBox";
import { useEffect, useState } from "react";
import axios from "axios";

interface user {
  user_key: number;
  username: string;
}

interface routineDetails {
  step_number: number;
  item_key: number[];
  step_name: string;
  description: string;
}

interface routineSkinRelations {
  skin_type: string[];
}

interface routineTagRelations {
  tags: string[];
}

interface reviews {
  review_key: number;
  user_key: number;
  rating: number;
  review_content: string;
}

interface routineData {
  routine_key: number;
  routine_name: string;
  steps: number;
  for_gender: string;
  for_age: number;
  average_rating: number;
  user: user;
  routineDetails: routineDetails;
  routineSkinRelations: routineSkinRelations;
  routineTagRelations: routineTagRelations;
  reviews: reviews[];
}

interface detailRoutineData {
  data: routineData;
}

const DetailInfo: React.FC<detailRoutineData> = ({ data }) => {
  return (
    <>
      {data ? (
        <div className="detailInfoWrapper">
          <h4>{data?.user.username}의 루틴</h4>
          <DetailTitle
            reviewPoint={data?.average_rating}
            reviewMember={data?.reviews.length}
          />
          <DetailProfile
            profileImg={data?.user.username}
            profileNickname={data?.user.username}
          />
          <DetailCheck check={data?.routineSkinRelations.skin_type} />
          <DetailTag tag={data?.routineTagRelations.tags} />
          <DetailGrade
            routineGrade={data?.steps}
            routineList={data?.routineDetails || []}
          />
          <DetailBtnBox itemList={data?.routineDetails.item_key} />
        </div>
      ) : (
        <div>루틴 정보가 없습니다.</div>
      )}
    </>
  );
};
export default DetailInfo;
