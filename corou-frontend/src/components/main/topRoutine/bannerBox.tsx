import styled from "styled-components";
import TopRoutineBoxImg from "./topRoutineBoxImg";
import TopRoutineBoxInfo from "./topRoutineBoxInfo";

const BannerBox: React.FC = () => {
  return (
    <>
      <BannerBoxWrapper>
        {/* 이미지 */}
        <TopRoutineBoxImg />
        {/* 정보 */}
        <TopRoutineBoxInfo />
      </BannerBoxWrapper>
    </>
  );
};
export default BannerBox;

const BannerBoxWrapper = styled.div`
  width: 300px;
  height: 400px;
  border: 3px solid #ffa4e4;
  border-radius: 20px;
  margin-right: 20px;
`;
