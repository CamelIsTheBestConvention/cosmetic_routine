import { useNavigate } from "react-router-dom";

interface itemBox {
  itemList: string[];
}

const DetailBtnBox: React.FC<itemBox> = ({ itemList }) => {
  const navigate = useNavigate();

  const handleAddItem = () => {
    navigate("/order", { state: { itemList } });
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
