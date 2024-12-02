import React, { useState } from "react";
import "../../scss/login/emailLogin.scss";
import CommonInput from "../common/commonInput";
import PwVisible from "../common/pwVisible";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
// import SHA256 from "crypto-js/sha256";
// import bcrypt from "bcryptjs";

interface MyTokenPayload extends JwtPayload {
  exp: number;
  iat?: number;
  userId?: string;
  email?: string;
}

const EmailLoginBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const hashedPassword = await bcrypt.hash(password.trim(), 10);
      console.log(email);
      // console.log("해싱된 비번2", hashedPassword);

      const userData = {
        email,
        password,
      };

      console.log(userData);
      console.log(backPort);

      const response = await axios.post(`${backPort}/api/user/login`, userData);
      console.log("로그인 성공", response.data);
      alert("로그인에 성공하였습니다.");

      const token = response.data.token;
      const userKey = response.data.user.user_key;
      const userName = response.data.user.username;
      const decodedToken = jwtDecode<MyTokenPayload>(token);
      const expirationTime = decodedToken.exp * 1000;

      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("userKey", userKey);
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("tokenExpiration", expirationTime.toString());

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      window.location.href = "/";
    } catch (error) {
      alert("아이디와 비밀번호를 확인해주세요.");
      console.log("로그인 실패", error);
    }
  };

  return (
    <>
      <div className="loginInputForm">
        <form onSubmit={handleSubmit}>
          <CommonInput
            typeValue="email"
            placeholderValue="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CommonInput
            typeValue={showPassword ? "text" : "password"}
            placeholderValue="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PwVisible onToggle={setShowPassword} />
          <span className="forgotPw">
            비밀번호를 잊으셨나요? <span>비밀번호 재설정</span>
          </span>
          <button className="loginBtn" type="submit">
            로그인
          </button>
        </form>
      </div>
    </>
  );
};
export default EmailLoginBox;
