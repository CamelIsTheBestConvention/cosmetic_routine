import styled from "styled-components";
import CommonInput from "../common/commonInput";
import NextBtn from "./nextBtn";
import PwVisible from "../common/pwVisible";
import React, { useEffect, useState } from "react";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setPasswordConfirm,
} from "../../redux/slice/signupSlice";
import { RootState } from "../../redux/store";
import axios from "axios";

interface NextProps {
  onStepChange: (step: number) => void;
}

const Signup1: React.FC<NextProps> = ({ onStepChange }) => {
  const dispatch = useDispatch();

  const email = useSelector((state: RootState) => state.signup.email);
  const password = useSelector((state: RootState) => state.signup.password);
  const passwordConfirm = useSelector(
    (state: RootState) => state.signup.passwordConfirm
  );

  const [isFormValid, setIsFormValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);
  const [passwordComplexityValid, setPasswordComplexityValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailCheck, setEmailCheck] = useState<null | boolean>(null);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const passwordLengthRegex = /.{8,}$/;
  const passwordComplexityRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  useEffect(() => {
    const isEmailValid = emailRegex.test(email);
    const isPasswordLengthValid = passwordLengthRegex.test(password);
    const isPasswordComplexityValid = passwordComplexityRegex.test(password);
    const isPasswordConfirmed = password === passwordConfirm;

    setEmailValid(isEmailValid);
    setPasswordLengthValid(isPasswordLengthValid);
    setPasswordComplexityValid(isPasswordComplexityValid);
    setIsFormValid(
      isEmailValid &&
        isPasswordLengthValid &&
        isPasswordComplexityValid &&
        isPasswordConfirmed
    );
  }, [email, password, passwordConfirm]);

  const handleEmailCheck = async () => {
    try {
      const response = await axios.get(`${backPort}/api/user/checkemail/${email}`);

      const message = response.data.message;

      if (message == "이미 사용중인 이메일입니다.") {
        return true;
      }

      return false;
    } catch (error) {
      console.error("이메일 중복 확인 중 오류 발생", error);
      return true;
    }
  };

  const handleNext = async () => {
    if (!isFormValid) return;

    const emailExists = await handleEmailCheck();

    if (emailExists) {
      setEmailCheck(false);
      alert("이미 사용중인 이메일입니다.");
    } else {
      setEmailCheck(true);
      onStepChange(2);
    }
  };

  return (
    <>
      <Signup1Wrapper>
        <SignupBox>
          <PageCount count="1" />
          <PageGuide text="이메일과 비밀번호를 입력해주세요." />
          <CommonInput
            typeValue="email"
            placeholderValue="이메일"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <InputCheck valid={emailValid}>√ 이메일 확인</InputCheck>
          <CommonInput
            typeValue={showPassword ? "text" : "password"}
            placeholderValue="비밀번호"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <InputCheck valid={passwordLengthValid}>√ 8자리 이상</InputCheck>
          <InputCheck valid={passwordComplexityValid}>
            √ 영문, 숫자, 특수문자 포함
          </InputCheck>
          <CommonInput
            typeValue={showPassword ? "text" : "password"}
            placeholderValue="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => dispatch(setPasswordConfirm(e.target.value))}
          />
          <InputCheck valid={password === passwordConfirm}>
            √ 비밀번호 동일
          </InputCheck>
          <PwVisible onToggle={setShowPassword} />
          <NextBtn onClick={handleNext} disabled={!isFormValid} />
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

const InputCheck = styled.div<{ valid: boolean }>`
  font-size: 11px;
  margin-left: 10px;
  margin-bottom: 5px;
  color: #c9c9c9;
  color: ${(props) => (props.valid ? "green" : "#c9c9c9")};
`;
