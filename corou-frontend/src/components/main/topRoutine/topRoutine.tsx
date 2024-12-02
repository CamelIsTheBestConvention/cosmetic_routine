import styled from "styled-components";
import TopRoutineTitle from "./topRoutineTitle";
import TopRoutineBox from "./topRoutineBox";

const TopRoutine: React.FC = () => {
  return (
    <>
      <TopRoutineWrapper>
        <TopRoutineTitle />
        <TopRoutineBox />
      </TopRoutineWrapper>
    </>
  );
};
export default TopRoutine;

const TopRoutineWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  /* overflow-x: hidden; */
`;
