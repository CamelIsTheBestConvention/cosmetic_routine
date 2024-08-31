import styled from "styled-components";

const SearchBar: React.FC = () => {
  return (
    <>
      <SearchWrapper>
        <Search>
          <input type="text" placeholder="검색어를 입력하세요." />
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
  justify-content: center;

  input {
    width: 90%;
    padding: 8px 0;
    font-size: 1.1rem;
    border: none;
    outline: none;
    background-color: inherit;
  }
`;
