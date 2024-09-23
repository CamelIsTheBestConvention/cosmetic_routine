import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectAddress } from "../redux/slice/addressSlice";

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

const PopupAddress: React.FC = () => {
  const navigate = useNavigate();
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const userKey = sessionStorage.getItem("userKey");
  const [addressList, setAddressList] = useState<addressData[]>([]);
  const token = sessionStorage.getItem("authToken");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAddressList = async () => {
      try {
        const response = await axios.get(
          `${backPort}/api/user/${userKey}/address`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAddressList(response.data);
      } catch (error) {
        console.error("주소지 목록 조회 실패", error);
      }
    };

    fetchAddressList();
  }, [userKey, token]);

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

  const handleAddressSelect = (address_key: number) => {
    console.log(address_key);
    const selectedAddress = addressList.find(
      (address) => address.address_key === address_key
    );
    console.log(selectedAddress);
    const data = dispatch(setSelectAddress(selectedAddress || null));

    console.log(data.payload);
    if (selectedAddress) {
      // window.close();
    }
  };

  return (
    <>
      <AddAddressBox>
        <span onClick={handleAddAddress}>배송지 추가</span>
      </AddAddressBox>
      <GetAddressWrapper>
        {addressList?.length > 0 ? (
          addressList?.map((address) => (
            <AddressBox
              key={address?.address_key}
              onClick={() => handleAddressSelect(address.address_key)}
            >
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
    </>
  );
};
export default PopupAddress;

const AddAddressBox = styled.div`
  width: 90%;
  margin: 0 auto 20px auto;
  border-bottom: 1px solid #ffa4e4;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0 0 0;

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
