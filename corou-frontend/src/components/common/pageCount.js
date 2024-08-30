import styled from "styled-components";

const PageCount = ({ count }) => {
  return (
    <>
      <CountDiv>{count}/3</CountDiv>
    </>
  );
};
export default PageCount;

const CountDiv = styled.div`
  text-align: center;
  width: 10%;
  background-color: #c9c9c9;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  padding: 0 12px;
`;
