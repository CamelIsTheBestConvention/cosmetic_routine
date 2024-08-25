import styled from "styled-components";

const CategoryBox = ({ imgName, alt, title }) => {
  return (
    <>
      <CategoryBoxWrapper>
        <img src={imgName} alt={alt} />
        <p>{title}</p>
      </CategoryBoxWrapper>
    </>
  );
};
export default CategoryBox;

const CategoryBoxWrapper = styled.div`
  width: 20%;
  padding: 5px 0;
  display: flex;
  flex-direction: column;

  img {
    width: 25px;
    margin: 0 auto;
  }

  p {
    text-align: center;
    font-size: 13px;
  }
`;
