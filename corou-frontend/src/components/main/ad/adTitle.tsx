import styled from "styled-components";

const AdTitle: React.FC = () => {
  return (
    <>
      <AdTitleWrapper>
        <h2>이런 제품은 어떠세요?</h2>
      </AdTitleWrapper>
    </>
  );
};
export default AdTitle;

const AdTitleWrapper = styled.div`
  width: 100%;

  h2 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;
