import "../../scss/detail/detailInfo.scss";

interface detailTag {
  tag: string[];
}

const DetailTag: React.FC<detailTag> = ({ tag }) => {
  return (
    <>
      <div className="detailTagWrapper">
        <ul>
          <li>{tag}</li>
          <li>태그2</li>
          <li>태그3</li>
          <li>태그4</li>
          <li>태그5</li>
          <li>태그6</li>
          <li>태그7</li>
        </ul>
      </div>
    </>
  );
};
export default DetailTag;
