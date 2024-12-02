import Star from "../../img/star.png";
import "../../scss/detail/detailInfo.scss";
import CommonTag from "../common/commonTag";
import { routineFilters } from "../../data/Data";

interface detailCheckData {
  problem: number[];
  age: number;
  gender: string;
}

const DetailCheck: React.FC<detailCheckData> = ({ problem, age, gender }) => {
  console.log(problem);

  const getGenderDisplay = (gender: string) => {
    switch (gender) {
      case "M":
        return <CommonTag tagName="남성" />;
      case "F":
        return <CommonTag tagName="여성" />;
      case "A":
        return (
          <>
            <CommonTag tagName="남성" />
            <CommonTag tagName="여성" />
          </>
        );
      default:
        return <CommonTag tagName="null" />;
    }
  };

  return (
    <>
      {/* <div className="detailCheckWrapper">
        <CommonTag tagName={problem[0]} />
        <CommonTag tagName={problem[1]} />
      </div> */}
      <div className="detailCheckWrapper">
        {getGenderDisplay(gender)}
        <CommonTag tagName={`${age}대`} />
        {problem &&
          problem.length > 0 &&
          problem.map((relation, index) => {
            if (relation >= 1 && relation <= 5) {
              return (
                <CommonTag key={index} tagName={routineFilters[relation - 1]} />
              );
            } else if (relation >= 10 && relation <= 15) {
              return (
                <CommonTag key={index} tagName={routineFilters[relation - 5]} />
              );
            }
            return null;
          })}
      </div>
    </>
  );
};
export default DetailCheck;
