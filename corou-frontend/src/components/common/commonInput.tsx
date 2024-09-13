import styled from "styled-components";

interface CommonInputProps {
  typeValue: string;
  placeholderValue: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CommonInput: React.FC<CommonInputProps> = ({
  typeValue,
  placeholderValue,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <>
      <Input
        type={typeValue}
        placeholder={placeholderValue}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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
`;
