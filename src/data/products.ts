export interface Product {
  id: string;
  name: string;
  english: string;
  ingredient: string;
  description: string;
  status: "개발 중";
  tone: "cham" | "perilla";
}
/** 가격·용량·원산지·성분·판매 일정은 확정 및 승인 전 기재하지 않습니다. */
export const products: Product[] = [
  {
    id: "chamnamul",
    name: "참나물 페스토",
    english: "CHAMNAMUL PESTO",
    ingredient: "참나물",
    description:
      "익숙한 참나물을 새로운 방식으로. 우리 식탁의 나물을 한 스푼에 담는 페스토를 개발하고 있습니다.",
    status: "개발 중",
    tone: "cham",
  },
  {
    id: "perilla",
    name: "깻잎 페스토",
    english: "PERILLA PESTO",
    ingredient: "깻잎",
    description:
      "한국의 식탁에서 만나는 깻잎의 매력. 일상 속 다양한 요리에 곁들일 페스토를 개발하고 있습니다.",
    status: "개발 중",
    tone: "perilla",
  },
];
