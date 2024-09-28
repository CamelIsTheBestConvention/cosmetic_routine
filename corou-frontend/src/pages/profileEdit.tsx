import { useLocation, useNavigate } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import styled from "styled-components";
import "../scss/mypage/edit.scss";
import axios from "axios";
import { useState } from "react";

interface userProfile {
  user_key: number;
  username: string;
  email: string;
  password: string;
  gender: string;
  birth_date: string;
}

const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile;
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const userKey = sessionStorage.getItem("userKey");
  const token = sessionStorage.getItem("authToken");
  const [userData, setUserData] = useState<userProfile>(profile);
  console.log(profile);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditProfile = async () => {
    try {
      const response = await axios.put(
        `${backPort}/api/user/${userKey}`,
        {
          attributes: profile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("프로필 수정 중 에러 발생");
    }
  };

  return (
    <>
      <ProfileEditWrapper>
        <AboutHeader Title="프로필 수정" onBack={handleBack} />
        {/* 프로필이미지 */}
        <div className="editWrapper">
          <div className="profileEdit">
            <div className="editImg">
              <img src="/assets/user/2.png" alt={profile?.username} />
              <div>+</div>
            </div>
            {/* 유저이름 */}
            <p>{profile?.username}</p>
          </div>
          {/* 읽기전용 이메일 */}
          <div className="readEmail">
            <span>이메일: </span>
            <input type="text" value={profile?.email} />
          </div>
          {/* 비밀번호 변경 버튼 */}
          <button className="inputCheckBtn">비밀번호 변경</button>
          {/* 트러블 특성 변경 버튼 */}
          <button className="inputCheckBtn">피부 타입 변경</button>
          {/* 변경 완료 버튼 */}
          <button className="completeBtn" onClick={handleEditProfile}>
            완료
          </button>
        </div>
      </ProfileEditWrapper>
    </>
  );
};
export default ProfileEdit;

const ProfileEditWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
