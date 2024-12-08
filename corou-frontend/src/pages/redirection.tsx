import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyTokenPayload extends JwtPayload {
  exp: number;
  iat?: number;
  userId?: string;
  email?: string;
}

const Redirection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const authorizationCode = params.get("code");
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const [isApiCalled, setIsApiCalled] = useState(false);

  useEffect(() => {
    if (authorizationCode && !isApiCalled) {
      console.log(authorizationCode);

      axios
        .post(
          `${backPort}/api/kakao/login`,
          {
            code: `${authorizationCode}`,
          },
          {
            validateStatus: function (status) {
              return status >= 200 && status <= 300;
            },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);

          if (response.status === 200) {
            console.log(response.data);
            const token = response.data.token;
            const userKey = response.data.user.user_key;
            const userName = response.data.user.username;
            const decodedToken = jwtDecode<MyTokenPayload>(token);
            const expirationTime = decodedToken.exp * 1000;

            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("userKey", userKey);
            sessionStorage.setItem("userName", userName);
            sessionStorage.setItem(
              "tokenExpiration",
              expirationTime.toString()
            );

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            setIsApiCalled(true);
            navigate("/");
          } else if (response.status == 300) {
            alert("가입 계정이 없어 회원가입 페이지로 이동합니다.");
            setIsApiCalled(true);
            navigate("/register", {
              state: {
                email: data.email,
                password: data.password,
                pageNum: 2,
              },
            });
          }
        })
        .catch((error) => {
          console.error(
            "오류 발생",
            error.response ? error.response.data : error
          );
        });
    }
  }, [authorizationCode, isApiCalled, navigate]);

  return (
    <>
      <div>로그인 중입니다.</div>
    </>
  );
};
export default Redirection;
