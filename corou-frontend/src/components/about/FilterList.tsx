import "../../scss/about/filterList.scss";
import notRoutine from "../../img/notRoutine.png";
import goodOff from "../../img/goodOff.png";
import goodOn from "../../img/goodOn.png";
import star from "../../img/star.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface skinRelations {
  routine_key: number;
  attr_key: number;
}

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
  routine_skin_relations: skinRelations[];
}

interface allRoutineData {
  routine: routineItem;
  attr_keys: number[];
  firstItemKey?: number;
}

interface searchData {
  searchQuery: string;
  filters: number[];
  items: allRoutineData[];
  setItems: React.Dispatch<React.SetStateAction<allRoutineData[]>>;
  minPrice: number;
  maxPrice: number;
  minCount: number;
  maxCount: number;
  itemAmount: number;
}

const FilterList: React.FC<searchData> = ({
  searchQuery,
  filters,
  items,
  setItems,
  minPrice,
  maxPrice,
  minCount,
  maxCount,
  itemAmount,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState("priceAsc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const token = sessionStorage.getItem("authToken");
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [displayItems, setDisplayItems] = useState<allRoutineData[]>([]);
  const itemsPerPage = 3;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  useEffect(() => {
    const fetchItems = async (query: string) => {
      setLoading(true);
      try {
        // 루틴 목록 가져오기
        const response = await axios.get(
          `${backPort}/api/routine${query ? `/search/${query}` : ""}`
        );

        // 체크박스 필터
        const filteringItems = response.data.filter((item: allRoutineData) => {
          if (filters.length === 0) return true;

          const attrKeyFilter = filters
            .filter((filter) => filter >= 1 && filter <= 11)
            .every((filter) => item.attr_keys.includes(filter));

          const genderFilter =
            (filters.includes(12) && item.routine.for_gender === "M") ||
            (filters.includes(13) && item.routine.for_gender === "F") ||
            (filters.includes(12) &&
              filters.includes(13) &&
              item.routine.for_gender === "A") ||
            (!filters.includes(12) && !filters.includes(13));

          const ageFilter =
            (filters.includes(14) && item.routine.for_age === 10) ||
            (filters.includes(15) && item.routine.for_age === 20) ||
            (filters.includes(16) && item.routine.for_age === 30) ||
            (filters.includes(17) && item.routine.for_age === 40) ||
            (!filters.includes(14) &&
              !filters.includes(15) &&
              !filters.includes(16) &&
              !filters.includes(17));

          return attrKeyFilter && genderFilter && ageFilter;
        });

        // 각 루틴의 아이템 키 가져오기
        const updatedItems = await Promise.all(
          filteringItems.map(async (item: allRoutineData) => {
            console.log("현재 아이템", item);
            try {
              const itemResponse = await axios.get(
                `${backPort}/api/routine/${item?.routine.routine_key}`
              );
              const firstItemKey =
                itemResponse.data.routineDetails[0]?.item_key;
              itemAmount = itemResponse.data.routineDetails.length;
              return {
                ...item,
                firstItemKey,
              };
            } catch (error) {
              console.error(
                `루틴의 제품 목록을 가져오는 중 에러 (${item.routine.routine_key}):`,
                error
              );
              return item;
            }
          })
        );

        // 가격 및 개수 필터링 추가
        const finalItems = updatedItems.filter((item: allRoutineData) => {
          const price = item.routine.price_total;
          const itemCount = itemAmount || 1;

          const isWithinPriceRange = price >= minPrice && price <= maxPrice;
          const isWithinCountRange =
            itemCount >= minCount && itemCount <= maxCount;

          return isWithinPriceRange && isWithinCountRange;
        });

        console.log("최종 필터링된 루틴", finalItems);

        // setItems(updatedItems);
        setItems(finalItems);
        setDisplayItems(finalItems.slice(0, itemsPerPage));
      } catch (err) {
        console.error("아이템 가져오기 실패", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems(searchQuery);
  }, [searchQuery, filters, minCount, maxCount, minPrice, maxPrice]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setDisplayItems((prevItems) => [
        ...prevItems,
        ...items.slice(prevItems.length, prevItems.length + itemsPerPage),
      ]);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value;
    setSortOrder(selectedOrder);

    const sortedArray = [...items];

    switch (selectedOrder) {
      case "priceAsc":
        sortedArray.sort(
          (a, b) => a.routine.price_total - b.routine.price_total
        );
        break;
      case "priceDesc":
        sortedArray.sort(
          (a, b) => b.routine.price_total - a.routine.price_total
        );
        break;
      case "ratingAsc":
        sortedArray.sort(
          (a, b) => a.routine.average_rating - b.routine.average_rating
        );
        break;
      case "ratingDesc":
        sortedArray.sort(
          (a, b) => b.routine.average_rating - a.routine.average_rating
        );
        break;
      default:
        break;
    }

    setItems(sortedArray);
    setDisplayItems(sortedArray.slice(0, itemsPerPage));
  };

  const toggleLike = (index: number) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isLiked: !item.routine.isLiked } : item
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
    return (
      <div style={{ textAlign: "center" }}>
        <p>{error}</p>
      </div>
    );
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
        {displayItems && displayItems.length > 0 ? (
          displayItems.map((item, index) => (
            <div
              className="itemListWrapper"
              key={item?.routine.routine_key}
              onClick={() => handleRoutineClick(item?.routine.routine_key)}
            >
              <div className="itemListTitle">
                <div className="itemListFirstTitle">
                  <div>{item?.routine.routine_name}</div>
                  <div>
                    <img
                      src={item.routine.isLiked ? goodOn : goodOff}
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
                    {Math.ceil(item?.routine.average_rating * 10) / 10}{" "}
                    <span>({item?.routine.reviews})</span>
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
                  <span>{item?.routine.user.username}님의 루틴</span>
                  <div className="selectFilter">
                    {getGenderDisplay(item?.routine.for_gender)}
                    <div>{item?.routine.for_age}대</div>
                    {item?.routine.problem &&
                      item.routine.problem.length > 0 && (
                        <div>{item.routine.problem.join(", ")}</div>
                      )}
                  </div>
                  <div className="contentTag">
                    {item.routine.tags && item.routine.tags.length > 0 ? (
                      <ul>
                        {item.routine.tags.map((tag, tagIndex) => (
                          <li key={tagIndex}>{tag}</li>
                        ))}
                      </ul>
                    ) : (
                      <ul></ul>
                    )}
                  </div>
                  <div className="contentPrice">
                    종합 <span>₩ {item?.routine.price_total}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="notItemWrapper">
            <div>
              <img src={notRoutine} alt="루틴 정보가 없습니다." />
            </div>
            <p>루틴 정보가 없습니다.</p>
          </div>
        )}
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
