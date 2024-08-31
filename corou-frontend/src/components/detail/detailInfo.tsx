import "../../scss/detail/detailInfo.scss";
import DetailProfile from "./detailProfile";
import DetailTitle from "./detailTitle";
import DetailCheck from "./detailCheck";
import DetailTag from "./detailTag";
import DetailGrade from "./detailGrade";
import DetailBtnBox from "./detailBtnBox";

const DetailInfo: React.FC = () => {
  return (
    <>
      <div className="detailInfoWrapper">
        <h4>꿀광피부 루틴</h4>
        <DetailTitle />
        <DetailProfile />
        <DetailCheck />
        <DetailTag />
        <DetailGrade />
        <DetailBtnBox />
      </div>
    </>
  );
};
export default DetailInfo;
