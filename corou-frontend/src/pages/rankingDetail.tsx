import styled from "styled-components";
import BackHeader from "../components/common/backHeader";
import Lotion from "../img/화장품1.jpg";
import MainFooter from "../components/common/mainFooter";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface ItemDetails {
  itemName: string;
  price: string;
  volume: string;
  imageUrl: string;
  effect: string;
}

const RankingDetail: React.FC<ItemDetails> = () => {
  const { id } = useParams<{ id: string }>();
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);

  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`/api/items/${id}`);
        setItemDetails(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  if (!itemDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <RankingDetailWrapper>
        <BackHeader onBack={handleBackPage} />
        <DetailItemBox>
          <ItemImg>
            <img src={itemDetails.imageUrl} alt={itemDetails.itemName} />
          </ItemImg>
          <ItemInfo>
            <h3>{itemDetails.itemName}</h3>
            <ItemPrice>
              <span>정가</span>
              <span>
                {itemDetails.price}원 / {itemDetails.volume}ml
              </span>
            </ItemPrice>
            <ItemEffect>제품 효과 박스</ItemEffect>
          </ItemInfo>
        </DetailItemBox>
      </RankingDetailWrapper>
      <MainFooter />
    </>
  );
};
export default RankingDetail;

const RankingDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DetailItemBox = styled.div`
  width: 90%;
  margin: 20% auto 0 auto;
`;

const ItemImg = styled.div`
  width: 80%;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  margin: 0 auto;
  border: 1px solid #d9d9d9;

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  width: 80%;
  margin: 10% auto 0 auto;
`;

const ItemPrice = styled.div`
  display: flex;
  justify-content: flex-start;

  span {
    &:nth-child(1) {
      font-size: 14px;
      color: #848484;
      margin-right: 30px;
    }

    &:nth-child(2) {
      font-size: 14px;
      color: black;
    }
  }
`;

const ItemEffect = styled.div`
  width: 100%;
  height: 120px;
  border: 1px solid #d9d9d9;
  background-color: #d9d9d9;
  border-radius: 13px;
  margin-top: 10%;
`;
