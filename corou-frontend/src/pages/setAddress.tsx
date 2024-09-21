import { useNavigate } from "react-router-dom";
import MainFooter from "../components/common/mainFooter";
import AboutHeader from "../components/common/aboutHeader";
import { useEffect, useState } from "react";
import axios from "axios";

interface addressData {
  addr_key: number;
  user_key: number;
  name: string;
  addr: string;
  addr_detail: string;
  zip: string;
  tel: string;
  request: string;
  is_default: string;
}

const SetAddress: React.FC = () => {
  const navigate = useNavigate();
  const [isDefault, setIsDefault] = useState(true);
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const userKey = sessionStorage.getItem("userKey");
  const [addressList, setAddressList] = useState<addressData[] | null>([]);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (token) {
      setHasToken(true);
      axios
        .get(`${backPort}/api/user/${userKey}/address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAddressList(response.data);
        })
        .catch((error) => {
          console.error("프로필 조회 실패", error);
          setAddressList(null);
        });
    } else {
      setHasToken(false);
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddAddress = () => {
    navigate("/mypage/addAddress");
  };

  return (
    <>
      <AboutHeader Title="배송지" onBack={handleBack} />
      <div>
        <span onClick={handleAddAddress}>배송지 추가</span>
      </div>
      <div>
        <div>
          <div>
            <h3>집배송(배송지 이름)</h3>
            <div>
              <span>수정</span>
              <span>삭제</span>
            </div>
          </div>
          <div>
            <span>성함</span>
            <span>주소</span>
            <span>상세 주소</span>
          </div>
          {isDefault && <div>기본 배송지</div>}
        </div>
      </div>
      <MainFooter />
    </>
  );
};
export default SetAddress;
