import "../../scss/detail/detailInfo.scss";

interface detailTag {
  tag: string[];
}

const DetailTag: React.FC<detailTag> = ({ tag }) => {
  return (
    <>
      <div className="detailTagWrapper">
        <ul>
          {tag.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default DetailTag;
