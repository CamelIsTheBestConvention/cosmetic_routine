import { useNavigate, useParams } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import "../scss/mypage/orderDetail.scss";
import PayInfo from "../components/mypage/payInfo";
import MainFooter from "../components/common/mainFooter";
import PayDetailInfo from "../components/mypage/payDetailInfo";
import { useEffect, useState } from "react";
import axios from "axios";

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

interface OrderDetails {
  item_key: number;
  count: number;
  order_key: number;
  purchase_price: number;
}

interface OrderDetailData {
  order_key: number;
  order_at: string;
  order_details: OrderDetails[];
  status: string;
  price_total: number;
}

const OrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userKey = sessionStorage.getItem("userKey");
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const token = sessionStorage.getItem("authToken");
  const [orderDetailData, setOrderDetailData] =
    useState<OrderDetailData | null>(null);
  const [orderItemData, setOrderItemData] = useState<ItemDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchOrderDetail = async () => {
      console.log(userKey);
      console.log(id);
      try {
        if (userKey && id) {
          const response = await axios.get(
            `${backPort}/api/order/itemorder/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOrderDetailData(response.data);
          console.log(response.data);

          const itemRequests = response.data.order_details.map(
            (item: { item_key: number }) =>
              axios.get(`${backPort}/api/item/key/${item.item_key}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
          );

          const itemResponses = await Promise.all(itemRequests);
          const items = itemResponses.map((res) => res.data);
          setOrderItemData(items);
          console.log(items);
        }
      } catch (err) {
        console.error("데이터 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [userKey, id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  //   if (!orderDetailData) {
  //     return <div>주문 상세 정보를 불러오지 못했습니다.</div>;
  //   }

  return (
    <>
      <AboutHeader Title="주문 상세" onBack={handleBack} />
      <div className="orderListWrapper">
        <div className="orderListFilter">
          <div>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
        <PayDetailInfo
          orderDetailData={orderDetailData}
          orderItemData={orderItemData}
        />
        <PayInfo priceTotal={orderDetailData?.price_total} />
      </div>
      <MainFooter />
    </>
  );
};
export default OrderDetail;
