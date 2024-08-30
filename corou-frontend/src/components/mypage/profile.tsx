import "../../scss/mypage/profile.scss";

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
          <div>건성</div>
          <div>남성</div>
          <div>30대</div>
          <div>민감성</div>
          <div>겨울쿨</div>
          <div>등</div>
          <div>등등</div>
        </div>
        <button>프로필 수정</button>
      </div>
    </>
  );
};
export default Profile;
