const PayDetailInfo: React.FC = () => {
  return (
    <>
      <div className="orderDetailContent">
        <div className="orderDetailBox">
          <div className="detailTitle">
            <p>총 4개 상품</p>
          </div>
          <div className="boxContent">
            <div className="boxContentMain">
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <span>브랜드</span>
                <span>제품명 & 용량</span>
                <p>₩ 00,000</p>
              </div>
            </div>
            <div className="boxContentBtn">
              <button>재구매</button>
              <button>후기작성</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PayDetailInfo;
