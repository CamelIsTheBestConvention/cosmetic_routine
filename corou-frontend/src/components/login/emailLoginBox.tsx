import React, { useState } from "react";
import "../../scss/login/emailLogin.scss";
import CommonInput from "../common/commonInput";
import PwVisible from "../common/pwVisible";

// interface EmailLoginProps {
//   typeValue: string;
//   placeholderValue: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

const EmailLoginBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="loginInputForm">
        <form action="">
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
          <button className="loginBtn">로그인</button>
        </form>
      </div>
    </>
  );
};
export default EmailLoginBox;
