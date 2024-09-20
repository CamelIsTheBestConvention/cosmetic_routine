import styled from "styled-components";

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

const BuyBtn: React.FC = () => {
  const handlePayment = async () => {
    const { IMP } = window as any; // 타입스크립트에서 window 객체를 사용하는 방법
    const clientKey = process.env.PORTONE_CLIENT_KEY;

    if (!IMP) {
      console.error("포트원(아임포트) 결제 모듈이 로드되지 않았습니다.");
      return;
    }

    IMP.init(clientKey); // 포트원 가맹점 식별코드

    const data: PaymentData = {
      pg: "tosspayments", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문 고유 ID
      amount: 1, // 결제 금액
      name: "아임포트 결제 데이터", // 주문명
      buyer_name: "문미새",
      buyer_tel: "010-1234-5678",
      buyer_email: "gildong@example.com",
      buyer_addr: "역삼로 123",
      buyer_postcode: "12345",
    };

    // https://api.iamport.kr/users/getToken

    IMP.request_pay(data, async (response: any) => {
      if (response.success) {
        try {
          const res = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imp_uid: response.imp_uid, // 포트원 결제 고유 번호
              merchant_uid: response.merchant_uid, // 주문 고유 번호
            }),
          });
          const result = await res.json();
          if (result.status === "success") {
            alert("결제가 정상적으로 완료되었습니다.");
            console.log("결제 검증 성공:", result);
          } else {
            alert("결제 검증 실패: " + result.message);
            console.error("결제 검증 실패:", result);
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
        <BuyCheck>
          <label>
            <input type="checkbox" />
            <span>총 0개</span>
          </label>
        </BuyCheck>
        <button onClick={handlePayment}>000,000원 구매하기</button>
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
