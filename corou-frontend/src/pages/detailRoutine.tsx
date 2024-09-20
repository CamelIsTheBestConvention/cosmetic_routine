import { useEffect, useState } from "react";
import AboutHeader from "../components/common/aboutHeader";
import DetailHeader from "../components/detail/detailHeader";
import DetailInfo from "../components/detail/detailInfo";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainFooter from "../components/common/mainFooter";
import RoutineReview from "../components/common/routineReview";

const DetailRoutine: React.FC = () => {
  const [data, setData] = useState<any>(null);
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
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      <AboutHeader Title="" onBack={handleBack} />
      <DetailInfo data={data} />
      <RoutineReview routine_key={data?.routine_key} />
      <MainFooter />
    </>
  );
};
export default DetailRoutine;
