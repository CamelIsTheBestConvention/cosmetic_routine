import styled from "styled-components";
import BannerBox from "./bannerBox";
import { useEffect, useRef, useState } from "react";

const TypeRoutineBox: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const topRoutineRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (topRoutineRef.current?.offsetLeft || 0));
    setScrollLeft(topRoutineRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (topRoutineRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (topRoutineRef.current) {
      topRoutineRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };

    document.addEventListener("mouseup", handleMouseUpGlobal);
    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  return (
    <>
      <OutBox
        ref={topRoutineRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <TypeRoutineBanner>
          <BannerBox />
          <BannerBox />
          <BannerBox />
        </TypeRoutineBanner>
      </OutBox>
    </>
  );
};
export default TypeRoutineBox;

const OutBox = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 20px 0;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
  user-select: none;
`;

const TypeRoutineBanner = styled.div`
  width: max-content;
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
`;
