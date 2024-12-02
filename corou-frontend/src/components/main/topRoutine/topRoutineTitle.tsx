import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopRoutineTitle: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/routine");
  };

  return (
    <>
      <TopRoutineTitleWrapper>
        <TitleWrapper>
          <h2>TOP 10 루틴</h2>
          <span onClick={handleNavigate}>
            더보기 <span>→</span>
          </span>
        </TitleWrapper>
      </TopRoutineTitleWrapper>
    </>
  );
};
export default TopRoutineTitle;

const TopRoutineTitleWrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ffa4e4;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 5px;
  }

  span {
    color: #7d7d7d;
    margin: auto 0;
    margin-bottom: 5px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }
`;
