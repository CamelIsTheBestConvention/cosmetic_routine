import styled from "styled-components";
import Signup1 from "../components/signup/signup1";
import Signup2 from "../components/signup/signup2";
import Signup3 from "../components/signup/signup3";
import BackHeader from "../components/common/backHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
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
      <SignupWrapper>
        <BackHeader onBack={handleBack} />
        {step === 1 && <Signup1 onStepChange={handleStepChange} />}
        {step === 2 && <Signup2 onStepChange={handleStepChange} />}
        {step === 3 && <Signup3 />}
      </SignupWrapper>
    </>
  );
};
export default Signup;

const SignupWrapper = styled.div`
  width: 55%;
  margin: 0 auto;
`;
