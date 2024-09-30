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
import OrderList from "./pages/orderList";
import OrderDetail from "./pages/orderDetail";
import Notice from "./pages/notice";
import SetAddress from "./pages/setAddress";
import AddAddress from "./pages/addAddress";
import EditAddress from "./pages/editAddress";
import Cert from "./pages/cert";
import PopupAddress from "./pages/popupAddress";
import PaymentResult from "./pages/paymentResult";
import EditRoutine from "./pages/EditRoutine";
import AttrChange from "./pages/attrChange";
import PwChange from "./pages/pwChange";
import PrivateRoute from "./privateRoute";

function Routing() {
  return (
    <TotalWrapper>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* private path == PrivateRoute */}
          <Route exact path="/" element={<Main />} />
          <Route exact path="/login" element={<SocialLogin />} />
          <Route exact path="/login/email" element={<EmailLogin />} />
          <Route
            exact
            path="/kakao/oauth"
            element={<PrivateRoute element={<Redirection />} />}
          />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/mypage" element={<Mypage />} />
          <Route exact path="/mypage/notice" element={<Notice />} />

          <Route
            exact
            path="/mypage/setAddress"
            element={<PrivateRoute element={<SetAddress />} />}
          />
          <Route
            exact
            path="/mypage/addAddress"
            element={<PrivateRoute element={<AddAddress />} />}
          />
          <Route
            exact
            path="/mypage/editAddress/:id"
            element={<PrivateRoute element={<EditAddress />} />}
          />
          <Route
            exact
            path="/mypage/orderList"
            element={<PrivateRoute element={<OrderList />} />}
          />
          <Route
            exact
            path="/mypage/orderList/:id"
            element={<PrivateRoute element={<OrderDetail />} />}
          />
          <Route
            exact
            path="/mypage/profileEdit"
            element={<PrivateRoute element={<ProfileEdit />} />}
          />
          <Route
            exact
            path="/mypage/profileEdit/attrChange"
            element={<PrivateRoute element={<AttrChange />} />}
          />
          <Route
            exact
            path="/mypage/profileEdit/pwChange"
            element={<PrivateRoute element={<PwChange />} />}
          />
          <Route exact path="/routine" element={<AboutRoutine />} />
          <Route
            exact
            path="/routine/add"
            element={<PrivateRoute element={<AddRoutine />} />}
          />
          <Route exact path="/routine/:id" element={<DetailRoutine />} />
          <Route
            exact
            path="/routine/:id/edit"
            element={<PrivateRoute element={<EditRoutine />} />}
          />
          <Route exact path="/item" element={<Ranking />} />
          <Route exact path="/item/:id" element={<RankingDetail />} />
          <Route
            exact
            path="/order"
            element={<PrivateRoute element={<Mart />} />}
          />
          <Route
            exact
            path="/order/cert"
            element={<PrivateRoute element={<Cert />} />}
          />
          <Route
            exact
            path="/popup"
            element={<PrivateRoute element={<PopupAddress />} />}
          />
          <Route
            exact
            path="/pay/result"
            element={<PrivateRoute element={<PaymentResult />} />}
          />
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
