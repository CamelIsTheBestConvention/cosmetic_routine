import styled from "styled-components";
import "../../scss/login/emailLogin.scss";

const EmailLoginBox: React.FC = () => {
  return (
    <>
      <div className="loginInputForm">
        <form action="">
          <input className="loginInput" type="email" placeholder="이메일" />
          <input
            className="loginInput"
            type="password"
            placeholder="비밀번호"
          />
          <div className="pwVisible">
            <input type="checkbox" />
            <span>비밀번호 표시</span>
          </div>
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
