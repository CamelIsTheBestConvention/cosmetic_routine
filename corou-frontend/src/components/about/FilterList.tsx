import "../../scss/about/filterList.scss";
import sortFilter from "../../img/sort.png";
import goodOff from "../../img/goodOff.png";
import goodOn from "../../img/goodOn.png";
import star from "../../img/star.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface routineItem {
  routine_key: string;
  for_age: number;
  for_gender: string;
  isLiked: boolean;
  price_total: number;
  average_rating: number;
  routine_name: string;
  reviews: number;
  user: { username: string };
  problem: number[];
  tags: string[];
}

const FilterList: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<routineItem[]>([]);
  const [sortOrder, setSortOrder] = useState("priceAsc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${backPort}/api/routine`);
        console.log("데이터", response.data);
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error("아이템 가져오기 실패", err);
        setError("데이터를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchItems();
  }, [backPort]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value;
    setSortOrder(selectedOrder);

    const sortedArray = [...items];

    switch (selectedOrder) {
      case "priceAsc":
        sortedArray.sort((a, b) => a.price_total - b.price_total);
        break;
      case "priceDesc":
        sortedArray.sort((a, b) => b.price_total - a.price_total);
        break;
      case "ratingAsc":
        sortedArray.sort((a, b) => a.average_rating - b.average_rating);
        break;
      case "ratingDesc":
        sortedArray.sort((a, b) => b.average_rating - a.average_rating);
        break;
      default:
        break;
    }

    setItems(sortedArray);
  };

  const toggleLike = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, isLiked: !item.isLiked } : item
    );
    setItems(updatedItems);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleAddRoutine = () => {
    navigate("/add");
  };

  const handleRoutineClick = (routineKey: string) => {
    navigate(`/routine/${routineKey}`);
  };

  const getGenderDisplay = (gender: string) => {
    switch (gender) {
      case "M":
        return <div>남성</div>;
      case "F":
        return <div>여성</div>;
      case "A":
        return (
          <>
            <div>남성</div>
            <div>여성</div>
          </>
        );
      default:
        return <div>알 수 없음</div>;
    }
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
          <div
            className="itemListWrapper"
            key={index}
            onClick={() => handleRoutineClick(item?.routine_key)}
          >
            <div className="itemListTitle">
              <div className="itemListFirstTitle">
                <div>{item?.routine_name}</div>
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
                  {item?.average_rating} <span>({item.reviews})</span>
                </div>
              </div>
            </div>
            <div className="itemListContent">
              <div className="contentImg">
                <img src="#" alt="" />
              </div>
              <div className="contentInfo">
                <span>{item?.user.username}님의 루틴</span>
                <div className="selectFilter">
                  {getGenderDisplay(item?.for_gender)}
                  <div>{item?.for_age}대</div>
                  {item?.problem && item.problem.length > 0 && (
                    <div>{item.problem.join(", ")}</div>
                  )}
                </div>
                <div className="contentTag">
                  {item.tags && item.tags.length > 0 ? (
                    <ul>
                      {item.tags.map((tag, tagIndex) => (
                        <li key={tagIndex}>{tag}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul></ul>
                  )}
                </div>
                <div className="contentPrice">
                  종합 <span>₩ {item?.price_total}</span>
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
