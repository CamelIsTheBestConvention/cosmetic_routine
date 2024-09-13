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
import Ranking from "./pages/ranking";
import RankingDetail from "./pages/rankingDetail";
import Redirection from "./pages/redirection";
import ScrollToTop from "./components/common/scrollToTop";
import ProfileEdit from "./pages/profileEdit";

function Routing() {
  return (
    <TotalWrapper>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/about" element={<AboutRoutine />} />
          <Route exact path="/login" element={<SocialLogin />} />
          <Route exact path="/login/email" element={<EmailLogin />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/mypage" element={<Mypage />} />
          <Route exact path="/mypage/profileEdit" element={<ProfileEdit />} />
          <Route exact path="/order" element={<Mart />} />
          <Route exact path="/detail" element={<DetailRoutine />} />
          <Route exact path="/add" element={<AddRoutine />} />
          <Route exact path="/item" element={<Ranking />} />
          <Route exact path="/item/:id" element={<RankingDetail />} />
          <Route exact path="/kakao/oauth" element={<Redirection />} />
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
