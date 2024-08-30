import styled from "styled-components";
import AboutHeader from "../components/common/aboutHeader";
import Profile from "../components/mypage/profile";
import Option from "../components/mypage/option";

const Mypage: React.FC = () => {
  const handleBack = () => {
    return 
  }

  return (
    <>
      <MypageWrapper>
        <AboutHeader Title={"마이페이지"} onBack={handleBack} />
        <Profile />
        <Option />
      </MypageWrapper>
    </>
  );
};
export default Mypage;

const MypageWrapper = styled.div`
  width: 100%;
`;
