import Star from "../../img/star.png";
import "../../scss/detail/detailInfo.scss";
import CommonTag from "../common/commonTag";

interface detailCheckData {
  check: string[];
}

const DetailCheck: React.FC<detailCheckData> = ({ check }) => {
  return (
    <>
      <div className="detailCheckWrapper">
        <CommonTag tagName={check} />
        <CommonTag tagName={check} />
      </div>
    </>
  );
};
export default DetailCheck;
