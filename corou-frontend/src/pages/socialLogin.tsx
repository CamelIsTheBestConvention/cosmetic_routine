import BackHeader from "../components/common/backHeader";
import LoginTitle from "../components/login/loginTitle";
import OtherBtn from "../components/login/otherBtn";
import SocialKakao from "../components/login/socialKakao";

const SocialLogin: React.FC = () => {
  return (
    <>
      <BackHeader onBack={""} />
      <LoginTitle />
      <SocialKakao />
      <OtherBtn />
    </>
  );
};
export default SocialLogin;
