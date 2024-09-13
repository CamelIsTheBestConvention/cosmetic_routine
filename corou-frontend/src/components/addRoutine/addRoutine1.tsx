import styled from "styled-components";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";
import CommonInput from "../common/commonInput";
import { useState } from "react";
import NextBtn from "../signup/nextBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setTitle,
  setGender,
  setSkin,
  setAge,
  setProblem,
  setGrade,
} from "../../redux/slice/addRoutineSlice";
import CommonCheckBox from "../common/commonCheckbox";
import CommonRadioBox from "../common/commonRadiobox";

interface NextProps {
  onNext: () => void;
}

const AddRoutine1: React.FC<NextProps> = ({ onNext }) => {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.addRoutine.title);
  const gender = useSelector((state: RootState) => state.addRoutine.gender);
  const skin = useSelector((state: RootState) => state.addRoutine.skin);
  const age = useSelector((state: RootState) => state.addRoutine.age);
  const problem = useSelector((state: RootState) => state.addRoutine.problem);
  const grade = useSelector((state: RootState) => state.addRoutine.grade);

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let updateGender = [...gender];

    if (updateGender.includes(value)) {
      updateGender = updateGender.filter((e) => e !== value);
    } else {
      updateGender.push(value);
    }

    dispatch(setGender(updateGender));
  };

  const handleSkinTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    dispatch(setSkin(value));
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    dispatch(setAge(value));
  };

  const handleProblemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    let updateProblem = [...problem];

    if (updateProblem.includes(value)) {
      updateProblem = updateProblem.filter((e) => e !== value);
    } else {
      updateProblem.push(value);
    }

    updateProblem.sort((a, b) => a - b);
    dispatch(setProblem(updateProblem));
  };

  const isButtonDisabled = () => {
    return (
      !title || gender.length === 0 || skin === 0 || age === 0 || grade <= 0
    );
  };

  return (
    <>
      <AddRoutine1Wrapper>
        <PageCount count="1" />
        <PageGuide text="루틴 이름을 입력해주세요." />
        <CommonInput
          typeValue="text"
          placeholderValue="루틴 이름"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
        />
        <PageGuide text="누구를 위한 루틴인가요?" />
        <DuplicateCheck>중복 체크 가능</DuplicateCheck>
        <GenderBox>
          <CommonCheckBox
            label="남성"
            checked={gender.includes("M")}
            value="M"
            onChange={handleGenderChange}
          />
          <CommonCheckBox
            label="여성"
            checked={gender.includes("F")}
            value="F"
            onChange={handleGenderChange}
          />
        </GenderBox>
        <DuplicateCheck>중복 체크 불가능</DuplicateCheck>
        <SkinBox1>
          <CommonRadioBox
            label="건성"
            name="skin"
            value={1}
            checked={skin === 1}
            onChange={handleSkinTypeChange}
          />
          <CommonRadioBox
            label="중성"
            name="skin"
            value={2}
            checked={skin === 2}
            onChange={handleSkinTypeChange}
          />
          <CommonRadioBox
            label="지성"
            name="skin"
            value={3}
            checked={skin === 3}
            onChange={handleSkinTypeChange}
          />
        </SkinBox1>
        <SkinBox2>
          <CommonRadioBox
            label="복합성"
            name="skin"
            value={4}
            checked={skin === 4}
            onChange={handleSkinTypeChange}
          />
          <CommonRadioBox
            label="수부지"
            name="skin"
            value={5}
            checked={skin === 5}
            onChange={handleSkinTypeChange}
          />
        </SkinBox2>
        <DuplicateCheck>중복 체크 불가능</DuplicateCheck>
        <AgeBox>
          <CommonRadioBox
            label="10대"
            name="age"
            value={10}
            checked={age === 10}
            onChange={handleAgeChange}
          />
          <CommonRadioBox
            label="20대"
            name="age"
            value={20}
            checked={age === 20}
            onChange={handleAgeChange}
          />
          <CommonRadioBox
            label="30대"
            name="age"
            value={30}
            checked={age === 30}
            onChange={handleAgeChange}
          />
          <CommonRadioBox
            label="40대+"
            name="age"
            value={40}
            checked={age === 40}
            onChange={handleAgeChange}
          />
        </AgeBox>
        <DuplicateCheck>중복 체크 가능</DuplicateCheck>
        <ProblemBox>
          <CommonCheckBox
            label="아토피"
            value={10}
            checked={problem.includes(10)}
            onChange={handleProblemChange}
          />
          <CommonCheckBox
            label="여드름"
            value={11}
            checked={problem.includes(11)}
            onChange={handleProblemChange}
          />
          <CommonCheckBox
            label="민감성"
            value={12}
            checked={problem.includes(12)}
            onChange={handleProblemChange}
          />
          <CommonCheckBox
            label="홍조"
            value={13}
            checked={problem.includes(13)}
            onChange={handleProblemChange}
          />
          <CommonCheckBox
            label="각질"
            value={14}
            checked={problem.includes(14)}
            onChange={handleProblemChange}
          />
          <CommonCheckBox
            label="속건조"
            value={15}
            checked={problem.includes(15)}
            onChange={handleProblemChange}
          />
        </ProblemBox>
        <PageGuide text="몇개의 단계로 이루어져 있나요?" />
        <ItemGrade>제품 개수</ItemGrade>
        <CommonInput
          typeValue="text"
          placeholderValue="예) 3"
          value={grade}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              dispatch(setGrade(Number(value)));
            }
          }}
        />
        <NextBtn onClick={onNext} disabled={isButtonDisabled()} />
      </AddRoutine1Wrapper>
    </>
  );
};
export default AddRoutine1;

const AddRoutine1Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const ItemGrade = styled.span`
  font-size: 14px;
  color: #848484;
  margin-bottom: 10px;
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

const AgeBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 5px;
`;

const DuplicateCheck = styled.span`
  color: #848484;
  font-size: 13px;
  margin: 0 0 5px 0;
`;

const ProblemBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;
