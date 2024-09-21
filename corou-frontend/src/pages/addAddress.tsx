import { useNavigate } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import CompleteBtn from "../components/common/completeBtn";
import { useState } from "react";
import axios from "axios";
import MainFooter from "../components/common/mainFooter";

interface addressData {
  name: string;
  //   username: string;
  addr: string;
  addr_detail: string;
  zip: string;
  tel: string;
  request: string;
  is_default: string;
}

const AddAddress: React.FC = () => {
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState<addressData>({
    name: "",
    // username: "",
    addr: "",
    addr_detail: "",
    zip: "",
    tel: "",
    request: "",
    is_default: "N",
  });
  const backPort = process.env.REACT_APP_BACKEND_PORT;

  const handleBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddressData({
      ...addressData,
      [name]: type === "checkbox" ? (checked ? "Y" : "N") : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem("authToken");

    try {
      const userKey = sessionStorage.getItem("userKey");
      console.log("작성주소", addressData);
      const response = await axios.post(
        `${backPort}/api/user/${userKey}/address`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("주소 저장 성공:", response.data);
      navigate("/mypage/setAddress");
    } catch (error) {
      console.error("주소 저장 중 오류 발생:", error);
    }
  };

  return (
    <>
      <AboutHeader Title="배송지 추가" onBack={handleBack} />
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <span>배송지 이름</span>
            <input
              type="text"
              name="name"
              placeholder="예) 우리 집"
              value={addressData.name}
              onChange={handleInputChange}
            />
          </div>
          {/* <div>
            <span>성함</span>
            <input
              type="text"
              name="username"
              placeholder="예) 문미새"
              value={addressData.username}
              onChange={handleInputChange}
            />
          </div> */}
          <div>
            <span>주소</span>
            <input
              type="text"
              name="addr"
              placeholder="예) 서울특별시 강남구 역삼동"
              value={addressData.addr}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>상세 주소</span>
            <input
              type="text"
              name="addr_detail"
              placeholder="예) 미새아파트 101동 101호"
              value={addressData.addr_detail}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>우편번호</span>
            <input
              type="text"
              name="zip"
              placeholder="예) 12345"
              value={addressData.zip}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>전화번호</span>
            <input
              type="text"
              name="tel"
              placeholder="예) 01012345678"
              value={addressData.tel}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>요청</span>
            <input
              type="text"
              name="request"
              placeholder="예) 문 앞에 놓아주세요."
              value={addressData.request}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>기본 배송지로 설정</span>
            <input
              type="checkbox"
              name="is_default"
              checked={addressData.is_default === "Y"}
              onChange={handleInputChange}
            />
          </div>
          <CompleteBtn
            text="저장"
            onClick={() => handleSubmit}
            disabled={false}
          />
        </div>
      </form>
      <MainFooter />
    </>
  );
};
export default AddAddress;
