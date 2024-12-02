import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// interface PaymentData {
//   pg: string;
//   pay_method: string;
//   merchant_uid: string;
//   amount: number;
//   name: string;
//   buyer_name: string;
//   buyer_tel: string;
//   buyer_email: string;
//   buyer_addr: string;
//   buyer_postcode: string;
// }

const PaymentResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentData, result } = location.state;

  const handleOrderList = () => {
    navigate("/mypage/orderList");
  };

  const handleMart = () => {
    navigate("/order");
  };

  return (
    <>
      {result === "success" ? (
        <PaymentResultWrapper>
          <h2>결제에 성공하셨습니다.</h2>
          <p>
            상품명:{" "}
            <span>
              {paymentData.name}
              {paymentData.quantity > 1
                ? ` 외 ${paymentData.quantity - 1}개`
                : ""}
            </span>
          </p>
          <p>
            결제 금액: <span>{paymentData.amount}</span>원
          </p>
          <p>
            이름: <span>{paymentData.buyer_name}</span>
          </p>
          <p>
            이메일: <span>{paymentData.buyer_email}</span>
          </p>
          <p>
            휴대폰 번호: <span>{paymentData.buyer_tel}</span>
          </p>
          <p>
            배송지:{" "}
            <span>
              ({paymentData.buyer_postcode}){paymentData.buyer_addr}
            </span>
          </p>
          <span>클릭하면 주문내역 목록으로 이동합니다.</span>
          <button onClick={handleOrderList}>이동</button>
        </PaymentResultWrapper>
      ) : (
        <PaymentResultWrapper>
          <h2>결제에 실패하였습니다.</h2>
          <div>다시 시도하거나 고객센터에 문의하세요.</div>
          <div>결제 실패로 인해 주문 내역이 없습니다.</div>
          <span>클릭하면 장바구니로 이동합니다.</span>
          <button onClick={handleMart}>이동</button>
        </PaymentResultWrapper>
      )}
    </>
  );
};
export default PaymentResult;

const PaymentResultWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;

  p {
    font-size: 17px;
    font-weight: bold;
    width: 70%;
    margin-left: auto;
    margin-right: auto;

    span {
      font-size: 16px;
      color: #848484;
      font-weight: normal;
    }
  }

  h2 {
    text-align: center;
  }

  span {
    margin: 20px 0;
    font-size: 14px;
    text-align: center;
  }

  button {
    width: 30%;
    margin: 0 auto;
    background-color: rgba(255, 164, 228, 0.7);
    border: none;
    border-radius: 10px;
    padding: 10px 0;
    outline: none;
    font-size: 14px;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }

  div {
    text-align: center;
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 20px;
  }
`;
