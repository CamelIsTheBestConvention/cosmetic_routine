import BackHeader from "../components/common/backHeader";
import EmailLoginBox from "../components/login/emailLoginBox";
import LoginTitle from "../components/login/loginTitle";

const EmailLogin: React.FC = () => {
  return (
    <>
      <BackHeader onBack={""} />
      <LoginTitle />
      <EmailLoginBox />
    </>
  );
};
export default EmailLogin;
