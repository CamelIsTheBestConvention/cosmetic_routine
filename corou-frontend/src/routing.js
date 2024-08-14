import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Main from "./pages/main";
import AboutRoutine from "./pages/aboutRoutine";

function Routing() {
  return (
    <TotalWrapper>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/about" element={<AboutRoutine />} />
        </Routes>
      </BrowserRouter>
    </TotalWrapper>
  );
}
export default Routing;

const TotalWrapper = styled.div`
  width: 40%;
  min-width: 430px;
  background-color: white;
  margin: 0 auto;
  border-left: 1px solid black;
  border-right: 1px solid black;
  position: relative;
`;
