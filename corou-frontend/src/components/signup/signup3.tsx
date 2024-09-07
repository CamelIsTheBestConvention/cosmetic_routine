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
  setBirth,
  setGender,
  setTrouble,
  setSkinType,
  setColor,
} from "../../redux/slice/signupSlice";
import axios from "axios";

const Signup3: React.FC = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.signup.email);
  const password = useSelector((state: RootState) => state.signup.password);
  const nickname = useSelector((state: RootState) => state.signup.nickname);
  const birth = useSelector((state: RootState) => state.signup.birth);
  const gender = useSelector((state: RootState) => state.signup.gender);
  const skinType = useSelector((state: RootState) => state.signup.skinType);
  const color = useSelector((state: RootState) => state.signup.color);
  const trouble = useSelector((state: RootState) => state.signup.trouble);

  const isFormValid = () => {
    return birth.length == 8 && !!gender && !!skinType && color !== null;
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue) && inputValue.length <= 8) {
      dispatch(setBirth(inputValue));
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGender(e.target.value));
  };

  const handleSkinTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const updatedTrouble = trouble.filter((item) => item < 1 || item > 5);
    const newTrouble = [...updatedTrouble, value];
    const sorted = [...newTrouble].sort((a, b) => a - b);

    dispatch(setSkinType(value));
    dispatch(setTrouble(sorted));
    console.log(sorted);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const updatedTrouble = trouble.filter(
      (item) => !(item >= 6 && item <= 9) && item !== 0
    );
    const newTrouble = [...updatedTrouble, value];
    const sorted = [...newTrouble].sort((a, b) => a - b);

    dispatch(setColor(value));
    dispatch(setTrouble(sorted));
    console.log(sorted);
  };

  const handleTroubleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    let updateValue;

    if (trouble.includes(value)) {
      updateValue = trouble.filter((item) => item !== value);
    } else {
      updateValue = [...trouble, value];
    }

    const sorted = [...updateValue].sort((a, b) => a - b);

    dispatch(setTrouble(sorted));
    console.log(updateValue);
  };

  const handleSubmit = async () => {
    try {
      const formattedBirth =
        birth.slice(0, 4) + "-" + birth.slice(4, 6) + "-" + birth.slice(6, 8);

      const userData = {
        email: email,
        password: password,
        nickname: nickname,
        birth: formattedBirth,
        gender: gender,
        trouble: trouble,
      };

      const response = await axios.post("/api/user/register", userData);

      console.log("회원가입 성공", response.data);
    } catch (error) {
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
            value={birth}
            onChange={handleBirthChange}
          />
          <SignupGuide text="성별을 선택해주세요" />
          <GenderBox>
            <CommonRadioBox
              label="남자"
              name="gender"
              value="M"
              onChange={handleGenderChange}
            />
            <CommonRadioBox
              label="여자"
              name="gender"
              value="W"
              onChange={handleGenderChange}
            />
          </GenderBox>
          <SignupGuide text="어떤 피부 타입인가요?" />
          <SkinBox1>
            <CommonRadioBox
              label="건성"
              name="skin"
              value={1}
              onChange={handleSkinTypeChange}
            />
            <CommonRadioBox
              label="중성"
              name="skin"
              value={2}
              onChange={handleSkinTypeChange}
            />
            <CommonRadioBox
              label="지성"
              name="skin"
              value={3}
              onChange={handleSkinTypeChange}
            />
          </SkinBox1>
          <SkinBox2>
            <CommonRadioBox
              label="복합성"
              name="skin"
              value={4}
              onChange={handleSkinTypeChange}
            />
            <CommonRadioBox
              label="수부지"
              name="skin"
              value={5}
              onChange={handleSkinTypeChange}
            />
          </SkinBox2>
          <SignupGuide text="퍼스널컬러를 골라주세요" />
          <ColorBox1>
            <CommonRadioBox
              label="봄웜톤"
              name="color"
              value={6}
              onChange={handleColorChange}
            />
            <CommonRadioBox
              label="여름쿨톤"
              name="color"
              value={7}
              onChange={handleColorChange}
            />
            <CommonRadioBox
              label="가을웜톤"
              name="color"
              value={8}
              onChange={handleColorChange}
            />
            <CommonRadioBox
              label="겨울쿨톤"
              name="color"
              value={9}
              onChange={handleColorChange}
            />
          </ColorBox1>
          <ColorBox2>
            <CommonRadioBox
              label="잘 모르겠어요.."
              name="color"
              value={0}
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
              checked={trouble.includes(10)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="여드름"
              value={11}
              checked={trouble.includes(11)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="민감성"
              value={12}
              checked={trouble.includes(12)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="홍조"
              value={13}
              checked={trouble.includes(13)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="각질"
              value={14}
              checked={trouble.includes(14)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="속건조"
              value={15}
              checked={trouble.includes(15)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="등"
              value={16}
              checked={trouble.includes(16)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="등등"
              value={17}
              checked={trouble.includes(17)}
              onChange={handleTroubleChange}
            />
            <CommonCheckBox
              label="등등등"
              value={18}
              checked={trouble.includes(18)}
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
