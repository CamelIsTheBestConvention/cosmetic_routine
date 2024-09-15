import styled from "styled-components";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";
import CommonTextarea from "../common/commonTextarea";
import { useState } from "react";
import CompleteBtn from "../common/completeBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setTitle,
  setGrade,
  setRoutineItem,
  setTag,
} from "../../redux/slice/addRoutineSlice";
import axios from "axios";

const AddRoutine3: React.FC = () => {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.addRoutine.title);
  const gender = useSelector((state: RootState) => state.addRoutine.gender);
  const skin = useSelector((state: RootState) => state.addRoutine.skin);
  const age = useSelector((state: RootState) => state.addRoutine.age);
  const problem = useSelector((state: RootState) => state.addRoutine.problem);
  const grade = useSelector((state: RootState) => state.addRoutine.grade);
  const routineItem = useSelector(
    (state: RootState) => state.addRoutine.routineItem
  );
  const tag = useSelector((state: RootState) => state.addRoutine.tag);
  const [tagInput, setTagInput] = useState(tag.join(", "));

  const token = sessionStorage.getItem("authToken");

  const tagChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTagInput(e.target.value);
  };
  const handleTagBlur = () => {
    const tagArr = tagInput.split(/[\s,]+/).filter((tag) => tag.trim() !== "");
    dispatch(setTag(tagArr));
  };

  const [isSubmit, setIsSubmit] = useState(false);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const handleSubmit = async () => {
    setIsSubmit(true);
    let for_gender = "";

    if (gender.length === 2) {
      for_gender = "A";
    } else {
      for_gender = gender[0];
    }

    const requestBody = {
      main: {
        routine_name: title,
        steps: grade,
        for_gender: for_gender,
        for_skin: skin,
        for_age: age,
        for_problem: problem,
      },
      details: routineItem,
      tags: tag,
    };

    console.log("요청할 body 데이터:", requestBody);

    try {
      const response = await axios.post(
        `${backPort}/api/routine`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("응답:", response.data);
    } catch (error) {
      console.error("제출 중 오류 발생", error);
    } finally {
      setIsSubmit(false);
    }
  };

  const isButtonDisabled = () => {
    return !tag || tag.length === 0;
  };

  return (
    <>
      <AddRoutine3Wrapper>
        <PageCount count="3" />
        <PageGuide text="태그를 등록해주세요" />
        <CommonTextarea
          value={tagInput}
          onChange={tagChange}
          onBlur={handleTagBlur}
        />
        <span>스페이스 또는 쉼표(,)로 구분해주세요</span>
        <CompleteBtn
          text="등록"
          onClick={handleSubmit}
          disabled={isButtonDisabled() || isSubmit}
        />
      </AddRoutine3Wrapper>
    </>
  );
};
export default AddRoutine3;

const AddRoutine3Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 150px;

  span {
    font-size: 12px;
    color: #454545;
  }
`;
