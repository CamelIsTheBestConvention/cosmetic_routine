import styled from "styled-components";

interface routineKeyData {
  routine_key: string;
}

const TopRoutineBoxImg: React.FC<routineKeyData> = ({ routine_key }) => {
  return (
    <>
      <TopRoutineBoxImgWrapper>
        <img
          src={`/assets/item/${routine_key}.jpg`}
          alt={`Routine ${routine_key}`}
        />
      </TopRoutineBoxImgWrapper>
    </>
  );
};
export default TopRoutineBoxImg;

const TopRoutineBoxImgWrapper = styled.div`
  width: 100%;
  height: 50%;
  background-color: #d9d9d9;
  margin: 40px 0 0 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
