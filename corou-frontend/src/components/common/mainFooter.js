import styled from "styled-components";
import CategoryBox from "./categoryBox";
import cartLogo from "../../img/cart.png";
import itemLogo from "../../img/item.png";
import homeLogo from "../../img/home.png";
import mypageLogo from "../../img/mypage.png";
import routineLogo from "../../img/routine.png";
import { useNavigate } from "react-router-dom";

const MainFooter = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");

  const handleMoveItem = () => {
    navigate("/item");
  };

  const handleMoveRoutine = () => {
    navigate("/routine");
  };

  const handleMoveHome = () => {
    navigate("/");
  };

  const handleMoveOrder = () => {
    if (!token) {
      if (
        confirm(
          "로그인 정보가 없어 장바구니로 이동할 수 없습니다.\n로그인 페이지로 이동하시겠습니까?"
        )
      ) {
        navigate("/login");
      }
    } else {
      navigate("/order");
    }
  };

  const handleMoveMypage = () => {
    navigate("/mypage");
  };

  return (
    <>
      <FooterWrapper>
        <FooterCategory>
          <CategoryBox
            onClick={handleMoveItem}
            imgName={itemLogo}
            alt="제품"
            title="제품"
          />
          <CategoryBox
            onClick={handleMoveRoutine}
            imgName={routineLogo}
            alt="루틴"
            title="루틴"
          />
          <CategoryBox
            onClick={handleMoveHome}
            imgName={homeLogo}
            alt="홈"
            title="홈"
          />
          <CategoryBox
            onClick={handleMoveOrder}
            imgName={cartLogo}
            alt="장바구니"
            title="장바구니"
          />
          <CategoryBox
            onClick={handleMoveMypage}
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
  width: 30%;
  min-width: 430px;
  border-top: 3px solid #d9d9d9;
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 1000;
`;

const FooterCategory = styled.div`
  width: 100%;
  margin-top: 5px;
  margin-bottom: -5px;
  display: flex;
  justify-content: space-around;
`;

const Space = styled.div`
  height: 80px;
  /* margin-top: 30px; */
`;
