import { useState } from "react";
import styled from "styled-components";
import searchIcon from "../../img/search.png";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  return (
    <>
      <SearchWrapper>
        <Search>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <div onClick={handleSearchClick}>
            <img src={searchIcon} alt="검색아이콘" />
          </div>
        </Search>
      </SearchWrapper>
    </>
  );
};
export default SearchBar;

const SearchWrapper = styled.div`
  width: 100%;
`;

const Search = styled.div`
  width: 80%;
  margin: 0 auto 10px auto;
  background-color: #f3f3f3;
  padding: 5px 0;
  border-radius: 25px;
  display: flex;
  position: relative;

  input {
    width: 80%;
    padding: 8px 0;
    font-size: 1.1rem;
    border: none;
    outline: none;
    background-color: inherit;
    margin-left: 20px;
  }

  div {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 12px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
