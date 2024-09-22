import { useNavigate, useParams } from "react-router-dom";
import AboutHeader from "../components/common/aboutHeader";
import CompleteBtn from "../components/common/completeBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import MainFooter from "../components/common/mainFooter";
import styled from "styled-components";

interface addressData {
  address_name: string;
  name: string;
  addr: string;
  addr_detail: string;
  zip: string;
  tel: string;
  request: string;
  is_default: string;
}

const EditAddress: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userKey = sessionStorage.getItem("userKey");
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const token = sessionStorage.getItem("authToken");
  const [addressData, setAddressData] = useState<addressData>({
    address_name: "",
    name: "",
    addr: "",
    addr_detail: "",
    zip: "",
    tel: "",
    request: "",
    is_default: "N",
  });

  useEffect(() => {
    const fetchAddressData = async (address_key: string) => {
      try {
        const response = await axios.get(
          `${backPort}/api/user/${userKey}/address/${address_key}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("해당 배송지", response.data);
        setAddressData(response.data);
      } catch {
        console.error("특정 배송지를 가져오지 못했습니다.");
      }
    };

    if (id) {
      fetchAddressData(id);
    }
  }, [id, userKey, token, backPort]);

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

    try {
      const userKey = sessionStorage.getItem("userKey");
      console.log("수정된 주소", addressData);
      const response = await axios.put(
        `${backPort}/api/user/${userKey}/address/${id}`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("주소 수정 성공:", response.data);
      navigate("/mypage/setAddress");
    } catch (error) {
      console.error("주소 수정 중 오류 발생:", error);
    }
  };

  return (
    <>
      <AboutHeader Title="배송지 수정" onBack={handleBack} />
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <span>배송지 이름</span>
            <Input
              type="text"
              name="address_name"
              placeholder="예) 우리 집"
              value={addressData.address_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>성함</span>
            <Input
              type="text"
              name="name"
              placeholder="예) 문미새"
              value={addressData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>주소</span>
            <Input
              type="text"
              name="addr"
              placeholder="예) 서울특별시 강남구 역삼동"
              value={addressData.addr}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>상세 주소</span>
            <Input
              type="text"
              name="addr_detail"
              placeholder="예) 미새아파트 101동 101호"
              value={addressData.addr_detail}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>우편번호</span>
            <Input
              type="text"
              name="zip"
              placeholder="예) 12345"
              value={addressData.zip}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>전화번호</span>
            <Input
              type="text"
              name="tel"
              placeholder="예) 01012345678"
              value={addressData.tel}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>요청</span>
            <Input
              type="text"
              name="request"
              placeholder="예) 문 앞에 놓아주세요."
              value={addressData.request}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>기본 배송지로 설정</span>
            <Input
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
export default EditAddress;

const Input = styled.input`
  width: 90%;
  border: 3px solid rgba(255, 164, 228, 0.5);
  border-radius: 13px;
  padding: 10px 10px;
  margin-bottom: 10px;
  font-size: 14px;
  outline: none;
`;
