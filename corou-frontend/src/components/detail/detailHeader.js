import styled from "styled-components";
import BackHeader from "../common/backHeader";
import goodOff from "../../img/goodOff.png";
import goodOn from "../../img/goodOff.png";

const DetailHeader = () => {
  return (
    <>
      <DetailHeaderWrapper>
        <BackHeader />
        <img src={goodOff} alt="좋아요" />
      </DetailHeaderWrapper>
    </>
  );
};
export default DetailHeader;

const DetailHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  img {
    width: 20px;
    margin: 15px;
  }
`;
