import "../../scss/detail/detailInfo.scss";

const DetailProfile: React.FC = () => {
  return (
    <>
      <div className="detailProfileWrapper">
        <div>{/* <img src="" alt="프로필" /> */}</div>
        <div>
          <span>재남님의 루틴</span>
          <span>
            피부타입 <span>64%</span> 일치
          </span>
        </div>
      </div>
    </>
  );
};
export default DetailProfile;
