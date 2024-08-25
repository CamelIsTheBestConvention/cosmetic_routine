import Star from "../../../img/star.png";
import goodOff from "../../../img/goodOff.png";
import goodOn from "../../../img/goodOn.png";
import "../../../scss/main/TopRoutineBoxInfo.scss";

const TopRoutineBoxInfo: React.FC = () => {
  return (
    <>
      <div className="infoWrapper">
        <div className="infoLeft">
          <h2>꿀광피부 루틴</h2>
          <div>
            <img src={Star} alt="평점" />
            <span>
              4.9 <span>(1,192)</span>
            </span>
          </div>
        </div>
        <div className="infoRight">
          <img src={goodOff} alt="좋아요" />
        </div>
      </div>
    </>
  );
};
export default TopRoutineBoxInfo;
