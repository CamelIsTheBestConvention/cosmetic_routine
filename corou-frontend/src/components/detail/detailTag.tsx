import { useEffect, useState } from "react";
import "../../scss/detail/detailInfo.scss";
import axios from "axios";

interface detailTag {
  tagData: string[];
}

const DetailTag: React.FC<detailTag> = ({ tagData }) => {
  console.log(tagData);

  return (
    <>
      <div className="detailTagWrapper">
        <ul>
          {tagData.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default DetailTag;
