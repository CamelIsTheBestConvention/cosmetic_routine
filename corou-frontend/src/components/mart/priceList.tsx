import "../../scss/mart/priceList.scss";

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

interface cartListData {
  cartList: cartItem[];
}

const PriceList: React.FC<cartListData> = ({ cartList }) => {
  const totalItemPrice = cartList.reduce(
    (total, cartItem) => total + cartItem.item.item_price * cartItem.quantity,
    0
  );

  return (
    <>
      <div className="priceListWrapper">
        <div className="priceListBox">
          <h3>구매 금액</h3>
          <div>
            <span>상품 금액</span>
            <span>{totalItemPrice.toLocaleString()}원</span>
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
            <span>{totalItemPrice.toLocaleString()}원</span>
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
