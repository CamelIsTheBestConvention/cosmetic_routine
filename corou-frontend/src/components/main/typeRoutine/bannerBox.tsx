import styled from "styled-components";

interface routineItem {
  routine_key: string;
  for_age: number;
  for_gender: string;
  isLiked: boolean;
  price_total: number;
  average_rating: number;
  routine_name: string;
  reviews: number;
  user: { username: string };
  problem: number[];
  tags: string[];
}

interface routineData {
  routine: routineItem;
}

const BannerBox: React.FC<routineData> = ({ routine }) => {
  return (
    <>
      <BannerBoxWrapper>
        <BannerBoxImg>
          <img
            src={`/assets/item/${routine?.routine_key}.jpg`}
            alt={`Routine ${routine?.routine_key}`}
          />
        </BannerBoxImg>
        <BannerBoxTitle>{routine?.routine_name}</BannerBoxTitle>
      </BannerBoxWrapper>
    </>
  );
};
export default BannerBox;

const BannerBoxWrapper = styled.div`
  width: 200px;
  margin-right: 20px;
`;

const BannerBoxImg = styled.div`
  width: 200px;
  height: 200px;
  border: 3px solid #ffa4e4;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const BannerBoxTitle = styled.h2`
  text-align: center;
`;
