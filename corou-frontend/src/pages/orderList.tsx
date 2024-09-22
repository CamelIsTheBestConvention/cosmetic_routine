import { useNavigate } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import "../scss/mypage/orderList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import MainFooter from "../components/common/mainFooter";

interface orderItem {
  addr_key: number;
  price_total: number;
  items: string[];
}

const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const [orders, setOrders] = useState<orderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const userKey = sessionStorage.getItem("userKey");
  const token = sessionStorage.getItem("authToken");

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await axios.get(`${backPort}/api/order/itemorder`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error("데이터 불러오기 실패", err);
        setLoading(false);
      }
    };

    fetchOrderList();
  }, [backPort]);

  const handleOrderClick = (addr_key: number) => {
    navigate(`/mypage/orderList/${addr_key}`);
  };

  return (
    <>
      <AboutHeader Title="주문 내역" onBack={handleBack} />
      <div className="orderListWrapper">
        <div className="orderListFilter">
          <div>
            <p>전체</p>
            <p>배송</p>
            <p>배송완료</p>
            <p>주문취소</p>
          </div>
        </div>
        <div className="orderListContent">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                className="orderListBox"
                key={index}
                onClick={() => handleOrderClick(order.addr_key)}
              >
                <div className="boxTitle">
                  <span>{order?.addr_key}</span>
                  <span>주문상세</span>
                </div>
                <div className="boxContent">
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div>
                    <span>
                      {order.items[0]} 외 {order.items.length - 1}건
                    </span>
                    <p>₩ {order.price_total}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>주문 내역이 없습니다.</p>
          )}
        </div>
      </div>
      <MainFooter />
    </>
  );
};
export default OrderList;
