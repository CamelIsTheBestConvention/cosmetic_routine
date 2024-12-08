import "../../../scss/main/item.scss";

interface ItemProps {
  average_rating: number;
  category: string;
  description: string;
  item_key: number;
  item_name: string;
  item_price: number;
  brand_name: string;
  volume: number;
}

interface ItemComponentProps {
  item: ItemProps;
  rank?: number;
  onClick?: () => void;
}

const Item: React.FC<ItemComponentProps> = ({ item, rank, onClick }) => {
  console.log(item);

  return (
    <>
      <div className="itemWrapper" onClick={onClick}>
        <div className="num">{rank}</div>
        <div className="itemImg">
          <img
            src={`/assets/item/${item?.item_key}.jpg`}
            alt={`Routine ${item?.item_key}`}
          />
        </div>
        <div className="itemInfo">
          <p>{item?.brand_name}</p>
          <p>
            {item?.item_name} & {item?.volume}ml
          </p>
          <p>₩ {item?.item_price.toLocaleString()}</p>
        </div>
      </div>
    </>
  );
};
export default Item;
