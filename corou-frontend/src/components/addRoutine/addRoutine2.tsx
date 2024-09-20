import styled from "styled-components";
import PageCount from "../common/pageCount";
import CommonInput from "../common/commonInput";
import { useEffect, useRef, useState } from "react";
import NextBtn from "../signup/nextBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setRoutineItem } from "../../redux/slice/addRoutineSlice";
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

const AddRoutine2: React.FC<NextProps> = ({ onNext }) => {
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
  const [searchResults, setSearchResults] = useState<itemData[][]>(
    new Array(grade).fill([])
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [searchQueries, setSearchQueries] = useState<string[]>(
    new Array(grade).fill("")
  );
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setAllRoutineItems(
      new Array(grade).fill(null).map((_, index) => ({
        step_number: index + 1,
        step_name: "",
        description: "",
        item_key: "",
        item_name: "",
      }))
    );
  }, [grade]);

  useEffect(() => {
    if (routineItems.length < grade) {
      setAllRoutineItems([
        ...routineItems,
        ...new Array(grade - routineItems.length)
          .fill(null)
          .map((_, index) => ({
            step_number: routineItems.length + index + 1,
            step_name: "",
            description: "",
            item_key: "",
            item_name: "",
          })),
      ]);
    } else {
      setAllRoutineItems(
        routineItems.map((item, index) => ({
          ...item,
          step_number: index + 1,
        }))
      );
    }
  }, [grade, routineItems]);

  const handleProductSelect = (index: number, product: itemData) => {
    const updatedItems = [...allRoutineItems];
    updatedItems[index] = {
      ...updatedItems[index],
      item_key: product.item_key,
      item_name: product.item_name,
    };

    setAllRoutineItems(updatedItems);
    dispatch(setRoutineItem({ index, item: updatedItems[index] }));
    const updatedResults = [...searchResults];
    updatedResults[index] = [];
    setSearchResults(updatedResults);
    const updatedQueries = [...searchQueries];
    updatedQueries[index] = "";
    setSearchQueries(updatedQueries);

    const resultTotalPrice = updatedItems.reduce((acc, item) => {
      const selectedProduct = searchResults[index].find(
        (searchItem) => searchItem.item_key === item.item_key
      );
      return acc + (selectedProduct ? selectedProduct.item_price : 0);
    }, 0);

    setTotalPrice(resultTotalPrice);

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

  // useEffect(() => {
  //   const delayDeboundceFn = setTimeout(() => {
  //     if (searchQuery.length > 1) {
  //       searchItemData(searchQuery);
  //     }
  //   }, 300);

  //   return () => clearTimeout(delayDeboundceFn);
  // }, [searchQuery]);

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
            <CommonInput
              typeValue="text"
              placeholderValue="설명"
              value={item.description}
              onChange={(e) =>
                handleRoutineItemChange(index, "description", e.target.value)
              }
              onBlur={(e) =>
                handleInputBlur(index, "description", e.target.value)
              }
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
export default AddRoutine2;

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

const SearchResults = styled.div`
  width: 97%;
  border: 3px solid rgba(255, 164, 228, 0.5);
  border-radius: 14px;
  margin-top: -10px;
`;
const ProductItem = styled.div``;
