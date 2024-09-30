import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ItemDetails {
  average_rating: number;
  brand_name: string;
  category: string;
  description: string;
  item_key: number;
  item_name: string;
  item_price: number;
  volume: number;
}

interface order_details {
  item_key: number;
  count: number;
  order_key: number;
  purchase_price: number;
}

interface OrderDetailData {
  order_key: number;
  order_at: string;
  order_details: order_details[];
  status: string;
  price_total: number;
}

interface payDetailData {
  orderDetailData: OrderDetailData | null;
  orderItemData: ItemDetails[];
}

const PayDetailInfo: React.FC<payDetailData> = ({
  orderDetailData,
  orderItemData,
}) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const handleItemClick = (id: number) => {
    navigate(`/item/${id}`);
  };

  const handleAddItem = async (item_key: number) => {
    if (token) {
      try {
        await axios.post(
          `${backPort}/api/order/cart`,
          { item_key: item_key, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("장바구니에 모든 아이템 추가 성공");
        navigate("/order");
      } catch (error) {
        console.error("장바구니 추가 중 오류 발생:", error);
      }
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="orderDetailContent">
        <div className="orderDetailBox">
          <h3>주문 일자 : {orderDetailData?.order_at}</h3>
          <h4>배송 상태 : {orderDetailData?.status}</h4>
          <div className="detailTitle">
            <p>총 {orderItemData.length}개 상품</p>
          </div>
          {orderItemData.map((item) => (
            <div key={item.item_key} className="boxContent">
              <div className="boxContentMain">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/item/${item.item_key}.jpg`}
                    alt={item.item_name}
                  />
                </div>
                <div>
                  <span>{item.brand_name}</span>
                  <span>
                    {item.item_name} / {item.volume}ml
                  </span>
                  <p>₩ {item.item_price.toLocaleString()}</p>
                </div>
              </div>
              <div className="boxContentBtn">
                <button onClick={() => handleAddItem(item?.item_key)}>
                  재구매
                </button>
                <button onClick={() => handleItemClick(item?.item_key)}>
                  리뷰 작성
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default PayDetailInfo;
