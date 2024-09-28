import styled from "styled-components";
import PageCount from "../common/pageCount";
import CommonInput from "../common/commonInput";
import { useEffect, useRef, useState } from "react";
import NextBtn from "../signup/nextBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setRoutineItem,
  setTotalPrice,
  setItemList,
} from "../../redux/slice/addRoutineSlice";
import axios from "axios";

interface itemData {
  item_key: number;
  item_name: string;
  item_price: number;
  volume: number;
  average_rating: number;
  brand_name: string;
  category: string;
  description: string;
}

interface NextProps {
  onNext: () => void;
}

const EditRoutine2: React.FC<NextProps> = ({ onNext }) => {
  const dispatch = useDispatch();
  const grade = useSelector((state: RootState) => state.addRoutine.grade);
  const routineItems = useSelector(
    (state: RootState) => state.addRoutine.routineItem
  );
  const [allRoutineItems, setAllRoutineItems] = useState(
    new Array(grade).fill({
      step_number: 0,
      step_name: "",
      description: "",
      item_key: "",
      item_name: "",
    })
  );
  const [allItemList, setAllItemList] = useState(
    new Array(grade).fill({
      average_rating: 0,
      brand_name: "",
      category: "",
      description: "",
      item_key: 0,
      item_name: "",
      item_price: 0,
      volume: 0,
    })
  );
  const [searchResults, setSearchResults] = useState<itemData[][]>(
    new Array(grade).fill([])
  );
  const totalPrice = useSelector(
    (state: RootState) => state.addRoutine.totalPrice
  );
  const [searchQueries, setSearchQueries] = useState<string[]>(
    new Array(grade).fill("")
  );
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemList = useSelector((state: RootState) => state.addRoutine.itemList);

  useEffect(() => {
    // 남은 루틴 복구
    const updatedItems = new Array(grade).fill(null).map((_, index) => {
      if (index < routineItems.length) {
        return { ...routineItems[index], step_number: index + 1 };
      }
      return {
        step_number: index + 1,
        step_name: "",
        description: "",
        item_key: "",
        item_name: "",
      };
    });

    if (updatedItems.length < allRoutineItems.length) {
      for (let i = updatedItems.length; i < allRoutineItems.length; i++) {
        updatedItems[i] = {
          step_number: i + 1,
          step_name: "",
          description: "",
          item_key: "",
          item_name: "",
        };
      }
    }
    setAllRoutineItems(updatedItems);

    // 남은 아이템 리스트 복구
    const updatedItemsList = new Array(grade).fill(null).map((_, index) => {
      if (index < itemList.length) {
        return { ...itemList[index], step_number: index + 1 };
      }
      return {
        average_rating: 0,
        brand_name: "",
        category: "",
        description: "",
        item_key: 0,
        item_name: "",
        item_price: 0,
        volume: 0,
      };
    });

    setAllItemList(updatedItemsList);

    console.log("현재 가격", totalPrice);
    console.log("올루틴 아이템", allRoutineItems);
    console.log("올루틴 아이템 목록", allItemList);
    console.log("리덕스루틴아이템", routineItems);
    console.log("리덕스 루틴 아이템목록", itemList);
  }, [grade, itemList, dispatch]);

  useEffect(() => {
    const total = itemList.reduce((acc, item) => acc + item.item_price, 0);
    dispatch(setTotalPrice(total));
  }, [itemList, dispatch]);

  const handleProductSelect = (index: number, product: itemData) => {
    const updatedItems = [...allRoutineItems];

    const previousItem = updatedItems[index];
    const previousItemPrice =
      searchResults[index]?.find(
        (searchItem) => searchItem.item_key === previousItem.item_key
      )?.item_price || 0;

    updatedItems[index] = {
      ...updatedItems[index],
      item_key: product.item_key,
      item_name: product.item_name,
    };

    setAllRoutineItems(updatedItems);
    dispatch(setRoutineItem({ index, item: updatedItems[index] }));

    const updatedItemList = [...itemList];
    updatedItemList[index] = product;
    dispatch(setItemList(updatedItemList));

    const updatedResults = [...searchResults];
    updatedResults[index] = [];
    setSearchResults(updatedResults);

    const updatedQueries = [...searchQueries];
    updatedQueries[index] = "";
    setSearchQueries(updatedQueries);

    const selectedProductPrice = product.item_price;

    const newTotalPrice = totalPrice - previousItemPrice + selectedProductPrice;
    dispatch(setTotalPrice(newTotalPrice));

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRoutineItemChange = (
    index: number,
    key: keyof (typeof allRoutineItems)[0],
    value: string
  ) => {
    const updatedItem = { ...allRoutineItems[index], [key]: value };
    const updatedItems = [...allRoutineItems];
    updatedItems[index] = updatedItem;

    setAllRoutineItems(updatedItems);
    dispatch(setRoutineItem({ index, item: updatedItem }));

    if (key === "item_name") {
      const updatedQueries = [...searchQueries];
      updatedQueries[index] = value;
      setSearchQueries(updatedQueries);

      if (value.length > 1) {
        searchItemData(value, index);
      } else {
        const delayDeboundceFn = setTimeout(() => {
          const clearedQueries = [...searchQueries];
          clearedQueries[index] = "";
          setSearchQueries(clearedQueries);

          const clearedResults = [...searchResults];
          clearedResults[index] = [];
          setSearchResults(clearedResults);
        }, 300);

        return () => clearTimeout(delayDeboundceFn);
      }
    }
  };

  const searchItemData = async (query: string, index: number) => {
    console.log(`단계 ${index + 1}에서 "${query}" 검색`);
    try {
      const response = await axios.get(`${backPort}/api/item/search/${query}`);
      console.log(response.data);

      const updatedResults = [...searchResults];
      updatedResults[index] = response.data || [];
      setSearchResults(updatedResults);
    } catch (error) {
      console.error("제품 검색 중 오류 발생", error);
    }
  };

  const handleInputBlur = (
    index: number,
    key: keyof (typeof allRoutineItems)[0],
    value: string
  ) => {
    handleRoutineItemChange(index, key, value);
  };

  const isButtonDisabled = allRoutineItems.some(
    (item) =>
      !item.step_name?.trim() || !item.description?.trim() || !item.item_key
  );

  return (
    <>
      <AddRoutine2Wrapper>
        <PageCount count="2" />
        {allRoutineItems.map((item, index) => (
          <RoutineGradeWrapper key={index}>
            <RoutineGradeTitle>
              <span>{index + 1}단계: </span>
              <CommonInput
                typeValue="text"
                placeholderValue="예) 세안"
                value={item.step_name}
                onChange={(e) =>
                  handleRoutineItemChange(index, "step_name", e.target.value)
                }
                onBlur={(e) =>
                  handleInputBlur(index, "step_name", e.target.value)
                }
              />
            </RoutineGradeTitle>
            <CommonTextarea
              value={item.description}
              onChange={(e) =>
                handleRoutineItemChange(index, "description", e.target.value)
              }
              onBlur={(e) =>
                handleInputBlur(index, "description", e.target.value)
              }
              placeholder="설명 (100글자 제한)"
              maxLength={100}
            />
            <ItemSearchWrapper>
              <CommonInput
                ref={inputRef}
                typeValue="text"
                placeholderValue="제품명"
                value={item.item_name}
                onChange={(e) =>
                  handleRoutineItemChange(index, "item_name", e.target.value)
                }
                // onBlur={(e) =>
                //   handleInputBlur(index, "item_name", e.target.value)
                // }
              />
              {searchResults[index] && searchResults[index].length > 0 && (
                <SearchResults>
                  {searchResults[index].map((item, itemIndex) => (
                    <ProductItem
                      key={itemIndex}
                      onClick={() => handleProductSelect(index, item)}
                    >
                      <div className="martItemWrapper">
                        <div className="martItemImg">
                          <img
                            src={`/assets/item/${item?.item_key}.jpg`}
                            alt={`${item?.item_name} 이미지`}
                          />
                        </div>
                        <div className="martItemInfo">
                          <span>{item?.brand_name}</span>
                          <span>
                            {item?.item_name} & {item?.volume}ml
                          </span>
                          <p>₩ {item?.item_price}</p>
                        </div>
                      </div>
                    </ProductItem>
                  ))}
                </SearchResults>
              )}
            </ItemSearchWrapper>
          </RoutineGradeWrapper>
        ))}
      </AddRoutine2Wrapper>
      <RoutinePriceWrapper>
        <div>
          <span>
            종합 <span>₩ {totalPrice.toLocaleString()}</span>
          </span>
          <NextBtn onClick={onNext} disabled={isButtonDisabled} />
        </div>
      </RoutinePriceWrapper>
    </>
  );
};
export default EditRoutine2;

const AddRoutine2Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 150px;
`;

const RoutineGradeWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const RoutineGradeTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  span {
    width: 30%;
  }

  input {
    margin: 0;
  }
`;

const RoutinePriceWrapper = styled.div`
  width: 30%;
  min-width: 430px;
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 1000;
  margin-bottom: 50px;

  div {
    width: 70%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;

      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
`;

const ItemSearchWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const CommonTextarea = styled.textarea`
  width: 90% !important;
  height: 150px !important;
  border: 3px solid rgba(255, 164, 228, 0.5);
  border-radius: 13px;
  padding: 10px 10px;
  margin-bottom: 10px;
  font-size: 14px;
  outline: none;
  resize: none;
`;

const SearchResults = styled.div`
  width: 97%;
  border: 3px solid rgba(255, 164, 228, 0.5);
  border-radius: 14px;
  margin-top: -10px;
`;
const ProductItem = styled.div``;
