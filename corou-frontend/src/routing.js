import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Main from "./pages/main";
import AboutRoutine from "./pages/aboutRoutine";
import SocialLogin from "./pages/socialLogin";
import EmailLogin from "./pages/emailLogin";
import Signup from "./pages/signup";
import Mypage from "./pages/mypage";
import Mart from "./pages/mart";
import DetailRoutine from "./pages/detailRoutine";
import AddRoutine from "./pages/addRoutine";

function Routing() {
  return (
    <TotalWrapper>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/about" element={<AboutRoutine />} />
          <Route exact path="/login" element={<SocialLogin />} />
          <Route exact path="/login/email" element={<EmailLogin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/mypage" element={<Mypage />} />
          <Route exact path="/mart" element={<Mart />} />
          <Route exact path="/detail" element={<DetailRoutine />} />
          <Route exact path="/add" element={<AddRoutine />} />
        </Routes>
      </BrowserRouter>
    </TotalWrapper>
  );
}
export default Routing;

const TotalWrapper = styled.div`
  width: 30%;
  min-width: 430px;
  min-height: 100vh;
  background-color: white;
  margin: 0 auto;
  border-left: 1px solid black;
  border-right: 1px solid black;
  position: relative;
`;
