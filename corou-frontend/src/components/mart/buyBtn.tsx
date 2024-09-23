import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";

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

interface PaymentData {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  amount: number;
  name: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
  buyer_addr: string;
  buyer_postcode: string;
}

interface totalPriceData {
  totalPrice: number;
  cartList: cartItem[];
}

const BuyBtn: React.FC<totalPriceData> = ({ cartList, totalPrice }) => {
  useEffect(() => {
    const loadIMPScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://cdn.iamport.kr/v1/iamport.js";
        script.onload = () => resolve(window.IMP);
        document.body.appendChild(script);
      });
    };

    loadIMPScript().then((IMP) => {
      if (!IMP) {
        console.error("포트원(아임포트) 결제 모듈이 로드되지 않았습니다.");
      }
    });

    return () => {
      const script = document.querySelector(
        "script[src='https://cdn.iamport.kr/v1/iamport.js']"
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    const { IMP } = window as any; // 타입스크립트에서 window 객체를 사용하는 방법
    const clientKey = process.env.REACT_APP_PORTONE_CLIENT_KEY;
    const backPort = process.env.REACT_APP_BACKEND_PORT;
    const channelKey = process.env.REACT_APP_PORTONE_CHANNEL_KEY;

    console.log("클라키", clientKey);
    console.log("임프", IMP);
    console.log("채널키", channelKey);

    if (!IMP) {
      console.error("포트원(아임포트) 결제 모듈이 로드되지 않았습니다.");
      return;
    }

    IMP.init(clientKey); // 포트원 가맹점 식별코드

    const paymentData: PaymentData = {
      pg: "uplus", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문 고유 ID
      amount: totalPrice, // 결제 금액
      name: "corou 제품", // 주문명
      buyer_name: "문미새",
      buyer_tel: "010-1234-5678",
      buyer_email: "gildong@example.com",
      buyer_addr: "역삼로 123",
      buyer_postcode: "12345",
    };

    IMP.request_pay(paymentData, async (response: any) => {
      console.log(paymentData);
      if (response.success) {
        console.log("응답 데이터", response.data);
        console.log(1);
        console.log("12312", response.imp_uid);
        try {
          const result = await axios.get(
            `${backPort}/api/payments/${response.imp_uid}`,
            {
              headers: {
                Authorization: `Bearer ${channelKey}`,
              },
            }
          );

          console.log(result.data);
          if (result.data.status === "paid") {
            const token = sessionStorage.getItem("authToken");
            const payData = axios.post(
              `${backPort}/api/order/itemorder`,
              {
                addr_key: 1,
                price_total: totalPrice,
                items: [
                  {
                    count: 1,
                    purchase_price: 1000,
                    item_key: 1,
                  },
                ],
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            alert("결제가 정상적으로 완료되었습니다.");
            console.log("결제 검증 성공:", result.data);
          } else {
            alert("결제 검증 실패: " + result.data.message);
            console.error("결제 검증 실패:", result.data);
          }
        } catch (error) {
          console.error("서버로 결제 정보 전송 중 에러:", error);
        }
      } else {
        alert("결제 실패");
        console.error("결제 실패:", response.error_msg);
      }
    });
  };

  return (
    <>
      <BuyBtnWrapper>
        <button onClick={handlePayment}>
          {totalPrice.toLocaleString()}원 구매하기
        </button>
      </BuyBtnWrapper>
    </>
  );
};
export default BuyBtn;

const BuyBtnWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 90%;
    margin: 20px 0;
    background-color: #ff5cd0;
    border: none;
    padding: 13px 0;
    border-radius: 13px;
    font-size: 13px;
    color: white;
  }
`;

const BuyCheck = styled.div`
  width: 100%;

  label {
    display: flex;

    input[type="checkbox"] {
      appearance: none; /* 기본 체크박스 스타일 제거 */
      width: 15px;
      height: 15px;
      border: 1px solid lightgray;
      cursor: pointer;
      margin-right: 10px;

      &:checked {
        background-color: rgba(255, 164, 228, 0.5);
        border-color: rgba(255, 164, 228, 0.5);
      }

      &:checked::after {
        content: "✓";
        display: block;
        color: black;
        text-align: center;
        line-height: 13px;
        font-size: 15px;
      }
    }

    span {
      font-size: 14px;
      line-height: 1.5;
      color: #848484;
    }
  }
`;
