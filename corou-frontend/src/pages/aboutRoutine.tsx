import { useNavigate } from "react-router-dom";
import DropdownFilter from "../components/about/dropdownFilter";
import FilterList from "../components/about/FilterList";
import SkinFilter from "../components/about/skinFilter";
import AboutHeader from "../components/common/aboutHeader";
import MainFooter from "../components/common/mainFooter";

const AboutRoutine: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AboutHeader Title={"루틴"} onBack={handleBack} />
      <SkinFilter />
      <DropdownFilter />
      <FilterList />
      <MainFooter />
    </>
  );
};
export default AboutRoutine;
