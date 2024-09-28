import styled from "styled-components";
import AboutHeader from "../components/common/aboutHeader";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainFooter from "../components/common/mainFooter";
import {
  setTitle,
  setGender,
  setSkin,
  setAge,
  setProblem,
  setGrade,
  setRoutineItem,
  setTag,
  setItemList,
  setTotalPrice,
  resetAddRoutine,
} from "../redux/slice/editRoutineSlice";
import { useDispatch, useSelector } from "react-redux";
import EditRoutine1 from "../components/detail/editRoutine1";
import EditRoutine2 from "../components/detail/editRoutine2";
import EditRoutine3 from "../components/detail/editRoutine3";
import { RootState } from "../redux/store";
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

interface routineItem {
  step_number: number;
  step_name: string;
  item_key: string;
  description: string;
  item_name: string;
}

interface detailRoutine {
  step_number: number;
  step_name: string;
  routine_key: number;
  item_key: number;
  description: string;
}

interface skinRelations {
  routine_key: number;
  attr_key: number;
}

interface FormattedRoutineItem extends detailRoutine {
  item_name: string;
}

const EditRoutine: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const routineData = location.state?.routineData || null;
  const tagData = location.state?.tagData || [];
  const [genderList, setGenderList] = useState<string[]>([]);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const fetchFindItem = async (item_key: number) => {
    try {
      const response = await axios.get(`${backPort}/api/item/key/${item_key}`);
      return response.data;
    } catch (error) {
      console.error("아이템 가져오는 중 에러 발생", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllItemData = async () => {
      if (routineData) {
        let tempGenderList: string[] = [];

        if (routineData.for_gender === "A") {
          tempGenderList = ["M", "F"];
        } else if (routineData.for_gender === "M") {
          tempGenderList = ["M"];
        } else if (routineData.for_gender === "F") {
          tempGenderList = ["F"];
        }

        console.log(tempGenderList);

        setGenderList(tempGenderList);
        dispatch(setGender(tempGenderList));

        const problems = routineData.routine_skin_relations
          .filter(
            (relation: skinRelations) =>
              relation.attr_key >= 10 && relation.attr_key <= 15
          )
          .map((relation: skinRelations) => relation.attr_key);

        dispatch(setTitle(routineData.routine_name));
        dispatch(setGender(genderList));
        dispatch(setSkin(routineData.routine_skin_relations[0].attr_key));
        dispatch(setAge(routineData.for_age));
        dispatch(setProblem(problems));
        dispatch(setGrade(routineData.steps));

        const formattedRoutineItems: FormattedRoutineItem[] = await Promise.all(
          routineData.routineDetails.map(async (item: detailRoutine) => {
            const productData = await fetchFindItem(item.item_key);
            return {
              step_number: item.step_number,
              step_name: item.step_name,
              description: item.description,
              item_key: item.item_key,
              item_name: productData ? productData.item_name : "",
            };
          })
        );

        formattedRoutineItems.forEach((item, index) => {
          const routineItem: routineItem = {
            step_number: item.step_number,
            step_name: item.step_name,
            description: item.description,
            item_key: item.item_key.toString(),
            // item_name: item.item_name,
            item_name: "",
          };
          console.log(routineItem);
          dispatch(setRoutineItem({ index, item: routineItem }));
        });

        dispatch(setTag([...tagData]));
        dispatch(setItemList([]));
        dispatch(setTotalPrice(routineData.price_total));
      }
    };

    fetchAllItemData();
  }, [routineData, dispatch]);

  console.log("adsfas", routineData);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <AddRoutineWrapper>
        <AboutHeader Title={"루틴 등록"} onBack={handleBack} />
        {step === 1 && (
          <EditRoutine1 onNext={handleNext} genderList={genderList} />
        )}
        {step === 2 && <EditRoutine2 onNext={handleNext} />}
        {step === 3 && <EditRoutine3 routine_key={routineData.routine_key} />}
        <MainFooter />
      </AddRoutineWrapper>
    </>
  );
};
export default EditRoutine;

const AddRoutineWrapper = styled.div`
  width: 100%;
`;
