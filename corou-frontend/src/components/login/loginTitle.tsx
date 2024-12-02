import { useNavigate } from "react-router-dom";
import "../../scss/login/loginTitle.scss";
import MainLogo from "../common/mainLogo";

const LoginTitle: React.FC = () => {
  return (
    <>
      <div className="loginTitleWrapper">
        <MainLogo />
        <div className="catchphrase">
          <span>건강한 피부가 최고의 기초입니다.</span>
          <span>당신의 루틴은 무엇인가요?</span>
        </div>
      </div>
    </>
  );
};
export default LoginTitle;
