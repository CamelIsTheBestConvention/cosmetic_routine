import { useNavigate } from "react-router-dom";
import BackHeader from "../components/common/backHeader";
import EmailLoginBox from "../components/login/emailLoginBox";
import LoginTitle from "../components/login/loginTitle";

const EmailLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <>
      <BackHeader onBack={handleBackPage} />
      <LoginTitle />
      <EmailLoginBox />
    </>
  );
};
export default EmailLogin;
