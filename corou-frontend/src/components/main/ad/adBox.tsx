import { useEffect, useState } from "react";
import styled from "styled-components";
import ad1 from "../../../img/adBanner/1.jpg";
import ad2 from "../../../img/adBanner/2.jpg";
import ad3 from "../../../img/adBanner/3.jpg";
import ad4 from "../../../img/adBanner/4.jpg";
import ad5 from "../../../img/adBanner/5.jpg";
import ad6 from "../../../img/adBanner/6.jpg";

const AdBox = () => {
  return (
    <>
      <AdBoxWrapper></AdBoxWrapper>
    </>
  );
};

export default AdBox;

const AdBoxWrapper = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: relative;
  margin-bottom: 30px;
`;
