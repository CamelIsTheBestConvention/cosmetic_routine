import "../../scss/mypage/profile.scss";
import CommonTag from "../common/commonTag";

const Profile: React.FC = () => {
  return (
    <>
      <div className="profileWrapper">
        <div className="profileImg">
          <div>
            <img src="#" alt="" />
          </div>
          <p>재남</p>
        </div>
        <div className="selectFilter">
          <CommonTag tagName="건성" />
          <CommonTag tagName="남성" />
          <CommonTag tagName="30대" />
          <CommonTag tagName="민감성" />
          <CommonTag tagName="겨울쿨" />
          <CommonTag tagName="등" />
          <CommonTag tagName="등등" />
        </div>
        <button>프로필 수정</button>
      </div>
    </>
  );
};
export default Profile;
