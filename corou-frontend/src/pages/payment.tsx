import React from "react";

// 결제 데이터 타입 정의
interface PaymentData {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  amount: number;
  name: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
}

const Payment: React.FC = () => {
  const handlePayment = () => {
    const { IMP } = window as any; // 타입스크립트에서 window 객체를 사용하는 방법
    IMP.init("가맹점 식별코드"); // 포트원 가맹점 식별코드

    const data: PaymentData = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`, // 주문 고유 ID
      amount: 1000, // 결제 금액
      name: "결제 테스트",
      buyer_name: "홍길동",
      buyer_tel: "010-1234-5678",
      buyer_email: "gildong@example.com",
    };

    IMP.request_pay(data, (response: any) => {
      if (response.success) {
        // 결제 성공 시 로직
        console.log("결제 성공:", response);
      } else {
        // 결제 실패 시 로직
        console.error("결제 실패:", response.error_msg);
      }
    });
  };

  return <button onClick={handlePayment}>결제하기</button>;
};

export default Payment;
