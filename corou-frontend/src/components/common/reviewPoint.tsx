import styled from "styled-components";
import Star from "../../img/star.png";

const ReviewPoint: React.FC = () => {
  return (
    <>
      <ReviewPointWrapper>
        <img src={Star} alt="평점" />
        <span>
          4.9 <span>(1,192)</span>
        </span>
      </ReviewPointWrapper>
    </>
  );
};
export default ReviewPoint;

const ReviewPointWrapper = styled.div`
  display: flex;
  flex-direction: row !important;
  margin-top: 10px;

  img {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }

  span {
    font-size: 14px !important;
    font-weight: bold;

    span {
      font-size: 14px;
      font-weight: normal;
      color: #909090;
    }
  }
`;
