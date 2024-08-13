import styled from "styled-components";
import BannerBox from "./bannerBox";

const TypeRoutineBox: React.FC = () => {
  return (
    <>
      <TypeRoutineBanner>
        <BannerBox />
        <BannerBox />
        <BannerBox />
      </TypeRoutineBanner>
    </>
  );
};
export default TypeRoutineBox;

const TypeRoutineBanner = styled.div`
  width: 100vw;
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
`;
