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
import Review from "../common/itemReview";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface skinRelations {
  routine_key: number;
  attr_key: number;
}

interface tagRelations {
  routine_key: number;
  tag_key: number;
}

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
  routine_skin_relations: skinRelations[];
  routine_tag_relations: tagRelations[];
}

interface detailRoutineData {
  data: routineData;
}

const DetailInfo: React.FC<detailRoutineData> = ({ data }) => {
  const username = sessionStorage.getItem("userName");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const [tagData, setTagData] = useState<string[]>([]);

  const handleEditRoutine = () => {
    navigate(`/routine/${data.routine_key}/edit`, {
      state: { routineData: data, tagData: tagData },
    });
  };

  const handleDeleteRoutine = async () => {
    try {
      if (token) {
        await axios.delete(`${backPort}/api/routine/${data.routine_key}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      alert("루틴이 성공적으로 삭제되었습니다.");
      navigate("/routine");
    } catch (error) {
      console.error("루틴 삭제 실패", error);
      alert("루틴 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchTagData = async (data: routineData) => {
      try {
        const tagNamePromises = data?.routine_tag_relations.map((detail) =>
          axios.get(`${backPort}/api/tag/${detail.tag_key}`)
        );

        const tagResponses = await Promise.all(tagNamePromises);
        const result = tagResponses.map((response) => response.data);

        setTagData(result);
        console.log("태그 결과", result);
      } catch (error) {
        console.error("태그 데이터 가져오기 중 오류");
      }
    };

    if (data) {
      fetchTagData(data);
    }
  }, [data]);

  return (
    <>
      {data ? (
        <div className="detailInfoWrapper">
          <h4>{data?.user.username}님의 루틴</h4>
          <DetailTitle reviewPoint={data?.average_rating} reviewMember={2} />
          {data?.user.username === username && (
            <RoutineEditWrapper>
              <span onClick={handleEditRoutine}>수정</span>
              <span onClick={handleDeleteRoutine}>삭제</span>
            </RoutineEditWrapper>
          )}
          <DetailProfile
            profileImg={data?.user.username}
            profileNickname={data?.user.username}
          />
          <DetailCheck
            problem={data?.routine_skin_relations.map(
              (detail) => detail.attr_key
            )}
            gender={data?.for_gender}
            age={data?.for_age}
          />
          <DetailTag tagData={tagData} />
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
    </>
  );
};
export default DetailInfo;

const RoutineEditWrapper = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;

  span {
    font-size: 13px;
    margin-top: 10px;
    color: #848484;
    font-weight: 700;
    cursor: pointer;
  }
`;
