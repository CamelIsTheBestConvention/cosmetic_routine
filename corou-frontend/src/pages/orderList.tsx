import { useNavigate } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import "../scss/mypage/orderList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import MainFooter from "../components/common/mainFooter";
import notOrder from "../img/notOrder.png";

interface orderItem {
  order_at: string;
  order_key: number;
  price_total: number;
  status: string;
}

const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const userKey = sessionStorage.getItem("userKey");
  const token = sessionStorage.getItem("authToken");
  const [orders, setOrders] = useState<orderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("전체");

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
        console.log(response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error("데이터 불러오기 실패", err);
        setLoading(false);
      }
    };

    fetchOrderList();
  }, [backPort]);

  const handleOrderClick = (order_key: number) => {
    navigate(`/mypage/orderList/${order_key}`);
  };

  const statusMapping: { [key: string]: string } = {
    ORDERED: "주문완료",
    DELIVERING: "배송중",
    COMPLETE: "배송완료",
    CANCELED: "주문취소",
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "전체") return true;
    if (filter === "주문완료") return order.status === "ORDERED";
    if (filter === "배송중") return order.status === "DELIVERING";
    if (filter === "배송완료") return order.status === "COMPLETE";
    if (filter === "주문취소") return order.status === "CANCELED";
    return false;
  });

  return (
    <>
      <AboutHeader Title="주문 내역" onBack={handleBack} />
      <div className="orderListWrapper">
        <div className="orderListFilter">
          <div>
            {["전체", "주문완료", "배송중", "배송완료", "주문취소"].map(
              (item) => (
                <p
                  key={item}
                  onClick={() => setFilter(item)}
                  style={{
                    color: filter === item ? "#fd73d4" : "black",
                    fontWeight: filter === item ? "bold" : "normal",
                  }}
                >
                  {item}
                </p>
              )
            )}
          </div>
        </div>
        <div className="orderListContent">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div
                className="orderListBox"
                key={index}
                onClick={() => handleOrderClick(order?.order_key)}
              >
                <div className="boxTitle">
                  <span>{order?.order_at}</span>
                  <span>주문상세</span>
                </div>
                <div className="boxContent">
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div>
                    <span>
                      {/* {order.items[0]} 외 {order.items.length - 1}건 */}
                      총액 : {order?.price_total}, 상태 :{" "}
                      {statusMapping[order.status] || order.status}
                    </span>
                    <p>₩ {order.price_total}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="notItemWrapper">
              <div>
                <img src={notOrder} alt="주문 정보가 없습니다." />
              </div>
              <p>주문 정보가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
      <MainFooter />
    </>
  );
};
export default OrderList;
