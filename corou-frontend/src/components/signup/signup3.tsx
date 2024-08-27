import styled from "styled-components";
import BackHeader from "../common/backHeader";
import SignupCount from "./signupCount";
import SignupGuide from "./signupGuide";
import CommonInput from "../common/commonInput";
import { useState } from "react";
import CommonCheckBox from "./commonCheckbox";
import CommonRadioBox from "./commonRadiobox";
import CompleteBtn from "./completeBtn";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";

const Signup3: React.FC = () => {
  const [nickname, setNickname] = useState("");

  return (
    <>
      <Signup3Wrapper>
        <SignupBox>
          <PageCount count="3" />
          <PageGuide text="태어난 연도를 알려주세요" />
          <CommonInput
            typeValue="text"
            placeholderValue="예) 1995"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <SignupGuide text="성별을 선택해주세요" />
          <GenderBox>
            <CommonRadioBox label="남자" name="gender" />
            <CommonRadioBox label="여자" name="gender" />
          </GenderBox>
          <SignupGuide text="어떤 피부 타입인가요?" />
          <SkinBox1>
            <CommonRadioBox label="건성" name="skin" />
            <CommonRadioBox label="중성" name="skin" />
            <CommonRadioBox label="지성" name="skin" />
          </SkinBox1>
          <SkinBox2>
            <CommonRadioBox label="복합성" name="skin" />
            <CommonRadioBox label="수부지" name="skin" />
          </SkinBox2>
          <SignupGuide text="퍼스널컬러를 골라주세요" />
          <ColorBox1>
            <CommonRadioBox label="봄웜톤" name="color" />
            <CommonRadioBox label="여름쿨톤" name="color" />
            <CommonRadioBox label="가을웜톤" name="color" />
            <CommonRadioBox label="겨울쿨톤" name="color" />
          </ColorBox1>
          <ColorBox2>
            <CommonRadioBox label="잘 모르겠어요.." name="color" />
          </ColorBox2>
          <SignupGuide text="피부 고민이 있나요?" />
          <TroubleBox>
            <CommonCheckBox label="아토피" />
            <CommonCheckBox label="여드름" />
            <CommonCheckBox label="민감성" />
            <CommonCheckBox label="홍조" />
            <CommonCheckBox label="각질" />
            <CommonCheckBox label="속건조" />
            <CommonCheckBox label="등" />
            <CommonCheckBox label="등등" />
            <CommonCheckBox label="등등등" />
          </TroubleBox>
          <CompleteBtn />
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
