import styled from "styled-components";

const CategoryBox = ({ imgName, alt, title, onClick }) => {
  return (
    <>
      <CategoryBoxWrapper onClick={onClick}>
        <img src={imgName} alt={alt} />
        <p>{title}</p>
      </CategoryBoxWrapper>
    </>
  );
};
export default CategoryBox;

const CategoryBoxWrapper = styled.div`
  width: 20%;
  /* padding: 5px 0; */
  display: flex;
  flex-direction: column;
  cursor: pointer;

  img {
    width: 20px;
    margin: 0 auto;
  }

  p {
    text-align: center;
    font-size: 12px;
  }
`;
