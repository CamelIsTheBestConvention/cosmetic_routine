import styled from "styled-components";

interface btnType {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

const CompleteBtn: React.FC<btnType> = ({ text, onClick, disabled }) => {
  return (
    <>
      <CompleteBtnCss onClick={onClick} disabled={disabled}>
        {text}
      </CompleteBtnCss>
    </>
  );
};
export default CompleteBtn;

const CompleteBtnCss = styled.button`
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
