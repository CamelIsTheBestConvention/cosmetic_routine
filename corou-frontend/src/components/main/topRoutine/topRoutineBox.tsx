import styled from "styled-components";
import BannerBox from "./bannerBox";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface skinRelations {
  attr_key: number;
}

interface routineItem {
  routine_key: string;
  for_age: number;
  for_gender: string;
  isLiked: boolean;
  price_total: number;
  average_rating: number;
  routine_name: string;
  reviews: number;
  user: { username: string };
  problem: number[];
  tags: string[];
  routine_skin_relations: skinRelations[];
}

interface allRoutineData {
  routine: routineItem;
}

const TopRoutineBox: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const topRoutineRef = useRef<HTMLDivElement>(null);
  const [topRoutine, setTopRoutine] = useState<routineItem[]>([]);
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await axios.get(`${backPort}/api/routine`);

        console.log(response.data);

        const sortedData = response.data.sort(
          (a: allRoutineData, b: allRoutineData) => {
            if (b.routine.average_rating !== a.routine.average_rating) {
              return b.routine.average_rating - a.routine.average_rating;
            }
            return b.routine.reviews - a.routine.reviews;
          }
        );

        setTopRoutine(sortedData);
        console.log("탑텐 데이터1", sortedData);
      } catch (error) {
        console.error("Error fetching routines:", error);
      }
    };

    fetchRoutines();
  }, []);

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
    const walk = (x - startX) * 2; // scroll-fast
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

  const handleDetailRoutine = (routine_key: string) => {
    navigate(`/routine/${routine_key}`);
  };

  return (
    <OutBox
      ref={topRoutineRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <TopRoutineBanner>
        {topRoutine.slice(0, 10).map((routine) => (
          <BannerBox
            key={routine?.routine_key}
            routine={routine}
            onClick={() => handleDetailRoutine(routine.routine_key)}
          />
        ))}
      </TopRoutineBanner>
    </OutBox>
  );
};

export default TopRoutineBox;

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

const TopRoutineBanner = styled.div`
  width: max-content;
  display: flex;
  justify-content: flex-start;
  cursor: grab;
  position: relative;

  &:active {
    cursor: grabbing;
  }
`;
