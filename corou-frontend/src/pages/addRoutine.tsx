import styled from "styled-components";
import AboutHeader from "../components/common/aboutHeader";
import { useEffect, useState } from "react";
import AddRoutine1 from "../components/addRoutine/addRoutine1";
import AddRoutine2 from "../components/addRoutine/addRoutine2";
import AddRoutine3 from "../components/addRoutine/addRoutine3";
import { useNavigate } from "react-router-dom";

const AddRoutine: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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
      </AddRoutineWrapper>
    </>
  );
};
export default AddRoutine;

const AddRoutineWrapper = styled.div`
  width: 100%;
`;
