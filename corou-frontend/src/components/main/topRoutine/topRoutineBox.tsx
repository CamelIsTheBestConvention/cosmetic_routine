import styled from "styled-components";
import BannerBox from "./bannerBox";

const TopRoutineBox: React.FC = () => {
  return (
    <>
      <TopRoutineBanner>
        <BannerBox />
        <BannerBox />
        <BannerBox />
      </TopRoutineBanner>
    </>
  );
};
export default TopRoutineBox;

const TopRoutineBanner = styled.div`
  width: 100vw;
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
`;
