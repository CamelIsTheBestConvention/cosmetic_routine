import styled from "styled-components";
import CompleteBtn from "../components/common/completeBtn";
import { useState } from "react";
import axios from "axios";
import CommonRadioBox from "../components/common/commonRadiobox";
import SignupGuide from "../components/signup/signupGuide";
import { useNavigate } from "react-router-dom";
import CommonCheckBox from "../components/common/commonCheckbox";
import AboutHeader from "../components/common/aboutHeader";
import MainFooter from "../components/common/mainFooter";

const AttrChange: React.FC = () => {
  const [attribute, setAttribute] = useState<number[]>([]);
  const [skinType, setSkinType] = useState<number>(0);
  const [colors, setColors] = useState<number>(0);
  const [attrType, setAttrType] = useState<number[]>([]);
  const navigate = useNavigate();
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  const userKey = sessionStorage.getItem("userKey");
  const token = sessionStorage.getItem("authToken");

  const handleSkinTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const updatedTrouble = attrType.filter((item) => item < 1 || item > 5);
    const newTrouble = [...updatedTrouble, value];
    const sorted = [...newTrouble].sort((a, b) => a - b);

    setSkinType(value);
    setAttrType(sorted);
    console.log(sorted);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const updatedTrouble = attrType.filter(
      (item) => !(item >= 6 && item <= 9) && item !== 0
    );
    const newTrouble = [...updatedTrouble, value];
    const sorted = [...newTrouble].sort((a, b) => a - b);

    setColors(value);
    setAttrType(sorted);
    console.log(sorted);
  };

  const handleTroubleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    let updateValue;

    if (attrType.includes(value)) {
      updateValue = attrType.filter((item) => item !== value);
    } else {
      updateValue = [...attrType, value];
    }

    const sorted = [...updateValue].sort((a, b) => a - b);

    setAttrType(sorted);
    console.log(updateValue);
  };

  const handleSubmit = async () => {
    console.log("선택 타입", attrType);
    console.log(backPort);
    console.log(userKey);
    try {
      const response = await axios.put(
        `${backPort}/api/user/${userKey}`,
        { attributes: attrType },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("타입 수정 성공");
      navigate("/mypage/profileEdit");
      console.log("타입 수정 성공", response.data);
    } catch (error) {
      alert("타입 수정 실패");
      console.log("타입 수정 실패", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <AboutHeader Title="타입 수정" onBack={handleBack} />
      <AttrChangeWrapper>
        {/* <form action=""> */}
        <SignupGuide text="어떤 피부 타입인가요?" />
        <SkinBox1>
          <CommonRadioBox
            label="건성"
            name="skin"
            value={1}
            checked={skinType === 1}
            onChange={handleSkinTypeChange}
          />
          <CommonRadioBox
            label="중성"
            name="skin"
            value={2}
            checked={skinType === 2}
            onChange={handleSkinTypeChange}
          />
          <CommonRadioBox
            label="지성"
            name="skin"
            value={3}
            checked={skinType === 3}
            onChange={handleSkinTypeChange}
          />
        </SkinBox1>
        <SkinBox2>
          <CommonRadioBox
            label="복합성"
            name="skin"
            value={4}
            checked={skinType === 4}
            onChange={handleSkinTypeChange}
          />
          <CommonRadioBox
            label="수부지"
            name="skin"
            value={5}
            checked={skinType === 5}
            onChange={handleSkinTypeChange}
          />
        </SkinBox2>
        <SignupGuide text="퍼스널컬러를 골라주세요" />
        <ColorBox1>
          <CommonRadioBox
            label="봄웜톤"
            name="color"
            value={6}
            checked={colors === 6}
            onChange={handleColorChange}
          />
          <CommonRadioBox
            label="여름쿨톤"
            name="color"
            value={7}
            checked={colors === 7}
            onChange={handleColorChange}
          />
          <CommonRadioBox
            label="가을웜톤"
            name="color"
            value={8}
            checked={colors === 8}
            onChange={handleColorChange}
          />
          <CommonRadioBox
            label="겨울쿨톤"
            name="color"
            value={9}
            checked={colors === 9}
            onChange={handleColorChange}
          />
        </ColorBox1>
        <ColorBox2>
          <CommonRadioBox
            label="잘 모르겠어요.."
            name="color"
            value={100}
            checked={colors === 100}
            onChange={handleColorChange}
          />
        </ColorBox2>
        <SignupGuide text="피부 고민이 있나요?" />
        <p
          style={{
            color: "#848484",
            fontSize: "13px",
            margin: "-10px 0 10px 0",
          }}
        >
          중복 체크 가능합니다.
        </p>
        <TroubleBox>
          <CommonCheckBox
            label="아토피"
            value={10}
            checked={attrType.includes(10)}
            onChange={handleTroubleChange}
          />
          <CommonCheckBox
            label="여드름"
            value={11}
            checked={attrType.includes(11)}
            onChange={handleTroubleChange}
          />
          <CommonCheckBox
            label="민감성"
            value={12}
            checked={attrType.includes(12)}
            onChange={handleTroubleChange}
          />
          <CommonCheckBox
            label="홍조"
            value={13}
            checked={attrType.includes(13)}
            onChange={handleTroubleChange}
          />
          <CommonCheckBox
            label="각질"
            value={14}
            checked={attrType.includes(14)}
            onChange={handleTroubleChange}
          />
          <CommonCheckBox
            label="속건조"
            value={15}
            checked={attrType.includes(15)}
            onChange={handleTroubleChange}
          />
        </TroubleBox>
        <CompleteBtn text="저장" disabled={false} onClick={handleSubmit} />
        {/* </form> */}
      </AttrChangeWrapper>
      <MainFooter />
    </>
  );
};
export default AttrChange;

const AttrChangeWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const SkinBox1 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;

const SkinBox2 = styled.div`
  width: 72%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

const ColorBox1 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

const ColorBox2 = styled.div`
  width: 100%;
`;

const TroubleBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;
