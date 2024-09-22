import { useNavigate } from "react-router-dom";
import MainFooter from "../components/common/mainFooter";
import AboutHeader from "../components/common/aboutHeader";
import { useEffect, useState } from "react";
import axios from "axios";

interface addressData {
  address_key: number;
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
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const userKey = sessionStorage.getItem("userKey");
  const [addressList, setAddressList] = useState<addressData[]>([]);
  const [hasToken, setHasToken] = useState(false);
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
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
          console.log(response.data);
        })
        .catch((error) => {
          console.error("프로필 조회 실패", error);
          setAddressList([]);
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

  const handleEditAddress = (address_key: number) => {
    console.log(address_key);
    navigate(`/mypage/editAddress/${address_key}`);
  };

  const handledelAddress = async (address_key: number) => {
    if (window.confirm("배송지를 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(
          `${backPort}/api/user/${userKey}/address/${address_key}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("주소 삭제 성공:", response.data);
        navigate("/mypage/setAddress");
      } catch (error) {
        console.error("주소 삭제 중 오류 발생:", error);
      }
    }
  };

  return (
    <>
      <AboutHeader Title="배송지" onBack={handleBack} />
      <div>
        <span onClick={handleAddAddress}>배송지 추가</span>
      </div>
      <div>
        {addressList?.length > 0 ? (
          addressList?.map((address) => (
            <div key={address?.address_key}>
              <div>
                <h3>{address?.name}</h3>
                <div>
                  <span onClick={() => handleEditAddress(address?.address_key)}>
                    수정
                  </span>
                  <span onClick={() => handledelAddress(address?.address_key)}>
                    삭제
                  </span>
                </div>
              </div>
              <div>
                {/* <span>{address?.username}</span> */}
                <span>{address?.addr}</span>
                <span>{address?.addr_detail}</span>
              </div>
              {address?.is_default === "Y" && <div>기본 배송지</div>}
            </div>
          ))
        ) : (
          <div>등록한 배송지가 없습니다.</div>
        )}
      </div>
      <MainFooter />
    </>
  );
};
export default SetAddress;
