import AboutHeader from "../components/common/aboutHeader";
import BuyBtn from "../components/mart/buyBtn";
import Caution from "../components/mart/caution";
import MartList from "../components/mart/martList";
import PriceList from "../components/mart/priceList";

const Mart: React.FC = () => {
  return (
    <>
      <AboutHeader Title={"장바구니"} />
      <MartList />
      <PriceList />
      <Caution />
      <BuyBtn />
    </>
  );
};
export default Mart;
