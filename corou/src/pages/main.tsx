import MainFooter from "../components/common/mainFooter";
import MainHeader from "../components/common/mainHeader";
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
      <MainFooter />
    </>
  );
};
export default Main;
