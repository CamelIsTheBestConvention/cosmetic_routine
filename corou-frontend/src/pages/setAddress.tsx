import { useNavigate } from "react-router-dom";
import MainFooter from "../components/common/mainFooter";
import AboutHeader from "../components/common/aboutHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface addressData {
  address_key: number;
  user_key: number;
  name: string;
  addr: string;
  addr_detail: string;
  zip: string;
  tel: string;
  request: string;
  is_default: string;
}

const SetAddress: React.FC = () => {
  const navigate = useNavigate();
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const userKey = sessionStorage.getItem("userKey");
  const [addressList, setAddressList] = useState<addressData[]>([]);
  const [hasToken, setHasToken] = useState(false);
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      setHasToken(true);
      axios
        .get(`${backPort}/api/user/${userKey}/address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAddressList(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("프로필 조회 실패", error);
          setAddressList([]);
        });
    } else {
      setHasToken(false);
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddAddress = () => {
    navigate("/mypage/addAddress");
  };

  const handleEditAddress = (address_key: number) => {
    console.log(address_key);
    navigate(`/mypage/editAddress/${address_key}`);
  };

  const handledelAddress = async (address_key: number) => {
    if (window.confirm("배송지를 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(
          `${backPort}/api/user/${userKey}/address/${address_key}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("주소 삭제 성공:", response.data);
        navigate("/mypage/setAddress");
      } catch (error) {
        console.error("주소 삭제 중 오류 발생:", error);
      }
    }
  };

  return (
    <>
      <AboutHeader Title="배송지" onBack={handleBack} />
      <AddAddressBox>
        <span onClick={handleAddAddress}>배송지 추가</span>
      </AddAddressBox>
      <GetAddressWrapper>
        {addressList?.length > 0 ? (
          addressList?.map((address) => (
            <AddressBox key={address?.address_key}>
              <AddressBoxTitle>
                <h3>{address?.name}</h3>
                <div>
                  <span onClick={() => handleEditAddress(address?.address_key)}>
                    수정
                  </span>
                  <span onClick={() => handledelAddress(address?.address_key)}>
                    삭제
                  </span>
                </div>
              </AddressBoxTitle>
              <AddressBoxContent>
                {/* <span>{address?.username}</span> */}
                <span>{address?.addr}</span>
                <span>{address?.addr_detail}</span>
              </AddressBoxContent>
              {address?.is_default === "Y" && <div>기본 배송지</div>}
            </AddressBox>
          ))
        ) : (
          <div>등록한 배송지가 없습니다.</div>
        )}
      </GetAddressWrapper>
      <MainFooter />
    </>
  );
};
export default SetAddress;

const AddAddressBox = styled.div`
  width: 90%;
  margin: 30px auto;
  border-bottom: 1px solid #ffa4e4;
  display: flex;
  justify-content: flex-end;

  span {
    text-align: right;
    color: #ff6de4;
    font-size: 14px;
    font-weight: 700;
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

const GetAddressWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const AddressBox = styled.div`
  width: 100%;
  border: 2px solid #ffa4e4;
  display: flex;
  flex-direction: column;
`;

const AddressBoxTitle = styled.div`
  display: flex;
`;

const AddressBoxContent = styled.div``;
