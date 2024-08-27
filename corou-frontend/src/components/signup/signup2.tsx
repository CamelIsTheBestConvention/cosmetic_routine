import styled from "styled-components";
import BackHeader from "../common/backHeader";
import SignupCount from "./signupCount";
import SignupGuide from "./signupGuide";
import CommonInput from "../common/commonInput";
import NextBtn from "./nextBtn";
import { useState } from "react";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";

interface NextProps {
  onNext: () => void;
}

const Signup2: React.FC<NextProps> = ({ onNext }) => {
  const [nickname, setNickname] = useState("");

  return (
    <>
      <Signup2Wrapper>
        <SignupBox>
          <PageCount count="2"/>
          <PageGuide text="닉네임을 설정해주세요" />
          <NicknameBox>
            <CommonInput
              typeValue="text"
              placeholderValue="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <NickCheckWrapper>
              <NicknameCheck>사용할 수 있는 닉네임이에요</NicknameCheck>
              <span>0/10</span>
            </NickCheckWrapper>
            <NickCheckWrapper>
              <NicknameCheck>사용할 수 없는 닉네임이에요</NicknameCheck>
              <span>10/10</span>
            </NickCheckWrapper>
            <RandomCreate>랜덤 생성</RandomCreate>
          </NicknameBox>
          <NextBtn onClick={onNext} />
        </SignupBox>
      </Signup2Wrapper>
    </>
  );
};
export default Signup2;

const Signup2Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SignupBox = styled.div`
  width: 100%;
  margin: 50px auto;
`;

const NicknameBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const NicknameCheck = styled.div`
  font-size: 11px;
  margin-left: 10px;
  color: #585858;
`;

const NickCheckWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 10px;
  }
`;

const RandomCreate = styled.button`
  width: 30%;
  border: 1px solid #b0b0b0;
  border-radius: 5px;
  background-color: white;
  color: #848484;
  font-size: 10px;
  font-weight: bold;
  margin: 10px 0;
  padding: 3px 0;
`;
