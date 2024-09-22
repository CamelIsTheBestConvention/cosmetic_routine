import { useNavigate } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import MainFooter from "../components/common/mainFooter";
import styled from "styled-components";
import { useState } from "react";

const Notice: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <AboutHeader Title="공지사항" onBack={handleBack} />
      <NoticeWrapper>
        <NoticeBox onClick={handleToggle} isOpen={isOpen}>
          <NoticeDate>24-09-22</NoticeDate>
          <NoticeTitle isOpen={isOpen}>
            <h2>안녕하세요. corou입니다aaaaaaaaaaaaaaaa.</h2>
          </NoticeTitle>
          <NoticeContent isOpen={isOpen}>
            안녕하세요 cosmetic-routine, corou 사이트를 오픈했습니다. 그동안
            기다려 주셔서 감사합니다. 앞으로도 꾸준한 관리를 이어가겠습니다. 더
            이상 할말은 없지만 최대한 많이 텍스트를 작성해야 테스트가 되기
            때문에 이정도로 쓰겠습니다.
          </NoticeContent>
        </NoticeBox>
      </NoticeWrapper>
      <MainFooter />
    </>
  );
};
export default Notice;

const NoticeWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const NoticeBox = styled.div<{ isOpen: boolean }>`
  width: 90%;
  height: ${({ isOpen }) => (isOpen ? "auto" : "75px")};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 2px solid #ffa4e4;
  border-radius: 12px;
  overflow: hidden;
  padding: 10px;
  cursor: pointer;
  transition: height 1s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const NoticeDate = styled.div`
  width: 100%;
  color: #848484;
  font-size: 13px;
  flex-shrink: 0;
  margin-bottom: 5px;
`;

const NoticeTitle = styled.div<{ isOpen: boolean }>`
  width: 100%;
  overflow: hidden;

  h2 {
    margin: 0;
    white-space: ${({ isOpen }) => (isOpen ? "normal" : "nowrap")};
    text-overflow: ellipsis;
    overflow: hidden;
    flex-grow: 1;
    flex-shrink: 1;
    transition: white-space 1s ease;
  }
`;

const NoticeContent = styled.div<{ isOpen: boolean }>`
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "20px")};
  margin: 5px 0;
  overflow: hidden;
  white-space: ${({ isOpen }) => (isOpen ? "normal" : "nowrap")};
  text-overflow: ellipsis;
  transition: max-height 1s ease;
`;
