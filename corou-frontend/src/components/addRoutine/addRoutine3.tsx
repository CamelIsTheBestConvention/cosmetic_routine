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
  const grade = useSelector((state: RootState) => state.addRoutine.grade);
  const routineItem = useSelector(
    (state: RootState) => state.addRoutine.routineItem
  );
  const tag = useSelector((state: RootState) => state.addRoutine.tag);

  const tagChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const tagArr = value.split(/[\s,]+/).filter((tag) => tag.trim() !== "");
    dispatch(setTag(tagArr));
  };
  const [isSubmit, setIsSubmit] = useState(false);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const handleSubmit = async () => {
    setIsSubmit(true);
    try {
      const response = await axios.post(`${backPort}/api/routine`, {
        main: {
          title: title,
          grade: grade,
        },
        routineItem: routineItem,
        tag: tag,
      });
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
        <CommonTextarea value={tag.join(", ")} onChange={tagChange} />
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
