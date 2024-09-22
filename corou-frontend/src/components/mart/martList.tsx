import { useState } from "react";
import "../../scss/mart/martList.scss";
import notItem from "../../img/notItem.png";

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
  onQuantityChange: (cartKey: number, newQuantity: number) => void;
  onCheckedItemsChange: (checkedItems: number[]) => void;
}

const MartList: React.FC<cartListData> = ({
  cartList,
  onQuantityChange,
  onCheckedItemsChange,
}) => {
  const hasItem = cartList && cartList.length > 0;
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleQuantityInputChange = (
    cartKey: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      onQuantityChange(cartKey, newQuantity);
    }
  };

  const handleCheckboxChange = (cartKey: number) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = prevCheckedItems.includes(cartKey)
        ? prevCheckedItems.filter((key) => key !== cartKey)
        : [...prevCheckedItems, cartKey];

      onCheckedItemsChange(updatedCheckedItems);
      return updatedCheckedItems;
    });
  };

  return (
    <>
      <div className="martListWrapper">
        {hasItem ? (
          cartList.map((cartItem) => (
            <div className="martItem" key={cartItem.cart_key}>
              <label>
                <input
                  type="checkbox"
                  name="itemCheckbox"
                  checked={checkedItems.includes(cartItem.cart_key)}
                  onChange={() => handleCheckboxChange(cartItem.cart_key)}
                />
                <div className="martItemWrapper">
                  <div className="martItemImg">
                    <img
                      src={`/assets/item/${cartItem?.item_key}.jpg`}
                      alt={cartItem?.item.item_name}
                    />
                  </div>
                  <div className="martItemInfo">
                    <span>{cartItem?.item.brand_name}</span>
                    <span>
                      {cartItem?.item.item_name} / {cartItem?.item.volume}ml
                    </span>
                    <span className="itemQuantity">
                      수량:{" "}
                      <input
                        type="number"
                        value={cartItem?.quantity}
                        onChange={(e) =>
                          handleQuantityInputChange(cartItem.cart_key, e)
                        }
                        min="1"
                        max="100"
                      />
                    </span>
                    <span>
                      ₩{" "}
                      {(
                        cartItem?.item.item_price * cartItem?.quantity
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </label>
            </div>
          ))
        ) : (
          <div className="notItemWrapper">
            <div>
              <img src={notItem} alt="제품 정보가 없습니다." />
            </div>
            <p>제품 정보가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
};
export default MartList;
