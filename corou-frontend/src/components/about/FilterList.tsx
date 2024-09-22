import "../../scss/about/filterList.scss";
import sortFilter from "../../img/sort.png";
import goodOff from "../../img/goodOff.png";
import goodOn from "../../img/goodOn.png";
import star from "../../img/star.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  firstItemKey?: number;
}

interface searchData {
  searchQuery: string;
}

const FilterList: React.FC<searchData> = ({ searchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState<routineItem[]>([]);
  const [sortOrder, setSortOrder] = useState("priceAsc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const token = sessionStorage.getItem("authToken");

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current && buttonRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = wrapperRef.current;

        // 스크롤이 있으면 sticky, 없으면 absolute
        if (scrollHeight > clientHeight) {
          buttonRef.current.style.position = "sticky";
          buttonRef.current.style.bottom = "20px"; // 스크롤이 있을 때의 위치
        } else {
          buttonRef.current.style.position = "absolute";
          buttonRef.current.style.bottom = "20px"; // 스크롤이 없을 때의 위치
        }
      }
    };

    const wrapperElement = wrapperRef.current;
    wrapperElement?.addEventListener("scroll", handleScroll);

    // 초기 실행
    handleScroll();

    return () => {
      wrapperElement?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchItems = async (query: string) => {
      console.log(query);
      try {
        // 루틴 목록 가져오기
        const response = await axios.get(
          `${backPort}/api/routine${query ? `/search/${query}` : ""}`
        );
        console.log("데이터", response.data);

        // 각 루틴의 아이템 키 가져오기
        const updatedItems = await Promise.all(
          response.data.map(async (item: routineItem) => {
            try {
              const itemResponse = await axios.get(
                `${backPort}/api/routine/${item?.routine_key}`
              );
              const firstItemKey =
                itemResponse.data.routineDetails[0]?.item_key;
              console.log("첫번째 아이템키", firstItemKey);
              return {
                ...item,
                firstItemKey,
              };
            } catch (error) {
              console.error(
                `루틴의 제품 목록을 가져오는 중 에러 (${item.routine_key}):`,
                error
              );
              return item;
            }
          })
        );

        setItems(updatedItems);
      } catch (err) {
        console.error("아이템 가져오기 실패", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems(searchQuery);
  }, [backPort, searchQuery]);

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
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  const handleAddRoutine = () => {
    navigate("/add", { state: { from: location.pathname } });
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="filterListWrapper" ref={wrapperRef}>
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
            key={item?.routine_key}
            onClick={() => handleRoutineClick(item?.routine_key)}
          >
            <div className="itemListTitle">
              <div className="itemListFirstTitle">
                <div>{item?.routine_name}</div>
                <div>
                  <img
                    src={item.isLiked ? goodOn : goodOff}
                    alt="좋아요"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(index);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="itemListSecondTitle">
                <div>
                  <img src={star} alt="" />
                </div>
                <div>
                  {Math.ceil(item?.average_rating * 10) / 10}{" "}
                  <span>({item?.reviews})</span>
                </div>
              </div>
            </div>
            <div className="itemListContent">
              <div className="contentImg">
                <img
                  src={`/assets/item/${item?.firstItemKey}.jpg`}
                  alt="루틴 첫번째 제품이미지"
                />
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
        {token && (
          <div
            className="addRoutineBtn"
            onClick={handleAddRoutine}
            ref={buttonRef}
          >
            <span>+</span>
          </div>
        )}
      </div>
    </>
  );
};
export default FilterList;
