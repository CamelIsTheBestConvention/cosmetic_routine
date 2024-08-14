import styled from "styled-components";
import AdTitle from "./adTitle";
import AdBox from "./adBox";

const MainAd: React.FC = () => {
  return (
    <>
      <AdWrapper>
        <AdTitle />
        <AdBox />
      </AdWrapper>
    </>
  );
};
export default MainAd;

const AdWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
