import styled from "styled-components";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";
import CommonTextarea from "../common/commonTextarea";
import { useState } from "react";
import CompleteBtn from "../common/completeBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setTag } from "../../redux/slice/addRoutineSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface lastEditPageData {
  routine_key: number;
}

const EditRoutine3: React.FC<lastEditPageData> = ({ routine_key }) => {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.addRoutine.title);
  const gender = useSelector((state: RootState) => state.addRoutine.gender);
  const skin = useSelector((state: RootState) => state.addRoutine.skin);
  const age = useSelector((state: RootState) => state.addRoutine.age);
  const problem = useSelector((state: RootState) => state.addRoutine.problem);
  const grade = useSelector((state: RootState) => state.addRoutine.grade);
  const navigate = useNavigate();
  const routineItem = useSelector(
    (state: RootState) => state.addRoutine.routineItem
  );
  console.log("sadf", routineItem);
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

    // const filterRoutineItems = routineItem.map(({ item_name, ...rest }) => ({
    //   ...rest,
    // }));

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
      const response = await axios.put(
        `${backPort}/api/routine/${routine_key}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/routine");
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
export default EditRoutine3;

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
