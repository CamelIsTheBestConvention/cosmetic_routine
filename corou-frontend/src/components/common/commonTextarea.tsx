import styled from "styled-components";

interface CommonInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const CommonTextarea: React.FC<CommonInputProps> = ({
  value,
  onChange,
  onBlur,
}) => {
  return (
    <>
      <Textarea value={value} onChange={onChange} onBlur={onBlur} />
    </>
  );
};
export default CommonTextarea;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  border: 3px solid rgba(255, 164, 228, 0.5);
  border-radius: 13px;
  margin-bottom: 10px;
  font-size: 14px;
  outline: none;
  resize: none;
`;
