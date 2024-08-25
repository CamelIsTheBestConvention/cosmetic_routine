import styled from "styled-components";
import UsingItemTitle from "./usingItemTitle";
import ItemList from "./itemList";

const UsingItem: React.FC = () => {
  return (
    <>
      <UsingItemWrapper>
        <UsingItemTitle />
        <ItemList />
      </UsingItemWrapper>
    </>
  );
};
export default UsingItem;

const UsingItemWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
