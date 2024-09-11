import styled from "styled-components";
import OtherFilter from "../about/otherFilter";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";
import CommonInput from "../common/commonInput";
import { useState } from "react";
import NextBtn from "../signup/nextBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setTitle,
  setForRoutine,
  setGrade,
} from "../../redux/slice/addRoutineSlice";

interface NextProps {
  onNext: () => void;
}

const AddRoutine1: React.FC<NextProps> = ({ onNext }) => {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.addRoutine.title);
  const forRoutine = useSelector(
    (state: RootState) => state.addRoutine.forRoutine
  );
  const grade = useSelector((state: RootState) => state.addRoutine.grade);

  const handleCheckedChange = (newCheckedItems: number[]) => {
    dispatch(setForRoutine(newCheckedItems));
  };

  const isButtonDisabled = () => {
    return !title || forRoutine.length === 0 || grade <= 0;
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
        <OtherFilter onCheckedChange={handleCheckedChange} />
        <PageGuide text="몇개의 단계로 이루어져 있나요?" />
        <ItemGrade>제품 개수</ItemGrade>
        <CommonInput
          typeValue="number"
          placeholderValue="예) 3"
          value={grade}
          onChange={(e) => dispatch(setGrade(Number(e.target.value)))}
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
