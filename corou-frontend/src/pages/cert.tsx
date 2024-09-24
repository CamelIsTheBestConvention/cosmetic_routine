import { useLocation, useNavigate } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import MainFooter from "../components/common/mainFooter";
import BuyBtn from "../components/mart/buyBtn";
import styled from "styled-components";
import CertItem from "../components/mart/certItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectAddress } from "../redux/slice/addressSlice";

interface itemData {
  average_rating: number;
  brand_name: string;
  category: string;
  description: string;
  item_key: number;
  item_name: string;
  item_price: number;
  volume: number;
}

interface cartItem {
  cart_key: number;
  item: itemData;
  item_key: number;
  quantity: number;
  user_key: number;
}

interface totalPriceData {
  cartList: cartItem;
  totalPrice: number;
  totalQuantity: number;
}

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

const Cert: React.FC<totalPriceData> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { cartList, totalPrice, totalQuantity } = location.state || {};
  const userKey = sessionStorage.getItem("userKey");
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const token = sessionStorage.getItem("authToken");
  const [addressList, setAddressList] = useState<addressData | null>(null);
  const selectAddress = useSelector(
    (state: any) => state.address.selectAddress
  );
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchSelfInfo();
    if (!selectAddress) {
      fetchDefaultAddress();
    }
  }, [selectAddress]);

  const fetchSelfInfo = async () => {
    try {
      const response = await axios.get(`${backPort}/api/user/${userKey}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmail(response.data.email);
      console.log(response.data);
    } catch (error) {
      console.error("주소지를 불러오는 중 오류 발생", error);
    }
  };

  const fetchDefaultAddress = async () => {
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
      const defaultAddr = response.data.find(
        (addr: addressData) => addr.is_default === "Y"
      );
      dispatch(setSelectAddress(defaultAddr || null));
    } catch (error) {
      console.error("주소지를 불러오는 중 오류 발생", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddressModalOpen = () => {
    const popup = window.open(
      "/popup",
      "배송지 변경",
      "width=450,height=700,scrollbars=yes,position=fixed,top=30%,left=40%"
    );

    if (popup) {
      (popup as Window).handleAddressChange = (newAddress) => {
        console.log("주소 업데이트됨:", newAddress);
        dispatch(setSelectAddress(newAddress));
      };
    }
  };

  return (
    <>
      <AboutHeader Title="주문서" onBack={handleBack} />
      <CertWrapper>
        <div>
          <div>
            <h3>{selectAddress?.address_name}</h3>
            <button onClick={handleAddressModalOpen}>배송지 변경</button>
          </div>
          <span>{selectAddress?.name}</span>
          <span>
            {selectAddress?.addr}({selectAddress?.zip})
          </span>
          <span>{selectAddress?.addr_detail}</span>
          <span>{selectAddress?.tel}</span>
          <span>{selectAddress?.request}</span>
          <span>기본 배송지</span>
        </div>
        <div>
          <h3>주문 상품 {totalQuantity}개</h3>
          {cartList.map((cartItem: cartItem) => (
            <div key={cartItem.cart_key}>
              <CertItem item={cartItem.item} />
              <div>{cartItem.quantity}개</div>
            </div>
          ))}
        </div>
        <div>
          <h3>결제 금액</h3>
          <div>
            <span>상품 금액</span>
            <span>{totalPrice}원</span>
          </div>
          <div>
            <span>할인 금액</span>
            <span>0원</span>
          </div>
          <div>
            <span>배송비</span>
            <span>0원</span>
          </div>
          <div>
            <span>총 결제 금액</span>
            <span>{totalPrice}원</span>
          </div>
        </div>
        <BuyBtn
          cartList={cartList}
          totalPrice={totalPrice}
          selectAddress={selectAddress}
          email={email}
        />
      </CertWrapper>
      <MainFooter />
    </>
  );
};
export default Cert;

const CertWrapper = styled.div`
  width: 100%;
`;
