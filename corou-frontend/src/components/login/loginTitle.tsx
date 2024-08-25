import "../../scss/login/loginTitle.scss";

const LoginTitle: React.FC = () => {
  return (
    <>
      <div className="loginTitleWrapper">
        <div className="logo">corou</div>
        <div className="catchphrase">
          <span>캐치프레이즈 여기 넣어주세요.</span>
          <span>데일리 루틴 짱짱맨</span>
        </div>
      </div>
    </>
  );
};
export default LoginTitle;
