import { useNavigate } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import styled from "styled-components";
import "../scss/mypage/edit.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import MainFooter from "../components/common/mainFooter";

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
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const userKey = sessionStorage.getItem("userKey");
  const token = sessionStorage.getItem("authToken");
  const [profile, setProfile] = useState<userProfile | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(false);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
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
          console.log(response.data);
        })
        .catch((error) => {
          console.error("프로필 조회 실패", error);
          setProfile(null);
        });
    } else {
      setHasToken(false);
    }
  }, [backPort]);

  const handlePwChangeNext = () => {
    navigate("/mypage/profileEdit/pwChange");
  };

  const handleAttrChangeNext = () => {
    navigate("/mypage/profileEdit/attrChange");
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
          <div className="readOnlyInput">
            <span>이메일: </span>
            <input type="text" value={profile?.email} />
          </div>
          <div className="readOnlyInput">
            <span>생년월일: </span>
            <input type="text" value={profile?.birth_date} />
          </div>
          <div className="readOnlyInput">
            <span>성별: </span>
            {profile?.gender === "M" ? (
              <input type="text" value="남성" />
            ) : (
              <input type="text" value="여성" />
            )}
          </div>
          {/* 비밀번호 변경 버튼 */}
          <button className="inputCheckBtn" onClick={handlePwChangeNext}>
            비밀번호 변경
          </button>
          {/* 트러블 특성 변경 버튼 */}
          <button className="inputCheckBtn" onClick={handleAttrChangeNext}>
            피부 타입 변경
          </button>
          {/* 변경 완료 버튼 */}
          {/* <button className="completeBtn" onClick={handleEditProfile}>
            완료
          </button> */}
        </div>
      </ProfileEditWrapper>
      <MainFooter />
    </>
  );
};
export default ProfileEdit;

const ProfileEditWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
