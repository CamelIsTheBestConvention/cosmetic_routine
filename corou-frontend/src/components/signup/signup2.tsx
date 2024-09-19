import styled from "styled-components";
import CommonInput from "../common/commonInput";
import NextBtn from "./nextBtn";
import { useState } from "react";
import PageCount from "../common/pageCount";
import PageGuide from "../common/pageGuide";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../../redux/slice/signupSlice";
import { RootState } from "../../redux/store";
import { animals, colors } from "../../data/Data";
import axios from "axios";

interface NextProps {
  onStepChange: (step: number) => void;
}

const Signup2: React.FC<NextProps> = ({ onStepChange }) => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.signup.username);
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const handleNicknameCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = /^[a-zA-Z0-9가-힣]*$/.test(value);

    dispatch(setUsername(value));

    if (value.length <= 10 && value.length > 0 && isValid) {
      setUsernameValid(true);
    } else {
      setUsernameValid(false);
    }
  };

  const handleRandomNickname = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    const randomNickname = `${randomColor}${randomAnimal}`;

    dispatch(setUsername(randomNickname));
    setUsernameValid(true);
  };

  const handleNicknameDuplicationCheck = async () => {
    try {
      const response = await axios.get(
        `${backPort}/api/user/checkusername/${username}`
      );
      const message = response.data.message;
      console.log("dfd", message);

      if (message === "이미 사용중인 닉네임입니다.") {
        return true;
      } else if (message === "사용 가능한 닉네임입니다.") {
        return false;
      }
    } catch (error) {
      console.error("닉네임 중복 확인 중 오류", error);
      return true;
    }
  };

  const handleNext = async () => {
    if (!usernameValid) return;

    const isDuplicated = await handleNicknameDuplicationCheck();

    if (isDuplicated) {
      alert("이미 사용중인 닉네임입니다.");
    } else {
      onStepChange(3);
    }
  };

  return (
    <>
      <Signup2Wrapper>
        <SignupBox>
          <PageCount count="2" />
          <PageGuide text="닉네임을 설정해주세요" />
          <NicknameBox>
            <CommonInput
              typeValue="text"
              placeholderValue="닉네임"
              value={username}
              onChange={handleNicknameCheck}
            />
            {usernameValid !== null && (
              <NickCheckWrapper>
                <NicknameCheck valid={usernameValid}>
                  {usernameValid
                    ? "사용할 수 있는 닉네임입니다."
                    : "사용할 수 없는 닉네임입니다."}
                </NicknameCheck>
                <span>{username.length}/10</span>
              </NickCheckWrapper>
            )}
            <RandomCreate onClick={handleRandomNickname}>
              랜덤 생성
            </RandomCreate>
          </NicknameBox>
          <NextBtn onClick={handleNext} disabled={!usernameValid} />
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

const NicknameCheck = styled.div<{ valid: boolean }>`
  font-size: 11px;
  margin-left: 10px;
  color: ${(props) => (props.valid ? "green" : "red")};
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
