import styled from "styled-components";

const OtherBtn = () => {
  return (
    <>
      <>
        <OtherBtnWrapper>
          <Btn>이메일 회원가입</Btn>
          <Slash> | </Slash>
          <Btn>이메일 로그인</Btn>
        </OtherBtnWrapper>
      </>
    </>
  );
};
export default OtherBtn;

const OtherBtnWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: #848484;
`;

const Slash = styled.span`
  margin: 0 5px;
`;

const Btn = styled.span`
  cursor: pointer;
`;
