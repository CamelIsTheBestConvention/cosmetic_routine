import Star from "../../img/star.png";
import "../../scss/detail/detailInfo.scss";

const DetailInfo: React.FC = () => {
  return (
    <>
      <div className="detailInfoWrapper">
        <h4>꿀광피부 루틴</h4>
        <div className="detailInfoReview">
          <img src={Star} alt="평점" />
          <span>
            4.9 <span>(1,192)</span>
          </span>
          <span>리뷰 조회</span>
        </div>
      </div>
    </>
  );
};
export default DetailInfo;
