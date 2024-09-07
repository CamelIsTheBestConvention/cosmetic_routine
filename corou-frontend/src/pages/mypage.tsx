import styled from "styled-components";
import AboutHeader from "../components/common/aboutHeader";
import Profile from "../components/mypage/profile";
import Option from "../components/mypage/option";
import MainFooter from "../components/common/mainFooter";
import { useNavigate } from "react-router-dom";

const Mypage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <MypageWrapper>
        <AboutHeader Title={"마이페이지"} onBack={handleBack} />
        <Profile />
        <Option />
        <MainFooter />
      </MypageWrapper>
    </>
  );
};
export default Mypage;

const MypageWrapper = styled.div`
  width: 100%;
`;
