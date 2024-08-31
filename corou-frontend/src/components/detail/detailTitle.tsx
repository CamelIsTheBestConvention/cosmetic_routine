import Star from "../../img/star.png";
import "../../scss/detail/detailInfo.scss";

const DetailTitle: React.FC = () => {
  return (
    <>
      <div className="detailTitleReview">
        <img src={Star} alt="평점" />
        <span>
          4.9 <span>(1,192)</span>
        </span>
        <span>리뷰 조회</span>
      </div>
    </>
  );
};
export default DetailTitle;
