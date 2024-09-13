import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const OtherBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMoveRegister = () => {
    navigate("/register");
  };

  const handleMoveEmailLogin = () => {
    if (location.pathname === "/login") {
      navigate("/login/email");
    } else if (location.pathname === "/login/email") {
      navigate("/login");
    }
  };

  const btnText =
    location.pathname === "/login" ? "이메일 로그인" : "카카오 로그인";

  return (
    <>
      <>
        <OtherBtnWrapper>
          <Btn onClick={handleMoveRegister}>이메일 회원가입</Btn>
          <Slash> | </Slash>
          <Btn onClick={handleMoveEmailLogin}>{btnText}</Btn>
        </OtherBtnWrapper>
      </>
    </>
  );
};
export default OtherBtn;

const OtherBtnWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: #848484;
`;

const Slash = styled.span`
  margin: 0 5px;
`;

const Btn = styled.span`
  cursor: pointer;
`;
