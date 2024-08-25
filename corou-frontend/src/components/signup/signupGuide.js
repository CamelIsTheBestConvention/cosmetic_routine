import styled from "styled-components";

const SignupGuide = ({ text }) => {
  return (
    <>
      <SignupGuideWrapper>{text}</SignupGuideWrapper>
    </>
  );
};
export default SignupGuide;

const SignupGuideWrapper = styled.div`
  margin: 25px 0 15px 0;
  font-weight: 700;
  width: 100%;
`;
