import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Redirection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const authorizationCode = params.get("code");
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  useEffect(() => {
    console.log(authorizationCode);
    if (authorizationCode) {
      axios
        .post(`${backPort}/api/kakao/login`, {
          code: `${authorizationCode}`,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          console.log(data.result.user_id);
          console.log(data.result.jwt);

          navigate("/");
        })
        .catch((error) => {
          console.error("오류 발생", error);
        });
    }
  }, [authorizationCode, navigate]);

  return (
    <>
      <div>로그인 중입니다.</div>
    </>
  );
};
export default Redirection;
