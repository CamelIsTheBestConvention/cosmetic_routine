import styled from "styled-components";
import TypeRoutineTitle from "./typeRoutineTitle";
import TypeRoutineBox from "./typeRoutineBox";

const TypeRoutine: React.FC = () => {
  return (
    <>
      <TypeRoutineWrapper>
        <TypeRoutineTitle />
        <TypeRoutineBox />
      </TypeRoutineWrapper>
    </>
  );
};
export default TypeRoutine;

const TypeRoutineWrapper = styled.div`
  width: 80%;
  margin: 30px auto 0 auto;
  overflow-x: hidden;
`;
