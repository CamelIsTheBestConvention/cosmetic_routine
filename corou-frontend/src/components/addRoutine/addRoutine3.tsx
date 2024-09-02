import styled from "styled-components";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";
import CommonTextarea from "../common/commonTextarea";
import { useState } from "react";
import CompleteBtn from "../common/completeBtn";

const AddRoutine3: React.FC = () => {
  const [tag, setTag] = useState<string[]>([]);

  const tagChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const tagArr = value.split(/[\s,]+/).filter((tag) => tag.trim() !== "");
    setTag(tagArr);
  };

  return (
    <>
      <AddRoutine3Wrapper>
        <PageCount count="3" />
        <PageGuide text="태그를 등록해주세요" />
        <CommonTextarea value={tag.join(", ")} onChange={tagChange} />
        <span>스페이스 또는 쉼표(,)로 구분해주세요</span>
        {/* <CompleteBtn text="등록" onClick={onClick} /> */}
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
