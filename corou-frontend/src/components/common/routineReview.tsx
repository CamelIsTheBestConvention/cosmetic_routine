import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import emptyStar from "../../img/emptyStar.png";
import halfStar from "../../img/halfStar.png";
import filledStar from "../../img/filledStar.png";

interface ReviewItem {
  review_key: number;
  review_content: string;
  rating: number;
}

interface ReviewProps {
  routine_key: number;
}

const MAX_RATING = 5;

const RoutineReview: React.FC<ReviewProps> = ({ routine_key }) => {
  const [reviewText, setReviewText] = useState<string>("");
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${backPort}/api/routine/${routine_key}/review`
      );
      console.log("루틴리뷰", response.data);
      setReviews(response.data);
    } catch (error) {
      console.error("리뷰를 가져오는 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [routine_key]);

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleAddReview = async () => {
    if (reviewText.trim() !== "") {
      try {
        console.log(reviewText, rating);
        const response = await axios.post(
          `/api/routine/${routine_key}/review`,
          {
            review_content: reviewText,
            rating: rating,
          }
        );

        const newReview: ReviewItem = {
          review_key: response.data?.review_key,
          review_content: reviewText,
          rating: 5,
        };

        setReviews((prevReviews) => [...prevReviews, newReview]);
        setReviewText("");
        setRating(0);
      } catch (error) {
        console.error("리뷰를 작성하는 중 오류가 발생했습니다.", error);
      }
    }
  };

  // hoverRating을 설정하는 핸들러
  const handleMouseMove = (index: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // 마우스 위치 계산
    const halfStar = x < rect.width / 2; // 반별 계산
    setHoverRating(index + (halfStar ? 0.5 : 1));
  };

  // 평점을 확정하는 핸들러
  const handleClickRating = (index: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const halfStar = x < rect.width / 2;
    setRating(index + (halfStar ? 0.5 : 1)); // 평점 설정
  };

  // 마우스가 벗어나면 hoverRating을 초기화
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <>
      <ReviewWrapper>
        <Stars>
          {[...Array(MAX_RATING)].map((_, index) => (
            <Star
              key={index}
              filled={hoverRating >= index + 1 || rating >= index + 1}
              halfFilled={
                (hoverRating >= index + 0.5 && hoverRating < index + 1) ||
                (rating >= index + 0.5 && rating < index + 1)
              }
              onMouseMove={(e) => handleMouseMove(index, e)}
              onClick={(e) => handleClickRating(index, e)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </Stars>
        <textarea
          value={reviewText}
          onChange={handleReviewChange}
          placeholder="리뷰를 입력하세요"
        />
        <button onClick={handleAddReview}>리뷰 작성</button>

        {/* 작성된 리뷰 리스트 */}
        <ReviewList>
          {reviews.map((review) => (
            <ReviewItem key={review.review_key}>
              {review?.review_content}
            </ReviewItem>
          ))}
        </ReviewList>
      </ReviewWrapper>
    </>
  );
};
export default RoutineReview;

const ReviewWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  /* border: 1px solid black; */
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    margin-bottom: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Stars = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Star = styled.div<{ filled: boolean; halfFilled: boolean }>`
  width: 30px;
  height: 30px;
  background: ${({ filled, halfFilled }) =>
    filled
      ? `url(${filledStar})`
      : halfFilled
      ? `url(${halfStar})`
      : `url(${emptyStar})`};
  background-size: cover;
  cursor: pointer;
`;

const ReviewList = styled.ul`
  width: 100%;
  list-style-type: none;
  padding: 0;
`;

const ReviewItem = styled.li`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;
