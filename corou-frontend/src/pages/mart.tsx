import { useLocation, useNavigate } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import BuyBtn from "../components/mart/buyBtn";
import Caution from "../components/mart/caution";
import MartList from "../components/mart/martList";
import PriceList from "../components/mart/priceList";
import MainFooter from "../components/common/mainFooter";

const Mart: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemList } = location.state || { itemList: [] };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AboutHeader Title={"장바구니"} onBack={handleBack} />
      <MartList itemList={itemList} />
      <PriceList itemList={itemList} />
      <Caution />
      <BuyBtn />
      <MainFooter />
    </>
  );
};
export default Mart;
