import styled from "styled-components";

const BackHeader = ({ onBack }) => {
  return (
    <>
      <BackBtnWrapper onClick={onBack}>
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
  top: 10px;
`;
