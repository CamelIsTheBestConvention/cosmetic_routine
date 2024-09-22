import { useNavigate } from "react-router-dom";
import axios from "axios";

interface itemBox {
  itemList: number[];
}

const DetailBtnBox: React.FC<itemBox> = ({ itemList }) => {
  const navigate = useNavigate();
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const token = sessionStorage.getItem("authToken");

  const handleAddItem = async () => {
    try {
      for (const item_key of itemList) {
        await axios.post(
          `${backPort}/api/order/cart`,
          { item_key, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      console.log("장바구니에 모든 아이템 추가 성공");
      navigate("/order");
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생:", error);
    }
  };

  return (
    <>
      <div className="detailBtnBoxWrapper">
        <button onClick={handleAddItem}>장바구니 추가</button>
        <button>구매하기</button>
      </div>
    </>
  );
};
export default DetailBtnBox;
