import { useEffect, useState } from "react";
import AboutHeader from "../components/common/aboutHeader";
import DetailHeader from "../components/detail/detailHeader";
import DetailInfo from "../components/detail/detailInfo";
import axios from "axios";

const DetailRoutine: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get("/api/routine/{routine_key}")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <DetailHeader />
      <DetailInfo data={data} />
    </>
  );
};
export default DetailRoutine;
