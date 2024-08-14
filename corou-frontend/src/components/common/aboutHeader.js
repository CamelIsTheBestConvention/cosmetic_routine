import styled from "styled-components";

const AboutHeader = () => {
  return (
    <>
      <AboutHeaderWrapper>
        <div>←</div>
        <h2>루틴</h2>
      </AboutHeaderWrapper>
    </>
  );
};
export default AboutHeader;

const AboutHeaderWrapper = styled.div`
  width: 100%;
  padding: 10px 0;

  div {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 2rem;
    margin-left: 10px;
    align-items: center;
    padding: 10px 0;
  }

  h2 {
    text-align: center;
    line-height: 1.7;
    margin: 0;
  }
`;
