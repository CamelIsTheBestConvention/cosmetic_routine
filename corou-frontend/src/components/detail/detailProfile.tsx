import "../../scss/detail/detailInfo.scss";

interface detailProfileData {
  profileImg: string;
  profileNickname: string;
}

const DetailProfile: React.FC<detailProfileData> = ({
  profileImg,
  profileNickname,
}) => {
  return (
    <>
      <div className="detailProfileWrapper">
        <div>
          <img src={`/assets/user/2.png`} alt="프로필" />
        </div>
        <div>
          <span>{profileNickname}님의 루틴</span>
          <span>
            피부타입 <span>64%</span> 일치
          </span>
        </div>
      </div>
    </>
  );
};
export default DetailProfile;
