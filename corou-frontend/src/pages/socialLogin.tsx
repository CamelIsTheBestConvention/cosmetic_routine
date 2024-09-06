import { useNavigate } from "react-router-dom";
import BackHeader from "../components/common/backHeader";
import LoginTitle from "../components/login/loginTitle";
import OtherBtn from "../components/login/otherBtn";
import SocialKakao from "../components/login/socialKakao";

const SocialLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <BackHeader onBack={handleBack} />
      <LoginTitle />
      <SocialKakao />
      <OtherBtn />
    </>
  );
};
export default SocialLogin;
