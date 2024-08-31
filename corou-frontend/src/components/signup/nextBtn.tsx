import styled from "styled-components";

interface NextBtnProps {
  onClick: () => void;
  disabled: boolean;
}

const NextBtn: React.FC<NextBtnProps> = ({ onClick, disabled }) => {
  return (
    <>
      <NextBtnCss onClick={onClick} disabled={disabled}>
        다음
      </NextBtnCss>
    </>
  );
};
export default NextBtn;

const NextBtnCss = styled.button<{ disabled: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? "#ccc" : "rgba(255, 164, 228, 0.7)"};
  border: none;
  border-radius: 10px;
  padding: 10px 0;
  margin-top: 20px;
  outline: none;
  font-size: 14px;
  font-weight: bold;
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
