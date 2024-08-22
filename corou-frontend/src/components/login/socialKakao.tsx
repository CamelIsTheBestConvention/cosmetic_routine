import styled from "styled-components";
import kakaoIcon from "../../img/kakao.png";

const SocialKakao: React.FC = () => {
  return (
    <>
      <KakaoBtnWrapper>
        <KakaoBtn>
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
