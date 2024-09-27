import styled from "styled-components";
import AboutHeader from "../components/common/aboutHeader";
import { useEffect, useState } from "react";
import AddRoutine1 from "../components/addRoutine/addRoutine1";
import AddRoutine2 from "../components/addRoutine/addRoutine2";
import AddRoutine3 from "../components/addRoutine/addRoutine3";
import { useLocation, useNavigate } from "react-router-dom";
import MainFooter from "../components/common/mainFooter";
import { resetAddRoutine } from "../redux/slice/addRoutineSlice";
import { useDispatch } from "react-redux";

const EditRoutine: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const routineData = location.state?.data;

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
        {step === 1 && <AddRoutine1 onNext={handleNext} />}
        {step === 2 && <AddRoutine2 onNext={handleNext} />}
        {step === 3 && <AddRoutine3 />}
        <MainFooter />
      </AddRoutineWrapper>
    </>
  );
};
export default EditRoutine;

const AddRoutineWrapper = styled.div`
  width: 100%;
`;
