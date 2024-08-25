import styled from "styled-components";

const MainHeader = () => {
  return (
    <>
      <SearchWrapper>
        <Search>
          <input type="text" placeholder="검색어를 입력하세요." />
        </Search>
      </SearchWrapper>
      <Space></Space>
    </>
  );
};
export default MainHeader;

const SearchWrapper = styled.div`
  width: 30%;
  min-width: 430px;
  position: fixed;
  top: 0;
  padding-top: 20px;
  background-color: white;
`;

const Search = styled.div`
  width: 80%;
  margin: 0 auto 10px auto;
  background-color: #f3f3f3;
  padding: 5px 0;
  border-radius: 20px;
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

const Space = styled.div`
  height: 60px;
  /* margin-top: 30px; */
`;
