import styled from "styled-components";

const TypeRoutineTitle: React.FC = () => {
  return (
    <>
      <TopRoutineTitleWrapper>
        <TitleWrapper>
          <h2>미새님 피부 타입 맞춤 루틴</h2>
          <span>더보기 →</span>
        </TitleWrapper>
      </TopRoutineTitleWrapper>
    </>
  );
};
export default TypeRoutineTitle;

const TopRoutineTitleWrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ffa4e4;

  h2 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 5px;
  }

  span {
    color: #7d7d7d;
    margin: auto 0;
    margin-bottom: 5px;
    font-size: 12px;
  }
`;
