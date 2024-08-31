import styled from "styled-components";

interface PwVisibleProps {
  onToggle: (checked: boolean) => void;
}

const PwVisible: React.FC<PwVisibleProps> = ({ onToggle }) => {
  const pwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  };

  return (
    <>
      <PwVisibleWrapper>
        <input type="checkbox" onChange={pwChange} />
        <span>비밀번호 표시</span>
      </PwVisibleWrapper>
    </>
  );
};
export default PwVisible;

const PwVisibleWrapper = styled.div`
  font-size: 12px;
  margin-left: 5px;
  display: flex;
  align-items: center;
`;
