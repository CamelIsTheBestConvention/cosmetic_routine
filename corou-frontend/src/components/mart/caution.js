import styled from "styled-components";

const Caution = () => {
  return (
    <>
      <CautionWrapper>
        <CautionDropdown>
          <span>유의 사항</span>
          <span>▽△</span>
        </CautionDropdown>

        <CautionContent>
          <ul>
            <li>블라블라</li>
            <li>블라블라</li>
            <li>블라블라</li>
            <li>블라블라</li>
            <li>블라블라</li>
            <li>블라블라</li>
            <li>블라블라</li>
          </ul>
        </CautionContent>
      </CautionWrapper>
    </>
  );
};
export default Caution;

const CautionWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
`;

const CautionDropdown = styled.div`
  width: 95%;
  margin: 0 auto;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const CautionContent = styled.div`
  width: 100%;
  background-color: #dadada;
`;
