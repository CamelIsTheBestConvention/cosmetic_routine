import DropdownFilter from "../components/about/dropdownFilter";
import SkinFilter from "../components/about/skinFilter";
import AboutHeader from "../components/common/aboutHeader";

const AboutRoutine: React.FC = () => {
  return (
    <>
      <AboutHeader />
      <SkinFilter />
      <DropdownFilter />
    </>
  );
};
export default AboutRoutine;
