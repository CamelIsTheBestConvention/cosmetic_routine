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
        <CommonTag tagName={check[0]} />
        <CommonTag tagName={check[1]} />
      </div>
    </>
  );
};
export default DetailCheck;
