import styled from "styled-components";

const CompleteBtn = ({ text }) => {
  return (
    <>
      <CompleteBtnCss>{text}</CompleteBtnCss>
    </>
  );
};
export default CompleteBtn;

const CompleteBtnCss = styled.button`
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
