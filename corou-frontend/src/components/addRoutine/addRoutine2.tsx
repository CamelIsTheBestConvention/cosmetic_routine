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
    new Array(grade).fill({ order: "", description: "", itemName: "" })
  );
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  useEffect(() => {
    setAllRoutineItems(
      new Array(grade).fill({ order: "", description: "", itemName: "" })
    );
  }, [grade]);

  // useEffect(() => {
  //   const sum = searchResults.reduce(
  //     (acc, product) => acc + parseFloat(product.price || "0"),
  //     0
  //   );
  //   setTotalPrice(sum);
  // }, [searchResults]);

  const handleRoutineItemChange = (
    index: number,
    key: keyof (typeof routineItems)[0],
    value: string
  ) => {
    const updatedItems = [...allRoutineItems];
    updatedItems[index] = { ...updatedItems[index], [key]: value };
    setAllRoutineItems(updatedItems);
    dispatch(setRoutineItem(updatedItems[index]));

    if (key === "itemName" && value.length > 2) {
      searchItemData(value);
    }
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

  const handleProductSelect = (
    index: number,
    productName: string,
    productPrice: string
  ) => {
    const updatedItems = [...allRoutineItems];
    updatedItems[index] = { ...updatedItems[index], itemName: productName };
    setAllRoutineItems(updatedItems);
    dispatch(setRoutineItem(updatedItems[index]));
    setSearchResults([]);
  };

  const isButtonDisabled = allRoutineItems.every(
    (item) =>
      item.order.trim() !== "" &&
      item.description.trim() !== "" &&
      item.itemName.trim() !== ""
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
                value={item.order}
                onChange={(e) =>
                  handleRoutineItemChange(index, "order", e.target.value)
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
            />
            <ItemSearchWrapper>
              <CommonInput
                typeValue="text"
                placeholderValue="제품명"
                value={item.itemName}
                onChange={(e) =>
                  handleRoutineItemChange(index, "itemName", e.target.value)
                }
              />
              {searchResults.length > 0 && (
                <SearchResults>
                  {searchResults.map((product, productIndex) => (
                    <ProductItem
                      key={productIndex}
                      // onClick={
                      //   () => handleProductSelect(index, product.name, product.price);
                      // }
                    >
                      {/* <span>{product.name}</span>
                      <span>₩ {product.price}</span> */}
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
          <NextBtn onClick={onNext} disabled={!isButtonDisabled} />
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
