import styled from "styled-components";
import Item from "./item";
import { useEffect, useState } from "react";
import axios from "axios";

interface ItemProps {
  average_rating: number;
  category: string;
  description: string;
  item_key: number;
  item_name: string;
  item_price: number;
}

const ItemList: React.FC = () => {
  const [useItem, setUseItem] = useState<ItemProps[]>([]);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${backPort}/api/item`);
      setUseItem(response.data);
    } catch (error) {
      console.error("아이템을 가져오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <ItemListWrapper>
        {useItem.slice(0, 3).map((item, index) => (
          <Item key={item.item_key} item={item} rank={index + 1} />
        ))}
      </ItemListWrapper>
    </>
  );
};
export default ItemList;

const ItemListWrapper = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;
