import DropdownFilter from "../components/about/dropdownFilter";
import FilterList from "../components/about/FilterList";
import SkinFilter from "../components/about/skinFilter";
import AboutHeader from "../components/common/aboutHeader";

const AboutRoutine: React.FC = () => {
  const handleBack = () => {
    return 
  }

  return (
    <>
      <AboutHeader Title={"루틴"} onBack={handleBack} />
      <SkinFilter />
      <DropdownFilter />
      <FilterList />
    </>
  );
};
export default AboutRoutine;
