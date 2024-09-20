import { useNavigate } from "react-router-dom";
import MainFooter from "../components/common/mainFooter";
import AboutHeader from "../components/common/aboutHeader";

const SetAddress: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AboutHeader Title="배송지 관리" onBack={handleBack} />
      <div></div>
      <MainFooter />
    </>
  );
};
export default SetAddress;
