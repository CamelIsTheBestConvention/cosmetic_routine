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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSelfInfo();
    if (!selectAddress) {
      fetchDefaultAddress();
    }
  }, [selectAddress]);

  useEffect(() => {
    window.handleAddressChange = (newAddress) => {
      console.log("주소 업데이트 됨", newAddress);
      dispatch(setSelectAddress(newAddress));
    };
  }, [dispatch]);

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
    setIsModalOpen(true);

    const popup = window.open(
      "/popup",
      "배송지 변경",
      "width=450,height=700,scrollbars=yes"
    );

    const handleFocus = () => {
      setIsModalOpen(false);
      window.removeEventListener("focus", handleFocus);
    };

    if (popup) {
      (popup as Window).handleAddressChange = (newAddress) => {
        console.log("주소 업데이트됨:", newAddress);
        dispatch(setSelectAddress(newAddress));
      };

      popup.onbeforeunload = () => {
        window.addEventListener("focus", handleFocus);
      };

      const handlePopupClose = setInterval(() => {
        if (popup.closed) {
          setIsModalOpen(false);
          clearInterval(handlePopupClose);
        }
      }, 500);
    }
  };

  const onOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    console.log("Overlay clicked, but modal should not close.");
  };

  return (
    <>
      {isModalOpen && <Overlay onClick={onOverlay} />}
      <AboutHeader Title="주문서" onBack={handleBack} />
      <CertWrapper>
        <AddressBox>
          <AddressBoxTitle>
            <h3>{selectAddress?.address_name}</h3>
            <span onClick={handleAddressModalOpen}>배송지 변경</span>
          </AddressBoxTitle>
          <AddressBoxContent>
            <span>{selectAddress?.name}</span>
            <span>
              {selectAddress?.addr}({selectAddress?.zip})
            </span>
            <span>{selectAddress?.addr_detail}</span>
            <span>{selectAddress?.tel}</span>
            <span>{selectAddress?.request}</span>
            {selectAddress?.is_default === "Y" && (
              <DefaultAddr>기본 배송지</DefaultAddr>
            )}
          </AddressBoxContent>
        </AddressBox>
        <div>
          <h3>주문 상품 {totalQuantity}개</h3>
          {cartList.map((cartItem: cartItem) => (
            <CertItemBox key={cartItem.cart_key}>
              <span>제품 수량 : {cartItem.quantity}개</span>
              <CertItem item={cartItem.item} />
            </CertItemBox>
          ))}
        </div>
        <div className="priceListWrapper">
          <div className="priceListBox">
            <h3>결제 금액</h3>
            <div>
              <span>상품 금액</span>
              <span>{totalPrice.toLocaleString()}원</span>
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
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
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
  width: 90%;
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

  span {
    font-size: 13px;
    margin-left: 10px;
    color: #848484;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      color: black;
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

const CertItemBox = styled.div`
  width: 100%;
  margin-bottom: 15px;

  span {
    font-weight: 700;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
