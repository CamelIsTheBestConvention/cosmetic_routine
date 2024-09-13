import { useState } from "react";
import "../../scss/mart/martList.scss";
import notItem from "../../img/notItem.png";

interface itemData {
  id: number;
  brand: string;
  name: string;
  size: number;
  price: number;
  itemImg: string;
}

interface itemListData {
  itemList: itemData[];
}

const MartList: React.FC<itemListData> = ({ itemList }) => {
  const hasItem = itemList && itemList.length > 0;

  return (
    <>
      <div className="martListWrapper">
        {hasItem ? (
          <div className="martItem">
            <label>
              <input type="checkbox" name="" id="" />
              <div className="martItemWrapper">
                <div className="martItemImg">
                  <img src={itemList[0]?.itemImg} alt="itemImg" />
                </div>
                <div className="martItemInfo">
                  <span>{itemList[0]?.brand}</span>
                  <span>
                    {itemList[0]?.name} & {itemList[0]?.size}
                  </span>
                  <p>₩ {itemList[0]?.price}</p>
                </div>
              </div>
            </label>
          </div>
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
