import { DataSource } from "typeorm";
import { SkinAttribute } from "./entities/skin-attribute.entity"; // Adjust the import path as necessary
import { Item } from "./entities/item.entity";
import { AppDataSource } from "./config/ormconfig"; // Adjust the import path as necessary

const seedDatabase = async () => {
  try {
    // Initialize the data source
    await AppDataSource.initialize();

    // Preload data
    const skinAttributeRepository = AppDataSource.getRepository(SkinAttribute);
    const itemRepository = AppDataSource.getRepository(Item);
    // Example data
    const attributes = [
      { attr_key: 1, attr_name: "건성" },
      { attr_key: 2, attr_name: "중성" },
      { attr_key: 3, attr_name: "지성" },
      { attr_key: 4, attr_name: "복합성" },
      { attr_key: 5, attr_name: "수부지" },
      { attr_key: 6, attr_name: "봄웜톤" },
      { attr_key: 7, attr_name: "여름쿨톤" },
      { attr_key: 8, attr_name: "가을웜톤" },
      { attr_key: 9, attr_name: "겨울쿨톤" },
      { attr_key: 10, attr_name: "아토피" },
      { attr_key: 11, attr_name: "여드름" },
      { attr_key: 12, attr_name: "민감성" },
      { attr_key: 13, attr_name: "홍조" },
      { attr_key: 14, attr_name: "각질" },
      { attr_key: 15, attr_name: "속건조" },
      { attr_key: 100, attr_name: "잘 모르겠어요" },
    ];

    // Insert data if it does not already exist
    await skinAttributeRepository.save(attributes);

    const items = [
      {
        item_key: 1,
        item_name: "마데카소사이드 흔적 패드 디즈니픽사",
        brand_name: "메디힐",
        volume: 200,
        item_price: 28400,
        description:
          "매일 쉽게 자극받고 민감해지는 피부, 거뭇거뭇한 트러블 흔적이 고민인 피부에 사용하세요",
        category: "지성",
      },
      {
        item_key: 2,
        item_name: "퓨어 클렌징 오일X2 더블기획",
        brand_name: "마녀공장",
        volume: 200,
        item_price: 22800,
        description:
          "예민한 민감성 피부도 자극 걱정없이 순한 퓨어 클렌징 오일로 블렉헤드까지 안심 딥 클렌징을 경험해보세요.",
        category: "민감성",
      },
      {
        item_key: 3,
        item_name: "비타 글레이즈드 립 마스크",
        brand_name: "토코보",
        volume: 20,
        item_price: 15300,
        description: "립 케어에 대한 고민, 나도 한 번쯤 겪어봤다면?",
        category: "수부지",
      },
      {
        item_key: 4,
        item_name: "하이드라비오 토너",
        brand_name: "바이오더마",
        volume: 500,
        item_price: 25110,
        description: "피부 속 수분길을 열어 속건조 OUT! 수분장벽 강화 토너",
        category: "복합성",
      },
      {
        item_key: 5,
        item_name: "실크 오일 헤어 에센스",
        brand_name: "어노브",
        volume: 70,
        item_price: 28900,
        description:
          "끈적임 없이 영양은 더 풍부하게 놀라운 부드러움을 선사하는 고영양 실크 오일 에센스",
        category: "중성",
      },
      {
        item_key: 6,
        item_name: "아쿠아 스쿠알란 수분크림",
        brand_name: "에스네이처",
        volume: 60,
        item_price: 16110,
        description: "카스테라처럼 온종일 촉촉한 피부를 원한다면?",
        category: "지성",
      },
      {
        item_key: 7,
        item_name: "시그니처 퍼퓸(코튼키스/코튼허그)",
        brand_name: "포맨트",
        volume: 50,
        item_price: 39000,
        description:
          "허그의 향연, 깨끗한 살냄새, 사랑하는 사람을 끌어안았을 때의 기분좋은 포근함",
        category: "수부지",
      },
      {
        item_key: 8,
        item_name: "블랙 쿠션 파운데이션",
        brand_name: "헤라",
        volume: 15,
        item_price: 63000,
        description:
          "모공과 피부결점에 뭉침 없이 매끄럽게 밀착되어 무너짐 없이 24시간 소프트 새틴 스킨 유지",
        category: "민감성",
      },
      {
        item_key: 9,
        item_name: "블러 파우더 팩트",
        brand_name: "어바웃톤",
        volume: 15,
        item_price: 10900,
        description: "붉거나 노랗지 않게, 내 톤에 맞춘 듯 자연스러운 컬러 구성",
        category: "중성",
      },
      {
        item_key: 10,
        item_name: "엔젤아쿠아 수분진정크림",
        brand_name: "비욘드",
        volume: 420,
        item_price: 23500,
        description:
          "피부에 열감이 가득하고 달아올라 시원한 진정이 필요하다면?",
        category: "민감성",
      },
    ];

    await itemRepository.save(items);

    console.log("Database seeded with skin attributes!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    await AppDataSource.destroy();
  }
};

seedDatabase();
