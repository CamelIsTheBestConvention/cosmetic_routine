import styled from "styled-components";
import { useState } from "react";

const Caution = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCaution = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <CautionWrapper>
        <CautionDropdown onClick={toggleCaution}>
          <span>유의 사항</span>
          <span>{isOpen ? "△" : "▽"}</span>
        </CautionDropdown>

        {isOpen && (
          <CautionContent>
            <ul>
              <li>
                상품 보관 기간: 장바구니에 담긴 상품은 최대 30일 동안
                보관됩니다. 이후에는 자동으로 삭제될 수 있습니다.
              </li>
              <li>
                재고 변동: 장바구니에 담긴 상품은 구매가 확정된 것이 아니므로,
                재고가 소진될 경우 구매가 불가능할 수 있습니다.
              </li>
              <li>
                가격 변동: 장바구니에 담긴 후에도 상품의 가격은 변동될 수
                있습니다. 최종 결제 시점의 가격이 적용됩니다.
              </li>
              <li>
                쿠폰 및 할인 적용: 장바구니에 담긴 상품에 대한 쿠폰이나 할인
                혜택은 결제 과정에서 적용됩니다. 쿠폰 유효 기간을 확인해주세요.
              </li>
              <li>
                배송비 안내: 상품의 총 구매 금액에 따라 배송비가 달라질 수
                있습니다. 무료 배송 조건을 충족하지 않을 경우 추가 배송비가
                발생할 수 있습니다.
              </li>
              <li>
                결제 제한: 장바구니에 특정 상품이 포함된 경우, 결제 수단이
                제한될 수 있습니다. 상품 설명을 확인 후 적합한 결제 방법을
                선택해주세요.
              </li>
              <li>
                상품 삭제: 장바구니에 담긴 상품은 재고 및 유효 기간에 따라
                자동으로 삭제될 수 있습니다. 이를 참고하여 빠른 결제를
                권장합니다.
              </li>
              <li>
                장바구니 공유 불가: 장바구니는 개인 계정에 저장되며, 다른
                사용자와 공유할 수 없습니다. 동일한 계정으로 로그인하여 저장된
                장바구니를 확인하세요.
              </li>
              <li>
                상품 옵션 변경: 장바구니에 담긴 상품의 옵션(색상, 사이즈 등)을
                변경하고 싶을 경우, 장바구니에서 직접 수정하시거나 삭제 후 다시
                담아주세요.
              </li>
              <li>
                주문 확정 전 주의: 장바구니에 상품을 담는 것만으로는 구매가
                확정되지 않으며, 결제 완료 후에만 주문이 확정됩니다.
              </li>
            </ul>
          </CautionContent>
        )}
      </CautionWrapper>
    </>
  );
};
export default Caution;

const CautionWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
`;

const CautionDropdown = styled.div`
  width: 95%;
  margin: 0 auto;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const CautionContent = styled.div`
  width: 100%;
  background-color: #dadada;
  font-size: 11px;

  ul {
    margin-left: -20px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #848484;

    li {
      margin-bottom: 3px;
    }
  }
`;
