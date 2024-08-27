import styled from "styled-components"
import PageCount from "../common/pageCount"
import PageGuide from "../common/pageGuide"
import CommonInput from "../common/commonInput"
import { useState } from "react"
import NextBtn from "../signup/nextBtn"

interface NextProps {
  onNext: () => void;
}

const AddRoutine2:React.FC<NextProps> = ({onNext}) => {
  const [routineTitle, setRoutineTitle] = useState("")
  const [itemName, setItemName] = useState("")

  return (
    <>
      <AddRoutine2Wrapper>
        <PageCount count="2" />
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
        <RoutineGradeWrapper>
          <RoutineGradeTitle>
            <span>1단계: </span>
            <CommonInput typeValue="text" placeholderValue="예) 세안" value={routineTitle} onChange={(e) => setRoutineTitle(e.target.value)} />
          </RoutineGradeTitle>
          <CommonInput typeValue="text" placeholderValue="예) 제품명" value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        </RoutineGradeWrapper>
      </AddRoutine2Wrapper>
        <RoutinePriceWrapper>
          <div>
            <span>종합 <span>₩ 000,000</span></span>
            <NextBtn onClick={onNext} />
          </div>
        </RoutinePriceWrapper>
    </>
  )
}
export default AddRoutine2

const AddRoutine2Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const RoutineGradeWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`

const RoutineGradeTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  span {
    width: 30%;
  }

  input {
    margin: 0
  }
`

const RoutinePriceWrapper = styled.div`
  width: 30%;
  min-width: 430px;
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 1000;

  div {
    width: 70%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
  
      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
`