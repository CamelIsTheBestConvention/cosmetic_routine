import axios from "axios";
import { useState } from "react";
import AboutHeader from "../components/common/aboutHeader";
import { useNavigate } from "react-router-dom";
import CommonInput from "../components/common/commonInput";
import styled from "styled-components";
import CompleteBtn from "../components/common/completeBtn";
import PwVisible from "../components/common/pwVisible";
import MainFooter from "../components/common/mainFooter";

const PwChange: React.FC = () => {
  const token = sessionStorage.getItem("authToken");
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const userKey = sessionStorage.getItem("userKey");
  const navigate = useNavigate();
  const [currentPw, setCurrentPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [newPwCheck, setNewPwCheck] = useState<string>("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  const handlePasswordChange = async () => {
    try {
      const response = await axios.put(
        `${backPort}/api/user/${userKey}/changepassword`,
        {
          currentPassword: currentPw,
          newPassword: newPw,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/mypage/profileEdit");
    } catch (error) {
      console.error("비밀번호 변경 중 에러", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AboutHeader Title="비밀번호 변경" onBack={handleBack} />
      <PwChangeWrapper>
        <PwChangeBox>
          <span>현재 비밀번호 : </span>
          <div>
            <CommonInput
              typeValue={showCurrentPw ? "text" : "password"}
              value={currentPw}
              placeholderValue="현재 비밀번호를 입력해주세요."
              onChange={(e) => setCurrentPw(e.target.value)}
            />
          </div>
        </PwChangeBox>
        <PwVisibleBox>
          <PwVisible onToggle={setShowCurrentPw} />
        </PwVisibleBox>
        <PwChangeBox>
          <span>새 비밀번호 : </span>
          <div>
            <CommonInput
              typeValue={showNewPw ? "text" : "password"}
              value={newPw}
              placeholderValue="새 비밀번호를 입력해주세요."
              onChange={(e) => setNewPw(e.target.value)}
            />
          </div>
        </PwChangeBox>
        <PwChangeBox>
          <span>새 비밀번호 확인 : </span>
          <div>
            <CommonInput
              typeValue={showNewPw ? "text" : "password"}
              value={newPwCheck}
              placeholderValue="새 비밀번호를 확인해주세요."
              onChange={(e) => setNewPwCheck(e.target.value)}
            />
          </div>
        </PwChangeBox>
        <PwVisibleBox>
          <PwVisible onToggle={setShowNewPw} />
        </PwVisibleBox>
        <CompleteBtn
          onClick={handlePasswordChange}
          text="변경"
          disabled={false}
        />
      </PwChangeWrapper>
      <MainFooter />
    </>
  );
};
export default PwChange;

const PwChangeWrapper = styled.div`
  width: 90%;
  margin: 30px auto;
`;

const PwChangeBox = styled.div`
  width: 100%;
  display: flex;

  span {
    width: 30%;
    font-weight: 700;
    line-height: 2.5;
    text-align: right;
    margin-right: 10px;
  }

  div {
    width: 65%;
  }
`;

const PwVisibleBox = styled.div`
  width: 35%;
  margin: 0 auto 10px auto;
`;
