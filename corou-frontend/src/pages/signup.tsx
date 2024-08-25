import styled from "styled-components";
import Signup1 from "../components/signup/signup1";
import Signup2 from "../components/signup/signup2";
import Signup3 from "../components/signup/signup3";
import BackHeader from "../components/common/backHeader";
import { useState } from "react";

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <SignupWrapper>
        <BackHeader onBack={handleBack} />
        {step === 1 && <Signup1 onNext={handleNext} />}
        {step === 2 && <Signup2 onNext={handleNext} />}
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
