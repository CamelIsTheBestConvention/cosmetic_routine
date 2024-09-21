import Star from "../../img/star.png";
import "../../scss/detail/detailInfo.scss";

interface detailTitleData {
  reviewPoint: number;
  reviewMember: number;
}

const DetailTitle: React.FC<detailTitleData> = ({
  reviewPoint,
  reviewMember,
}) => {
  return (
    <>
      <div className="detailTitleReview">
        <img src={Star} alt="평점" />
        <span>
          {Math.ceil(reviewPoint * 10) / 10} <span>({reviewMember})</span>
        </span>
        <span>리뷰 조회</span>
      </div>
    </>
  );
};
export default DetailTitle;
