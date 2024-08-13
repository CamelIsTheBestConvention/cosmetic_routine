import styled from "styled-components";

const BannerBox: React.FC = () => {
  return (
    <>
      <BannerBoxWrapper>
        <BannerBoxImg></BannerBoxImg>
        <BannerBoxTitle>메이크업</BannerBoxTitle>
      </BannerBoxWrapper>
    </>
  );
};
export default BannerBox;

const BannerBoxWrapper = styled.div`
  width: 200px;
  margin-right: 20px;
`;

const BannerBoxImg = styled.div`
  width: 200px;
  height: 200px;
  border: 3px solid #ffa4e4;
  border-radius: 20px;
`;

const BannerBoxTitle = styled.h2`
  text-align: center;
`;
