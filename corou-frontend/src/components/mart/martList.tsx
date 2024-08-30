import "../../scss/mart/martList.scss";

const MartList: React.FC = () => {
  return (
    <>
      <div className="martListWrapper">
        <div className="martItem">
          <label>
            <input type="checkbox" name="" id="" />
            <div className="martItemWrapper">
              <div className="martItemImg">
                <img src="#" alt="" />
              </div>
              <div className="martItemInfo">
                <span>브랜드</span>
                <span>제품명 & 용량</span>
                <p>₩ 00,000</p>
              </div>
            </div>
          </label>
        </div>

        <div className="martItem">
          <label>
            <input type="checkbox" name="" id="" />
            <div className="martItemWrapper">
              <div className="martItemImg">
                <img src="#" alt="" />
              </div>
              <div className="martItemInfo">
                <span>브랜드</span>
                <span>제품명 & 용량</span>
                <p>₩ 00,000</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};
export default MartList;
