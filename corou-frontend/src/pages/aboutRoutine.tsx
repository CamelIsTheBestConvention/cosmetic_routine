import { useNavigate } from "react-router-dom";
import DropdownFilter from "../components/about/dropdownFilter";
import FilterList from "../components/about/FilterList";
import SkinFilter from "../components/about/skinFilter";
import AboutHeader from "../components/common/aboutHeader";
import MainFooter from "../components/common/mainFooter";
import SearchBar from "../components/common/searchBar";
import { useState } from "react";

const AboutRoutine: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AboutHeader Title={"루틴"} onBack={handleBack} />
      <SearchBar onSearch={handleSearch} />
      <SkinFilter />
      <DropdownFilter />
      <FilterList searchQuery={searchQuery} />
      <MainFooter />
    </>
  );
};
export default AboutRoutine;
