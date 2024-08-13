import styled from "styled-components";
import Item from "./item";

const ItemList: React.FC = () => {
  return (
    <>
      <ItemListWrapper>
        <Item />
      </ItemListWrapper>
    </>
  );
};
export default ItemList;

const ItemListWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;
