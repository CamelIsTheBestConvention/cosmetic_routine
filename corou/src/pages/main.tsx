import MainFooter from "../components/common/mainFooter";
import MainHeader from "../components/common/mainHeader";
import MainAd from "../components/main/ad/mainAd";
import TopRoutine from "../components/main/topRoutine/topRoutine";
import TypeRoutine from "../components/main/typeRoutine/typeRoutine";
import UsingItem from "../components/main/usingItem/usingItem";

const Main = () => {
  return (
    <>
      <MainHeader />
      <TopRoutine />
      <TypeRoutine />
      <UsingItem />
      <MainAd />
      <MainFooter />
    </>
  );
};
export default Main;
