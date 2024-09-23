import styled from "styled-components";
import kakaoIcon from "../../img/kakao.png";
import React, { useEffect } from "react";

const SocialKakao: React.FC = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
  // const REST_API_KEY = '1d58cfd45d9c1334bd7de9f31c356e51';
  const REDIRECT_URI = "http://localhost:3001/kakao/oauth";
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = kakaoLink;
  };

  return (
    <>
      <KakaoBtnWrapper>
        <KakaoBtn onClick={loginHandler}>
          <img src={kakaoIcon} alt="kakaoIcon" />
          카카오로 시작하기
        </KakaoBtn>
      </KakaoBtnWrapper>
    </>
  );
};
export default SocialKakao;

const KakaoBtnWrapper = styled.div`
  width: 80%;
  margin: 50px auto 0 auto;
`;

const KakaoBtn = styled.button`
  width: 100%;
  border: none;
  border-radius: 7px;
  background-color: #fce436;
  font-size: 14px;
  font-weight: bold;
  padding: 15px 0;
  position: relative;
  cursor: pointer;

  img {
    width: 15px;
    position: absolute;
    left: 5%;
    top: 40%;
  }
`;
