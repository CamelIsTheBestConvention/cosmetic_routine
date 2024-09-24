import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

interface totalPriceData {
  cartList: cartItem[];
  totalPrice: number;
  totalQuantity: number;
}

const MoveCertBtn: React.FC<totalPriceData> = ({
  cartList,
  totalPrice,
  totalQuantity,
}) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleMoveCert = () => {
    navigate("/order/cert", {
      state: {
        cartList,
        totalPrice,
        totalQuantity,
      },
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  return (
    <>
      <BuyBtnWrapper>
        <BuyCheck>
          <label>
            {/* <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            /> */}
            <span>총 {totalQuantity}개</span>
          </label>
        </BuyCheck>
        <button onClick={handleMoveCert}>
          {totalPrice.toLocaleString()}원 구매하기
        </button>
      </BuyBtnWrapper>
    </>
  );
};
export default MoveCertBtn;

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
