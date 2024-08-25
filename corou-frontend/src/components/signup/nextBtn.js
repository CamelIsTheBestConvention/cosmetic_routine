import styled from "styled-components";

const NextBtn = ({ onClick }) => {
  return (
    <>
      <NextBtnCss onClick={onClick}>다음</NextBtnCss>
    </>
  );
};
export default NextBtn;

const NextBtnCss = styled.button`
  width: 100%;
  background-color: rgba(255, 164, 228, 0.7);
  border: none;
  border-radius: 10px;
  padding: 10px 0;
  margin-top: 20px;
  outline: none;
  font-size: 14px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;
