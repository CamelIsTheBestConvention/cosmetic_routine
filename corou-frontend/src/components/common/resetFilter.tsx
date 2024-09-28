import styled from "styled-components";

interface resetFilterData {
  resetFilter: () => void;
}

const ResetFilter: React.FC<resetFilterData> = ({ resetFilter }) => {
  return (
    <>
      <ResetFilterBtn onClick={resetFilter}>필터 초기화</ResetFilterBtn>
    </>
  );
};
export default ResetFilter;

const ResetFilterBtn = styled.span`
  float: right;
  font-size: 14px;
  color: #848484;
  margin: 10px 20px 10px 0;
  cursor: pointer;

  &:hover {
    color: #ff7f7f;
  }
`;
