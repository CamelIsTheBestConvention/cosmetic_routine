import { useNavigate } from "react-router-dom";

const MainLogo = () => {
  const navigate = useNavigate();

  const handleMainPage = () => {
    navigate("/");
  };

  return (
    <>
      <div className="mainLogo" onClick={handleMainPage}>
        corou
      </div>
    </>
  );
};
export default MainLogo;
