import styled from "styled-components";
import CategoryBox from "./categoryBox";
import cartLogo from "../../img/cart.png";
import itemLogo from "../../img/item.png";
import homeLogo from "../../img/home.png";
import mypageLogo from "../../img/mypage.png";

const MainFooter = () => {
  return (
    <>
      <FooterWrapper>
        <FooterCategory>
          <CategoryBox imgName={itemLogo} alt="제품" title="제품" />
          <CategoryBox imgName={homeLogo} alt="홈" title="홈" />
          <CategoryBox imgName={cartLogo} alt="장바구니" title="장바구니" />
          <CategoryBox
            imgName={mypageLogo}
            alt="마이페이지"
            title="마이페이지"
          />
        </FooterCategory>
      </FooterWrapper>
      <Space></Space>
    </>
  );
};
export default MainFooter;

const FooterWrapper = styled.div`
  width: 40%;
  min-width: 430px;
  border-top: 3px solid #d9d9d9;
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 1000;
`;

const FooterCategory = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
`;

const Space = styled.div`
  height: 80px;
  /* margin-top: 30px; */
`;
