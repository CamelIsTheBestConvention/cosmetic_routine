import { useEffect, useState } from "react";
import "../../scss/mypage/profile.scss";
import CommonTag from "../common/commonTag";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface userProfile {
  nickname: string;
  profileImg: string;
  trouble: string[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<userProfile | null>(null);
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backPort}/api/user/self`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("프로필 조회 실패", error);
        setProfile(null);
      });
  }, []);

  const moveProfileEdit = () => {
    navigate("/mypage/profileEdit");
  };

  return (
    <>
      <div className="profileWrapper">
        <div className="profileImg">
          <div>
            <img
              src={profile?.profileImg}
              alt={`${profile?.nickname} 프로필`}
            />
          </div>
          <p>{profile?.nickname}</p>
        </div>
        <div className="selectFilter">
          {/* <CommonTag tagName="건성" />
          <CommonTag tagName="남성" />
          <CommonTag tagName="30대" />
          <CommonTag tagName="민감성" />
          <CommonTag tagName="겨울쿨" />
          <CommonTag tagName="등" />
          <CommonTag tagName="등등" /> */}
          {profile?.trouble.map((item, index) => (
            <CommonTag key={index} tagName={item} />
          ))}
        </div>
        <button onClick={moveProfileEdit}>프로필 수정</button>
      </div>
    </>
  );
};
export default Profile;
