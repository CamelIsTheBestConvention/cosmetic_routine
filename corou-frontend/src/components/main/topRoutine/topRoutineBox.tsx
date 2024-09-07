import styled from "styled-components";
import BannerBox from "./bannerBox";
import { useEffect, useRef, useState } from "react";

const TopRoutineBox: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (bannerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - bannerRef.current.offsetLeft);
      setScrollLeft(bannerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && bannerRef.current) {
      const x = e.pageX - bannerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      bannerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <TopRoutineBanner ref={bannerRef} onMouseDown={handleMouseDown}>
      <BannerBox />
      <BannerBox />
      <BannerBox />
    </TopRoutineBanner>
  );
};

export default TopRoutineBox;

const TopRoutineBanner = styled.div`
  width: max-content;
  margin: 20px 0;
  overflow-x: auto;
  position: relative;
  display: flex;
  justify-content: flex-start;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
