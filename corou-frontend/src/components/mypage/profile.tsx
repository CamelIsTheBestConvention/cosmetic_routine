import { useEffect, useState } from "react";
import "../../scss/mypage/profile.scss";
import CommonTag from "../common/commonTag";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface userProfile {
  username: string;
  email: string;
  gender: string;
  password: string;
  birth_date: string;
  profileImg: string;
  problem: string[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<userProfile | null>(null);
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState<boolean>(false);
  const userKey = sessionStorage.getItem("userKey");

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (token) {
      setHasToken(true);
      axios
        .get(`${backPort}/api/user/${userKey}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.error("프로필 조회 실패", error);
          setProfile(null);
        });
    } else {
      setHasToken(false);
    }
  }, [backPort]);

  const moveProfileEdit = () => {
    navigate("/mypage/profileEdit", { state: { profile } });
  };

  return (
    <>
      <div className="profileWrapper">
        {hasToken ? (
          <>
            <div className="profileImg">
              <div>
                <img
                  src={profile?.profileImg}
                  alt={`${profile?.username} 프로필 이미지`}
                />
              </div>
              <p>{profile?.username}</p>
            </div>
            <div className="selectFilter">
              {/* {profile?.trouble.map((item, index) => (
                <CommonTag key={index} tagName={item} />
              ))} */}
            </div>
            <button onClick={moveProfileEdit}>프로필 수정</button>
          </>
        ) : (
          <div className="goLoginBox">
            <p>로그인 또는 회원가입을 해주세요.</p>
            <button onClick={() => navigate("/login")}>로그인하러 가기</button>
          </div>
        )}
      </div>
    </>
  );
};
export default Profile;
