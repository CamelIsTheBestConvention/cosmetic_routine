import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TypeRoutineTitle: React.FC = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("userName");
  const token = sessionStorage.getItem("authToken");

  const handleNavigate = () => {
    navigate("/routine");
  };

  return (
    <>
      <TopRoutineTitleWrapper>
        <TitleWrapper>
          <h2>{token ? `${username}` : "OO"}님 피부 타입 맞춤 루틴</h2>
          <span onClick={handleNavigate}>
            더보기 <span>→</span>
          </span>
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
    font-size: 1.2rem;
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
