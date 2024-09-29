import { useNavigate, useParams } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import "../scss/mypage/orderDetail.scss";
import PayInfo from "../components/mypage/payInfo";
import MainFooter from "../components/common/mainFooter";
import PayDetailInfo from "../components/mypage/payDetailInfo";
import { useEffect, useState } from "react";
import axios from "axios";

interface OrderDetailData {
  order_key: number;
  order_at: string;
  status: string[];
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

          console.log("주문데이터", response.data);
          setOrderDetailData(response.data);
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
        <PayDetailInfo />
        <PayInfo />
      </div>
      <MainFooter />
    </>
  );
};
export default OrderDetail;
