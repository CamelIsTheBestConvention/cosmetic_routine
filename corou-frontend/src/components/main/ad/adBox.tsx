import { useEffect, useState } from "react";
import styled from "styled-components";
import ad1 from "../../../img/adBanner/1.jpg";
import ad2 from "../../../img/adBanner/2.jpg";
import ad3 from "../../../img/adBanner/3.jpg";
import ad4 from "../../../img/adBanner/4.jpg";
import ad5 from "../../../img/adBanner/5.jpg";
import ad6 from "../../../img/adBanner/6.jpg";

const AdBox = () => {
  const images = [ad1, ad2, ad3, ad4, ad5, ad6];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <AdBoxWrapper>
        <BannerTrack currentIndex={currentIndex}>
          {images.map((image, index) => (
            <BannerBox key={index}>
              <img src={image} alt={`ad-banner-${index + 1}`} />
            </BannerBox>
          ))}
        </BannerTrack>
        <DotWrapper>
          {images.map((_, index) => (
            <Dot
              key={index}
              isActive={index === currentIndex}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </DotWrapper>
      </AdBoxWrapper>
    </>
  );
};

export default AdBox;

const AdBoxWrapper = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
  margin-bottom: 30px;
`;

const BannerTrack = styled.div<{ currentIndex: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(${(props) => -props.currentIndex * 100}%);
  transition: transform 0.5s ease-in-out;
`;

const BannerBox = styled.div`
  min-width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DotWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
`;

const Dot = styled.div<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? "#000" : "#ccc")};
  transition: background-color 0.3s ease;
  cursor: pointer;
`;
