import styled from "styled-components";
import BackHeader from "../common/backHeader";
import SignupGuide from "./signupGuide";
import CommonInput from "../common/commonInput";
import { useState } from "react";
import CommonCheckBox from "../common/commonCheckbox";
import CommonRadioBox from "../common/commonRadiobox";
import CompleteBtn from "../common/completeBtn";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setBirth_date,
  setGender,
  setAttributes,
  setSkinType,
  setColor,
} from "../../redux/slice/signupSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import SHA256 from "crypto-js/sha256";
// import bcrypt from "bcryptjs";

const Signup3: React.FC = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.signup.email);
  const password = useSelector((state: RootState) => state.signup.password);
  const username = useSelector((state: RootState) => state.signup.username);
  const birth_date = useSelector((state: RootState) => state.signup.birth_date);
  const gender = useSelector((state: RootState) => state.signup.gender);
  const skinType = useSelector((state: RootState) => state.signup.skinType);
  const color = useSelector((state: RootState) => state.signup.color);
  const attributes = useSelector((state: RootState) => state.signup.attributes);
  const navigate = useNavigate();

  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const isFormValid = () => {
    return birth_date.length == 8 && !!gender && !!skinType && color !== null;
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue) && inputValue.length <= 8) {
      dispatch(setBirth_date(inputValue));
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGender(e.target.value));
  };

  const handleSkinTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const updatedTrouble = attributes.filter((item) => item < 1 || item > 5);
    const newTrouble = [...updatedTrouble, value];
    const sorted = [...newTrouble].sort((a, b) => a - b);

    dispatch(setSkinType(value));
    dispatch(setAttributes(sorted));
    console.log(sorted);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const updatedTrouble = attributes.filter(
      (item) => !(item >= 6 && item <= 9) && item !== 0
    );
    const newTrouble = [...updatedTrouble, value];
    const sorted = [...newTrouble].sort((a, b) => a - b);

    dispatch(setColor(value));
    dispatch(setAttributes(sorted));
    console.log(sorted);
  };

  const handleTroubleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    let updateValue;

    if (attributes.includes(value)) {
      updateValue = attributes.filter((item) => item !== value);
    } else {
      updateValue = [...attributes, value];
    }

    const sorted = [...updateValue].sort((a, b) => a - b);

    dispatch(setAttributes(sorted));
    console.log(updateValue);
  };

  const handleSubmit = async () => {
    try {
      const formattedBirth =
        birth_date.slice(0, 4) +
        "-" +
        birth_date.slice(4, 6) +
        "-" +
        birth_date.slice(6, 8);

      // const hashedPassword = await bcrypt.hash(password.trim(), 10);
      // console.log("해싱된 비번", hashedPassword);

      const userData = {
        email: email,
        password: password,
        username: username,
        birth_date: formattedBirth,
        gender: gender,
        attributes: attributes,
      };
      const response = await axios.post(
        `${backPort}/api/user/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("회원가입 성공");
      console.log("회원가입 성공", response.data);
      navigate("/login/email");
    } catch (error) {
      alert("회원가입 실패");
      console.log("회원가입 실패", error);
    }
  };

  return (
    <>
      <Signup3Wrapper>
        <SignupBox>
          <PageCount count="3" />
          <PageGuide text="태어난 날짜를 알려주세요" />
          <CommonInput
            typeValue="text"
            placeholderValue="예) 19950101"
            value={birth_date}
            onChange={handleBirthChange}
          />
          <SignupGuide text="성별을 선택해주세요" />
          <GenderBox>
            <CommonRadioBox
              label="남자"
              name="gender"
              value="M"
              checked={gender === "M"}
              onChange={handleGenderChange}
            />
            <CommonRadioBox
              label="여자"
              name="gender"
              value="W"
              checked={gender === "W"}
              onChange={handleGenderChange}
            />
          </GenderBox>
          <SignupGuide text="어떤 피부 타입인가요?" />
          <SkinBox1>
            <CommonRadioBox
              label="건성"
              name="skin"
              value={1}
              checked={skinType === 1}
              onChange={handleSkinTypeChange}
            />
            <CommonRadioBox
              label="중성"
              name="skin"
              value={2}
              checked={skinType === 2}
              onChange={handleSkinTypeChange}
            />
            <CommonRadioBox
              label="지성"
              name="skin"
              value={3}
              checked={skinType === 3}
              onChange={handleSkinTypeChange}
            />
          </SkinBox1>
          <SkinBox2>
            <CommonRadioBox
              label="복합성"
              name="skin"
              value={4}
              checked={skinType === 4}
              onChange={handleSkinTypeChange}
            />
            <CommonRadioBox
              label="수부지"
              name="skin"
              value={5}
              checked={skinType === 5}
              onChange={handleSkinTypeChange}
            />
          </SkinBox2>
          <SignupGuide text="퍼스널컬러를 골라주세요" />
          <ColorBox1>
            <CommonRadioBox
              label="봄웜톤"
              name="color"
              value={6}
              checked={color === 6}
              onChange={handleColorChange}
            />
            <CommonRadioBox
              label="여름쿨톤"
              name="color"
              value={7}
              checked={color === 7}
              onChange={handleColorChange}
            />
            <CommonRadioBox
              label="가을웜톤"
              name="color"
              value={8}
              checked={color === 8}
              onChange={handleColorChange}
            />
            <CommonRadioBox
              label="겨울쿨톤"
              name="color"
              value={9}
              checked={color === 9}
              onChange={handleColorChange}
            />
          </ColorBox1>
          <ColorBox2>
            <CommonRadioBox
              label="잘 모르겠어요.."
              name="color"
              value={100}
              checked={color === 100}
              onChange={handleColorChange}
            />
          </ColorBox2>
          <SignupGuide text="피부 고민이 있나요?" />
          <p
            style={{
              color: "#848484",
              fontSize: "13px",
              margin: "-10px 0 10px 0",
            }}
          >
            중복 체크 가능합니다.
          </p>
          <TroubleBox>
            <CommonCheckBox
              label="아토피"
              value={10}
              checked={attributes.includes(10)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="여드름"
              value={11}
              checked={attributes.includes(11)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="민감성"
              value={12}
              checked={attributes.includes(12)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="홍조"
              value={13}
              checked={attributes.includes(13)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="각질"
              value={14}
              checked={attributes.includes(14)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="속건조"
              value={15}
              checked={attributes.includes(15)}
              onChange={handleTroubleChange}
            />
          </TroubleBox>
          <CompleteBtn
            text="저장"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          />
        </SignupBox>
      </Signup3Wrapper>
    </>
  );
};
export default Signup3;

const Signup3Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SignupBox = styled.div`
  width: 100%;
  margin: 50px auto;
`;

const GenderBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const SkinBox1 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;

const SkinBox2 = styled.div`
  width: 72%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

const ColorBox1 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

const ColorBox2 = styled.div`
  width: 100%;
`;

const TroubleBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;
