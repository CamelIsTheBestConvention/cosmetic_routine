import Star from "../../img/star.png";
import "../../scss/detail/detailInfo.scss";
import CommonTag from "../common/commonTag";

const DetailCheck: React.FC = () => {
  return (
    <>
      <div className="detailCheckWrapper">
        <CommonTag tagName="건성" />
        <CommonTag tagName="남성" />
      </div>
    </>
  );
};
export default DetailCheck;
