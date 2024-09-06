import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirection = () => {
  const navigate = useNavigate();
  const code = new URL(dococument.location.toString()).searchParams.get("code");
  console.log(code);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .post(`/api/user/login?code=${code}`, {}, { headers: headers })
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
  }, [code]);

  return (
    <>
      <div>로그인 중입니다.</div>
    </>
  );
};
export default Redirection;
