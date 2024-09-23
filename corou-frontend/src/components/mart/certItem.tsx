interface ItemProps {
  average_rating: number;
  category: string;
  description: string;
  item_key: number;
  item_name: string;
  item_price: number;
}

interface ItemComponentProps {
  item: ItemProps;
  onClick?: () => void;
}

const CertItem: React.FC<ItemComponentProps> = ({ item }) => {
  return (
    <>
      <div className="itemWrapper">
        <div className="itemImg">
          <img
            src={`/assets/item/${item?.item_key}.jpg`}
            alt={`Routine ${item?.item_key}`}
          />
        </div>
        <div className="itemInfo">
          <p>브랜드</p>
          <p>{item?.item_name} & 용량</p>
          <p>₩ {item?.item_price}</p>
        </div>
      </div>
    </>
  );
};
export default CertItem;
