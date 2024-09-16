import styled from "styled-components";
import PageCount from "../common/pageCount";
import CommonInput from "../common/commonInput";
import { useEffect, useState } from "react";
import NextBtn from "../signup/nextBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setRoutineItem } from "../../redux/slice/addRoutineSlice";
import axios from "axios";

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
    new Array(grade).fill({ step_name: "", description: "", item_key: 0 })
  );
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  useEffect(() => {
    setAllRoutineItems(
      new Array(grade).fill({ step_name: "", description: "", item_key: 0 })
    );
  }, [grade]);

  useEffect(() => {
    // if (routineItems.length > 0) {
    //   setAllRoutineItems(routineItems);
    // } else {
    //   setAllRoutineItems(
    //     new Array(grade).fill({ step_name: "", description: "", item_key: 0 })
    //   );
    // }
    if (routineItems.length < grade) {
      setAllRoutineItems([
        ...routineItems,
        ...new Array(grade - routineItems.length).fill({
          step_name: "",
          description: "",
          item_key: 0,
        }),
      ]);
    } else {
      setAllRoutineItems(routineItems.slice(0, grade));
    }
  }, [grade, routineItems]);

  // useEffect(() => {
  //   const sum = searchResults.reduce(
  //     (acc, product) => acc + parseFloat(product.price || "0"),
  //     0
  //   );
  //   setTotalPrice(sum);
  // }, [searchResults]);

  const handleRoutineItemChange = (
    index: number,
    key: keyof (typeof allRoutineItems)[0],
    value: string
  ) => {
    const updatedItem = { ...allRoutineItems[index], [key]: value };
    const updatedItems = [...allRoutineItems];
    updatedItems[index] = updatedItem;

    setAllRoutineItems(updatedItems);

    if (key === "item_key" && value.length > 2) {
      searchItemData(value);
    }
    dispatch(setRoutineItem({ index, item: updatedItem }));
  };

  const handleInputBlur = (
    index: number,
    key: keyof (typeof allRoutineItems)[0],
    value: string
  ) => {
    handleRoutineItemChange(index, key, value);
  };

  const searchItemData = async (query: string) => {
    try {
      const response = await axios.get(`${backPort}/api/item/${query}`);
      console.log(response.data);

      setSearchResults(response.data.item || []);
    } catch (error) {
      console.error("제품 검색 중 오류 발생", error);
    }
  };

  // const handleProductSelect = (
  //   index: number,
  //   productName: string,
  //   productPrice: string
  // ) => {
  //   const updatedItems = [...allRoutineItems];
  //   updatedItems[index] = { ...updatedItems[index], itemName: productName };
  //   setAllRoutineItems(updatedItems);
  //   dispatch(setRoutineItem(updatedItems[index]));
  //   setSearchResults([]);
  // };

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
                typeValue="text"
                placeholderValue="제품명"
                value={item.item_key}
                onChange={(e) =>
                  handleRoutineItemChange(index, "item_key", e.target.value)
                }
                onBlur={(e) =>
                  handleInputBlur(index, "item_key", e.target.value)
                }
              />
              {searchResults.length > 0 && (
                <SearchResults>
                  {searchResults.map((product, productIndex) => (
                    <ProductItem key={productIndex}>
                      {/* Render search results here */}
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

const SearchResults = styled.div``;
const ProductItem = styled.div``;
