import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import emptyStar from "../../img/emptyStar.png";
import halfStar from "../../img/halfStar.png";
import filledStar from "../../img/filledStar.png";

interface ReviewItem {
  review_key: number;
  rating: number;
  review_content: string;
  review_at: string;
  user_key: number;
  username: string;
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
  const token = sessionStorage.getItem("authToken");

  const fetchUser = async (user_key: number): Promise<string> => {
    try {
      const response = await axios.get(`${backPort}/api/user/${user_key}`);
      return response.data.username;
    } catch (error) {
      console.error("유저 정보를 가져오는 중 오류가 발생했습니다.", error);
      return "유저 정보가 없습니다.";
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${backPort}/api/routine/${routine_key}/review`
      );

      const fetchedReviews = await Promise.all(
        response.data.map(async (review: ReviewItem) => {
          const username = await fetchUser(review.user_key);
          console.log(username);
          return { ...review, username };
        })
      );

      console.log("루틴리뷰", response.data);
      setReviews(fetchedReviews);
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
          `${backPort}/api/routine/${routine_key}/review`,
          {
            review_content: reviewText,
            rating: rating,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newReview: ReviewItem = {
          review_key: response.data?.review_key,
          review_content: reviewText,
          review_at: response.data?.review_at,
          rating: rating,
          username: response.data?.username,
          user_key: response.data?.user_key,
        };

        const username = await fetchUser(newReview.user_key);
        setReviews((prevReviews) => [
          ...prevReviews,
          { ...newReview, username },
        ]);

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
          placeholder="리뷰를 입력하세요.(100글자 제한)"
          maxLength={100}
        />
        <button onClick={handleAddReview}>리뷰 작성</button>

        {/* 작성된 리뷰 리스트 */}
        <ReviewList>
          {reviews.map((review) => (
            <ReviewItem key={review.review_key}>
              <ReviewProfile>
                <div>
                  <img
                    src={`/assets/user/${review.user_key}.png`}
                    alt={`${review?.username} 이미지`}
                  />
                </div>
                <p>{review?.username}</p>
              </ReviewProfile>
              <ReviewContent>
                <ReviewContentTitle>
                  <Stars>
                    {[...Array(MAX_RATING)].map((_, index) => (
                      <ReviewListStar
                        key={index}
                        filled={review.rating >= index + 1}
                        halfFilled={
                          review.rating >= index + 0.5 &&
                          review.rating < index + 1
                        }
                      />
                    ))}
                  </Stars>
                  <span>{review?.review_at}</span>
                </ReviewContentTitle>
                <ReviewContentContent>
                  {review.review_content}
                </ReviewContentContent>
              </ReviewContent>
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
    border: 2px solid #ffa4e4;
    border-radius: 12px;
    margin-bottom: 10px;
    padding: 5px;
    resize: none;
  }

  button {
    padding: 10px 20px;
    margin-bottom: 20px;
    background-color: #ff5cd0;
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: #fa7cd6;
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
  display: flex;
`;

const ReviewProfile = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 20px auto 0;

  div {
    width: 60px;
    height: 60px;
    border: 3px solid #ffa4e4;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  p {
    text-align: center;
    font-size: 13px;
    margin: 5px 0;
  }
`;

const ReviewContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ReviewListStar = styled.div<{ filled: boolean; halfFilled: boolean }>`
  width: 12px;
  height: 12px;
  background: ${({ filled, halfFilled }) =>
    filled
      ? `url(${filledStar})`
      : halfFilled
      ? `url(${halfStar})`
      : `url(${emptyStar})`};
  background-size: cover;
`;

const ReviewContentTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  span {
    font-size: 12px;
  }
`;
const ReviewContentContent = styled.div`
  width: 95%;
  height: 80px;
  padding: 5px;
  border: 2px solid #ffa4e4;
  border-radius: 12px;
  font-size: 14px;
  margin-top: -10px;
  overflow-y: auto;
`;
