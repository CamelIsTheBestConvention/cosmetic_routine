import styled from "styled-components";

const BackHeader = () => {
  return (
    <>
      <BackBtnWrapper>
        <div>←</div>
      </BackBtnWrapper>
    </>
  );
};
export default BackHeader;

const BackBtnWrapper = styled.div`
  position: absolute;
  left: 5%;
  font-size: 20px;
  top: 2%;
`;
