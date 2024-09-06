import "../../scss/mart/priceList.scss";

interface itemPrice {
  price: number;
}

interface itemListData {
  itemList: itemPrice[];
}

const PriceList: React.FC<itemListData> = ({ itemList }) => {
  return (
    <>
      <div className="priceListWrapper">
        <div className="priceListBox">
          <h3>구매 금액</h3>
          <div>
            <span>상품 금액</span>
            {/* <span>{itemList[0].price}원</span> */}
          </div>
          <div>
            <span>할인 금액</span>
            <span>-0원</span>
          </div>
          <div>
            <span>배송비</span>
            <span>배송비 무료</span>
          </div>

          <div>
            <span>총 구매 금액</span>
            {/* <span>{itemList[0].price}원</span> */}
          </div>
          <div>
            <span>적립혜택 예상</span>
            <span>최대 0원</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default PriceList;
