import styled from "styled-components";
import BackHeader from "./backHeader";

const AboutHeader = ({ Title }) => {
  return (
    <>
      <AboutHeaderWrapper>
        <BackHeader onBack={""} />
        <h2>{Title}</h2>
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
