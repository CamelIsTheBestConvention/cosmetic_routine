import styled from "styled-components";

interface checkBoxType {
  label: string;
  value: string | number;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonCheckBox: React.FC<checkBoxType> = ({
  label,
  value,
  checked,
  onChange,
}) => {
  return (
    <>
      <Label>
        <HiddenCheckbox
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <CheckboxText>{label}</CheckboxText>
      </Label>
    </>
  );
};
export default CommonCheckBox;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const CheckboxText = styled.div`
  width: 100%;
  border: 3px solid rgba(255, 164, 228, 0.5);
  border-radius: 13px;
  padding: 10px 10px;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
  outline: none;
  color: #848484;

  ${HiddenCheckbox}:checked + & {
    background-color: #ffa4e4;
    color: white;
  }
`;
