import styled from "styled-components";

interface SettingName {
  name: string;
  onClick: () => void;
}

const SettingBox: React.FC<SettingName> = ({ name, onClick }) => {
  return (
    <>
      <SettingBoxWrapper onClick={onClick}>
        <div>{name}</div>
        <div>&gt;</div>
      </SettingBoxWrapper>
    </>
  );
};
export default SettingBox;

const SettingBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 13px;
  margin-bottom: 20px;
`;
