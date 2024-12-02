import { useEffect, useState } from "react";
import AboutHeader from "../components/common/aboutHeader";
import DetailHeader from "../components/detail/detailHeader";
import DetailInfo from "../components/detail/detailInfo";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainFooter from "../components/common/mainFooter";
import RoutineReview from "../components/common/routineReview";

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

interface skinRelations {
  routine_key: number;
  attr_key: number;
}

interface tagRelations {
  routine_key: number;
  tag_key: number;
}

interface routineItem {
  average_rating: number;
  for_age: number;
  for_gender: string;
  price_total: number;
  routineDetails: routineDetails[];
  routine_key: number;
  routine_name: string;
  steps: number;
  routine_skin_relations: skinRelations[];
  routine_tag_relations: tagRelations[];
  user: { username: string };
  reviews: reviews[];
}

const DetailRoutine: React.FC = () => {
  const [detailRoutineData, setDetailRoutineData] = useState<routineItem>({
    average_rating: 0,
    for_age: 0,
    for_gender: "",
    price_total: 0,
    routineDetails: [],
    routine_key: 0,
    routine_name: "",
    steps: 0,
    routine_skin_relations: [],
    routine_tag_relations: [],
    user: { username: "" },
    reviews: [],
  });
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${backPort}/api/routine/${id}`)
        .then((response) => {
          console.log("상세루틴 데이터", response.data);
          setDetailRoutineData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      <AboutHeader Title="" onBack={handleBack} />
      <DetailInfo data={detailRoutineData} />
      <RoutineReview routine_key={detailRoutineData?.routine_key} />
      <MainFooter />
    </>
  );
};
export default DetailRoutine;
