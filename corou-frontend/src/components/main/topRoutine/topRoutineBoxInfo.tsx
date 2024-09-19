import Star from "../../../img/star.png";
import goodOff from "../../../img/goodOff.png";
import goodOn from "../../../img/goodOn.png";
import "../../../scss/main/TopRoutineBoxInfo.scss";

interface routineItem {
  routine_key: string;
  for_age: number;
  for_gender: string;
  isLiked: boolean;
  price_total: number;
  average_rating: number;
  routine_name: string;
  reviews: number;
  user: { username: string };
  problem: number[];
  tags: string[];
}

interface routineData {
  routine: routineItem;
}

const TopRoutineBoxInfo: React.FC<routineData> = ({ routine }) => {
  return (
    <>
      <div className="infoWrapper">
        <div className="infoLeft">
          <h2>{routine?.routine_name}</h2>
          <div>
            <img src={Star} alt="평점" />
            <span>
              {routine?.average_rating} <span>({routine?.reviews})</span>
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
