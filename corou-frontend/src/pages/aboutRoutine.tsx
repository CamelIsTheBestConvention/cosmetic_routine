import { useNavigate } from "react-router-dom";
import DropdownFilter from "../components/about/dropdownFilter";
import FilterList from "../components/about/FilterList";
import SkinFilter from "../components/about/skinFilter";
import AboutHeader from "../components/common/aboutHeader";
import MainFooter from "../components/common/mainFooter";
import SearchBar from "../components/common/searchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ResetFilter from "../components/common/resetFilter";

interface skinRelations {
  attr_key: number;
}

interface routineItem {
  routine_key: string;
  for_age: number;
  for_gender: string;
  isLiked: boolean;
  price_total: number;
  average_rating: number;
  routine_name: string;
  reviews: number;
  user: { username: string };
  tags: string[];
  routine_skin_relations: skinRelations[];
}

const AboutRoutine: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterList, setFilterList] = useState<number[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const [priceFilterValue, setPriceFilterValue] = useState<number[]>([]);
  const [amountFilterValue, setAmountFilterValue] = useState<number[]>([]);
  const [items, setItems] = useState<routineItem[]>([]);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [minCount, setMinCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(100);
  const [itemAmount, setItemAmount] = useState<number>(0);
  const [selectedSkinType, setSelectedSkinType] = useState<number | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const updateSkinFilter = (skinType: number | null) => {
    setFilterList((prevFilters) => {
      const updatedFilters = prevFilters.filter((filter) => filter > 5);
      if (skinType !== null && !updatedFilters.includes(skinType)) {
        const sortFilter = [...updatedFilters, skinType];
        return sortFilter.sort((a, b) => a - b);
      }
      return updatedFilters.sort((a, b) => a - b);
    });
  };

  const updateDropdownFilter = (dropdownFilters: number[]) => {
    setSelectedFilters(dropdownFilters);
    setFilterList((prevFilters) => {
      const updatedFilters = prevFilters.filter((filter) => filter <= 5);
      const newFilters = [...updatedFilters, ...dropdownFilters];
      return newFilters.sort((a, b) => a - b);
    });
  };

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_PORT}/api/routine`
      );
      console.log("음", response.data);
      setItems(response.data);
    };

    fetchItems();

    console.log(minCount);
    console.log(maxCount);
    console.log(minPrice);
    console.log(maxPrice);
  }, [minCount, maxCount, minPrice, maxPrice]);

  const resetFilter = () => {
    setSearchQuery("");
    setFilterList([]);
    setSelectedFilters([]);
    setMinPrice(1);
    setMaxPrice(Infinity);
    setMinCount(1);
    setMaxCount(100);
    setItemAmount(0);
    setSelectedSkinType(null);
  };

  return (
    <>
      <AboutHeader Title={"루틴"} onBack={handleBack} />
      <SearchBar onSearch={handleSearch} />
      <ResetFilter resetFilter={resetFilter} />
      <SkinFilter
        onSkinChange={updateSkinFilter}
        selectedSkinType={selectedSkinType}
        setSelectedSkinType={setSelectedSkinType}
      />
      <DropdownFilter
        onFilterChange={updateDropdownFilter}
        selectedFilters={selectedFilters}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minCount={minCount}
        setMinCount={setMinCount}
        maxCount={maxCount}
        setMaxCount={setMaxCount}
      />
      <FilterList
        searchQuery={searchQuery}
        filters={filterList}
        items={items}
        setItems={setItems}
        minPrice={minPrice}
        maxPrice={maxPrice}
        minCount={minCount}
        maxCount={maxCount}
        itemAmount={itemAmount}
      />
      <MainFooter />
    </>
  );
};
export default AboutRoutine;
