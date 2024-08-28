import styled from "styled-components";
import BackHeader from "../common/backHeader";
import CommonInput from "../common/commonInput";
import NextBtn from "./nextBtn";
import PwVisible from "../common/pwVisible";
import React, { useState } from "react";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";

interface NextProps {
  onNext: () => void;
}

const Signup1: React.FC<NextProps> = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <>
      <Signup1Wrapper>
        <SignupBox>
          <PageCount count="1" />
          <PageGuide text="이메일과 비밀번호를 입력해주세요." />
          <EmailBox>
            <CommonInput
              typeValue="email"
              placeholderValue="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <EmailCheck>√ 8자리 이상</EmailCheck>
            <EmailCheck>
              √ 대문자, 소문자, 숫자, 특수문자 중 2개 이상
            </EmailCheck>
          </EmailBox>
          <CommonInput
            typeValue="password"
            placeholderValue="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PwVisible />
          <CommonInput
            typeValue="password"
            placeholderValue="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <NextBtn onClick={onNext} />
        </SignupBox>
      </Signup1Wrapper>
    </>
  );
};
export default Signup1;

const Signup1Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SignupBox = styled.div`
  width: 100%;
  margin: 50px auto;
`;

const EmailBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const EmailCheck = styled.div`
  font-size: 11px;
  margin-left: 10px;
  color: #c9c9c9;
`;
