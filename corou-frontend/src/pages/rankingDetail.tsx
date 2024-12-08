import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AboutHeader from "../components/common/aboutHeader";
import ItemReview from "../components/common/itemReview";
import MainFooter from "../components/common/mainFooter";
import ItemBtnBox from "../components/ranking/itemBtnBox";

interface ItemDetails {
  average_rating: number;
  category: string;
  description: string;
  item_key: number;
  item_name: string;
  item_price: number;
}

const RankingDetail: React.FC<ItemDetails> = () => {
  const { id } = useParams<{ id: string }>();
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`${backPort}/api/item/key/${id}`);
        console.log(response.data);
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
        <AboutHeader Title="" onBack={handleBackPage} />
        <DetailItemBox>
          <ItemImg>
            <img
              src={`/assets/item/${itemDetails.item_key}.jpg`}
              alt={itemDetails.item_name}
            />
          </ItemImg>
          <ItemInfo>
            <h2>{itemDetails.item_name}</h2>
            <ItemDescription>{itemDetails.description}</ItemDescription>
            <ItemPrice>
              <span>정가</span>
              <span>{itemDetails.item_price.toLocaleString()}원 / 50ml</span>
            </ItemPrice>
            {/* <ItemEffect>제품 효과 박스</ItemEffect> */}
          </ItemInfo>
        </DetailItemBox>
      </RankingDetailWrapper>
      <ItemBtnBox item_key={itemDetails?.item_key} />
      <ItemReview item_key={itemDetails?.item_key} />
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
  margin: 20% auto 40px auto;
`;

const ItemImg = styled.div`
  width: 310px;
  height: 310px;
  aspect-ratio: 1/1;
  object-fit: cover;
  margin: 0 auto;
  border: 1px solid #d9d9d9;

  img {
    width: 100%;
    height: 100%;
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
  margin-bottom: 20px;
`;

const ItemDescription = styled.div`
  width: 95%;
  margin: 0 auto 10px auto;
  height: 100px;
  border: 3px solid #ffa4e4;
  border-radius: 12px;
  padding: 5px;
  font-size: 17px;
`;
