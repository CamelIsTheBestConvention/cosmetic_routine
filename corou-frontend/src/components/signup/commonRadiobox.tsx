import styled from "styled-components";

const CommonRadioBox = ({ label, name }: { label: string; name: string }) => {
  return (
    <>
      <Label>
        <HiddenRadioButton type="radio" name={name} />
        <RadioButtonText>{label}</RadioButtonText>
      </Label>
    </>
  );
};
export default CommonRadioBox;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenRadioButton = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const RadioButtonText = styled.div`
  width: 100%;
  border: 3px solid rgba(255, 164, 228, 0.5);
  border-radius: 13px;
  padding: 10px 10px;
  margin-bottom: 5px;
  font-size: 16px;
  text-align: center;
  outline: none;
  color: #848484;

  ${HiddenRadioButton}:checked + & {
    background-color: #ffa4e4;
    color: white;
    font-weight: bold;
  }
`;
