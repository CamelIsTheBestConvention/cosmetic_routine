import styled from "styled-components";

const PwVisible = () => {
  return (
    <>
      <PwVisibleWrapper>
        <input type="checkbox" />
        <span>비밀번호 표시</span>
      </PwVisibleWrapper>
    </>
  );
};
export default PwVisible;

const PwVisibleWrapper = styled.div`
  font-size: 12px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  margin-top: -10px;
`;
