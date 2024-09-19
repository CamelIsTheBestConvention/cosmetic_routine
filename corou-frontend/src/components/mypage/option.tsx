import styled from "styled-components";
import SettingBox from "./settingBox";
import { useNavigate } from "react-router-dom";

const Option: React.FC = () => {
  const navigate = useNavigate();

  const handleOrderList = () => {
    navigate("/mypage/orderList");
  };

  return (
    <>
      <OptionWrapper>
        <SettingWrapper1>
          <SettingBox name="주문 내역" onClick={handleOrderList} />
          <SettingBox name="취소/반품/교환 내역" onClick={handleOrderList} />
          <SettingBox name="나의 맞춤 정보" onClick={handleOrderList} />
        </SettingWrapper1>
        <SettingWrapper2>
          <SettingBox name="고객센터" onClick={handleOrderList} />
          <SettingBox name="1:1 문의 내역" onClick={handleOrderList} />
          <SettingBox name="상품 문의 내역" onClick={handleOrderList} />
          <SettingBox name="공지사항" onClick={handleOrderList} />
        </SettingWrapper2>
        <Logout>로그아웃</Logout>
      </OptionWrapper>
    </>
  );
};
export default Option;

const OptionWrapper = styled.div`
  width: 90%;
  margin: 30px auto;
`;

const SettingWrapper1 = styled.div`
  width: 100%;
  margin-bottom: 70px;
`;

const SettingWrapper2 = styled.div`
  width: 100%;
  border-bottom: 5px solid #e8e8e8;
  margin-bottom: 10px;
`;

const Logout = styled.span`
  font-size: 12px;
  color: #848484;
  text-decoration: underline;
  cursor: pointer;
`;
