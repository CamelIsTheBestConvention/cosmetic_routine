import "../../scss/about/filterList.scss";
import sortFilter from "../../img/sort.png";
import goodOff from "../../img/goodOff.png";
import goodOn from "../../img/goodOn.png";
import star from "../../img/star.png";
import { items } from "../../data/Data";

const FilterList: React.FC = () => {
  return (
    <>
      <div className="filterListWrapper">
        <div className="filterBtn">
          <div>
            정렬 순: <span>가격</span>
          </div>
          <img src={sortFilter} alt="" />
        </div>
        {items.map((item, index) => (
          <div className="itemListWrapper" key={index}>
            <div className="itemListTitle">
              <div className="itemListFirstTitle">
                <div>{item.title}</div>
                <div>
                  <img src={goodOff} alt="" />
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
      </div>
    </>
  );
};
export default FilterList;
