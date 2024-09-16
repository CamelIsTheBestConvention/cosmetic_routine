import "../../scss/about/filterList.scss";
import sortFilter from "../../img/sort.png";
import goodOff from "../../img/goodOff.png";
import goodOn from "../../img/goodOn.png";
import star from "../../img/star.png";
import { items } from "../../data/Data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FilterList: React.FC = () => {
  const navigate = useNavigate();
  const [sortedItems, setSortedItems] = useState(items);
  const [sortOrder, setSortOrder] = useState("priceAsc");

  const handleAddRoutine = () => {
    navigate("/add");
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value;
    setSortOrder(selectedOrder);

    const sortedArray = [...items];

    switch (selectedOrder) {
      case "priceAsc":
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sortedArray.sort((a, b) => b.price - a.price);
        break;
      case "ratingAsc":
        sortedArray.sort((a, b) => a.rating - b.rating);
        break;
      case "ratingDesc":
        sortedArray.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setSortedItems(sortedArray);
  };

  const toggleLike = (index: number) => {
    const updatedItems = sortedItems.map((item, i) =>
      i === index ? { ...item, isLiked: !item.isLiked } : item
    );
    setSortedItems(updatedItems);
  };

  return (
    <>
      <div className="filterListWrapper">
        <div className="filterBtn">
          <div style={{ display: "flex" }}>
            정렬 순:{" "}
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="priceAsc">가격 오름차순</option>
              <option value="priceDesc">가격 내림차순</option>
              <option value="ratingAsc">평점 오름차순</option>
              <option value="ratingDesc">평점 내림차순</option>
            </select>
          </div>
          {/* <img src={sortFilter} alt="" /> */}
        </div>
        {items.map((item, index) => (
          <div className="itemListWrapper" key={index}>
            <div className="itemListTitle">
              <div className="itemListFirstTitle">
                <div>{item.title}</div>
                <div>
                  <img
                    src={item.isLiked ? goodOn : goodOff}
                    alt="좋아요"
                    onClick={() => toggleLike(index)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="itemListSecondTitle">
                <div>
                  <img src={star} alt="" />
                </div>
                <div>
                  {item.rating} <span>({item.reviews})</span>
                </div>
              </div>
            </div>
            <div className="itemListContent">
              <div className="contentImg">
                <img src="#" alt="" />
              </div>
              <div className="contentInfo">
                <span>{item.routine}</span>
                <div className="selectFilter">
                  <div>{item.skinType}</div>
                  <div>{item.gender}</div>
                </div>
                <div className="contentTag">
                  <ul>
                    {item.tags.map((tag, tagIndex) => (
                      <li key={tagIndex}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="contentPrice">
                  종합 <span>₩ {item.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="addRoutineBtn" onClick={handleAddRoutine}>
          <span>+</span>
        </div>
      </div>
    </>
  );
};
export default FilterList;
