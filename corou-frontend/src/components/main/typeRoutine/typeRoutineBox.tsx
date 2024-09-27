import styled from "styled-components";
import BannerBox from "./bannerBox";
import { useEffect, useRef, useState } from "react";
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

interface skinRelations {
  routine_key: number;
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

const TypeRoutineBox: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const topRoutineRef = useRef<HTMLDivElement>(null);
  const [typeRoutine, setTypeRoutine] = useState<routineItem[]>([]);
  const [userData, setUserData] = useState<userProfile | null>(null);
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const userKey = sessionStorage.getItem("userKey");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backPort}/api/user/${userKey}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [backPort, userKey]);

  useEffect(() => {
    const fetchRoutines = async () => {
      if (userData) {
        try {
          const currentYear = new Date().getFullYear();
          const birthYear = new Date(userData.birth_date).getFullYear();
          const age = Math.floor((currentYear - birthYear) / 10) * 10;
          console.log("나이", age);

          const response = await axios.get(`${backPort}/api/routine`, {
            params: {
              for_age: age,
              for_gender: userData.gender,
            },
          });
          console.log(response.data);
          setTypeRoutine(response.data);
          console.log("피부맞춤 데이터", response.data);
        } catch (error) {
          console.error("Error fetching routines:", error);
        }
      }
    };

    fetchRoutines();
  }, [userData, backPort]);

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

  const handleDetailRoutine = (routine_key: string) => {
    navigate(`/routine/${routine_key}`);
  };

  const handleNextRoutine = () => {
    navigate("/routine");
  };

  return (
    <>
      <OutBox
        ref={topRoutineRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {token ? (
          typeRoutine.length > 0 ? (
            <TypeRoutineBanner>
              {typeRoutine.slice(0, 3).map((routine) => (
                <BannerBox
                  key={routine.routine_key}
                  routine={routine}
                  onClick={() => handleDetailRoutine(routine.routine_key)}
                />
              ))}
            </TypeRoutineBanner>
          ) : (
            <NoRoutineBox>
              <p>맞춤 루틴이 없습니다.</p>
              <p>루틴 페이지로 이동하시겠습니까?</p>
              <button onClick={handleNextRoutine}>이동하기</button>
            </NoRoutineBox>
          )
        ) : (
          <NoLoginBox>
            <p>로그인이 필요합니다.</p>
            <button onClick={() => navigate("/login")}>로그인하기</button>
          </NoLoginBox>
        )}
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

const NoRoutineBox = styled.div`
  width: 100%;
  text-align: center;

  p {
    &:nth-child(1) {
      font-size: 20px;
      font-weight: bold;
    }
    &:nth-child(2) {
      font-size: 14px;
      color: #848484;
    }
  }

  button {
    padding: 10px 20px;
    margin-bottom: 20px;
    background-color: #ff5cd0;
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const NoLoginBox = styled.div`
  width: 100%;
  text-align: center;

  p {
    font-size: 18px;
    font-weight: bold;
  }

  button {
    padding: 10px 20px;
    margin-bottom: 20px;
    background-color: #ff5cd0;
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;
