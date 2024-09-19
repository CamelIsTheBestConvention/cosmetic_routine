import "../../scss/mypage/payInfo.scss";

const PayInfo: React.FC = () => {
  return (
    <>
      <div className="payInfoWrapper">
        <div className="payInfo">
          <span>결제 정보</span>
          <div>
            <span>영수증 보기</span>
            <span>거래 명세서</span>
          </div>
        </div>
        <div className="itemPrice">
          <span>상품 금액</span>
          <span>21,000원</span>
        </div>
        <div className="discountPrice">
          <span>할인 금액</span>
          <span>-11,760원 ▽</span>
        </div>
        <div className="savingsPrice">
          <span>적립금</span>
          <span>-851원 ▽</span>
        </div>
        <div className="deliveryPrice">
          <span>배송비</span>
          <span>배송비 무료</span>
        </div>
        <div className="payPrice">
          <span>결제 금액</span>
          <span>
            <span>60%</span> 8,389원
          </span>
        </div>
        <div className="payMethod">
          <span>결제 수단</span>
          <span>네이버페이-현대카드(일시불)</span>
        </div>
      </div>
    </>
  );
};
export default PayInfo;
