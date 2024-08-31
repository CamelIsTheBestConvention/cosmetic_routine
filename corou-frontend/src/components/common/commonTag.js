import styled from "styled-components";

const CommonTag = ({ tagName }) => {
  return (
    <>
      <TagNameBox>{tagName}</TagNameBox>
    </>
  );
};
export default CommonTag;

const TagNameBox = styled.div`
  font-size: 14px;
  border: 1px solid #c9c9c9;
  color: #848484;
  border-radius: 10px;
`;
