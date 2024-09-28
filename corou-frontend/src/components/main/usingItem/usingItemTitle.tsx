import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UsingItemTitle: React.FC = () => {
  const navigate = useNavigate();

  const handleItemPage = () => {
    navigate("/item");
  };

  return (
    <>
      <UsingItemTitleWrapper>
        <TitleWrapper>
          <h2>루틴에 가장 많이 사용된 제품</h2>
          <span onClick={handleItemPage}>더보기 →</span>
        </TitleWrapper>
      </UsingItemTitleWrapper>
    </>
  );
};
export default UsingItemTitle;

const UsingItemTitleWrapper = styled.div`
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
