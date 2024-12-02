import styled from "styled-components";

interface CommonInputProps {
  typeValue: string;
  placeholderValue: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
  readOnly?: boolean;
}

const CommonInput: React.FC<CommonInputProps> = ({
  typeValue,
  placeholderValue,
  value,
  onChange,
  onBlur,
  ref,
  readOnly,
}) => {
  return (
    <>
      <Input
        ref={ref}
        type={typeValue}
        placeholder={placeholderValue}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
      />
    </>
  );
};
export default CommonInput;

const Input = styled.input`
  width: 90%;
  border: 3px solid rgba(255, 164, 228, 0.5);
  border-radius: 13px;
  padding: 10px 10px;
  margin-bottom: 10px;
  font-size: 14px;
  outline: none;
  color: ${(props) => (props.readOnly ? "#a3a3a3" : "black")};
  background-color: ${(props) => (props.readOnly ? "#f0f0f0" : "white")};
  border-color: ${(props) =>
    props.readOnly ? "gray" : "rgba(255, 164, 228, 0.5)"};
`;
