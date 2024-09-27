import { useEffect, useState } from "react";
import "../../scss/detail/detailInfo.scss";
import axios from "axios";

interface detailTag {
  tag: number[];
}

const DetailTag: React.FC<detailTag> = ({ tag, tagData, setTagData }) => {
  const [tagData, setTagData] = useState<string[]>([]);
  const backPort = process.env.REACT_APP_BACKEND_PORT;
  console.log(tag);

  useEffect(() => {
    const fetchTagData = async () => {
      try {
        const tagName = tag.map(async (tag_key) => {
          const response = await axios.get(`${backPort}/api/tag/${tag_key}`);
          return response.data;
        });

        const result = await Promise.all(tagName);
        setTagData(result);
        console.log(result);
      } catch (error) {
        console.error("태그 데이터 가져오기 중 오류");
      }
    };

    fetchTagData();
  }, [tag]);

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
