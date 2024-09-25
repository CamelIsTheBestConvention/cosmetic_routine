import { useNavigate } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import BuyBtn from "../components/mart/buyBtn";
import Caution from "../components/mart/caution";
import MartList from "../components/mart/martList";
import PriceList from "../components/mart/priceList";
import MainFooter from "../components/common/mainFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import MoveCertBtn from "../components/mart/moveCertBtn";

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

const Mart: React.FC = () => {
  const navigate = useNavigate();
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const token = sessionStorage.getItem("authToken");
  const [cartList, setCartList] = useState<cartItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    fetchCartData();
  }, [backPort, token]);

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${backPort}/api/order/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("장바구니 데이터", response.data);
      setCartList(response.data);
      setCheckedItems(response.data.map((item: cartItem) => item.cart_key));
    } catch (error) {
      console.error("장바구니 데이터를 불러오는 중 오류 발생", error);
    }
  };

  useEffect(() => {
    const checkedItemsData = cartList.filter((item) =>
      checkedItems.includes(item.cart_key)
    );

    const newTotalPrice = checkedItemsData.reduce(
      (total, item) => total + item.item.item_price * item.quantity,
      0
    );
    const newTotalQuantity = checkedItemsData.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setTotalPrice(newTotalPrice);
    setTotalQuantity(newTotalQuantity);
  }, [cartList, checkedItems]);

  const handleQuantityChange = (cartKey: number, newQuantity: number) => {
    setCartList((prevList) =>
      prevList.map((cartItem) =>
        cartItem.cart_key === cartKey
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  const handleCheckedItemsChange = (checkedItems: number[]) => {
    setCheckedItems(checkedItems);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AboutHeader Title={"장바구니"} onBack={handleBack} />
      <MartList
        cartList={cartList}
        onQuantityChange={handleQuantityChange}
        onCheckedItemsChange={handleCheckedItemsChange}
        refreshCartData={fetchCartData}
      />
      <PriceList
        cartList={cartList.filter((item) =>
          checkedItems.includes(item.cart_key)
        )}
      />
      <Caution />
      <MoveCertBtn
        cartList={cartList}
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
      />
      <MainFooter />
    </>
  );
};
export default Mart;
