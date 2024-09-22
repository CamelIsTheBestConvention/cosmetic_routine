import { useNavigate } from "react-router-dom";
import MainFooter from "../components/common/mainFooter";
import AboutHeader from "../components/common/aboutHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface addressData {
  address_key: number;
  address_name: string;
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
        await axios.delete(
          `${backPort}/api/user/${userKey}/address/${address_key}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAddressList((prevList) =>
          prevList.filter((address) => address.address_key !== address_key)
        );

        console.log("주소 삭제 성공");
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
                <h3>{address?.address_name}</h3>
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
                <span>{address?.name}</span>
                <span>
                  {address?.tel.slice(0, 3)}-{address?.tel.slice(3, 7)}-
                  {address?.tel.slice(7, 11)}
                </span>
                <span>
                  {address?.addr}({address?.zip})
                </span>
                <span>{address?.addr_detail}</span>
                <span>요청 사항: {address?.request}</span>
              </AddressBoxContent>
              {address?.is_default === "Y" && (
                <DefaultAddr>기본 배송지</DefaultAddr>
              )}
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
  width: 95%;
  margin: 0 auto;
  /* border: 2px solid #ffa4e4; */
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const AddressBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    margin: 0;
  }

  div {
    span {
      font-size: 13px;
      margin-left: 10px;
      color: #848484;
      font-weight: 700;
      cursor: pointer;
    }
  }
`;

const AddressBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  span {
    color: #848484;
    font-size: 13px;
  }
`;

const DefaultAddr = styled.div`
  margin-top: 20px;
  color: #ff42e6;
  font-size: 14px;
`;
