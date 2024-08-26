import DropdownFilter from "../components/about/dropdownFilter";
import FilterList from "../components/about/FilterList";
import SkinFilter from "../components/about/skinFilter";
import AboutHeader from "../components/common/aboutHeader";

const AboutRoutine: React.FC = () => {
  return (
    <>
      <AboutHeader Title={"루틴"} />
      <SkinFilter />
      <DropdownFilter />
      <FilterList />
    </>
  );
};
export default AboutRoutine;
