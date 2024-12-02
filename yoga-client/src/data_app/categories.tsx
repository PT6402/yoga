import bong_tap from "../assets/img/categories/bóng-tập.jpg";
import vong_tap from "../assets/img/categories/banner-vòng-yoga.jpg";
import tham_tap from "../assets/img/categories/Thảm-TPEyoga-hatha.jpg";
import dai_tap from "../assets/img/categories/đai-tập-yoga-hatha.jpg";
export interface CardCategoryData {
  name: string;
  desc: string;
  img: string;
  color?: string;
  id?: number;
}
const CATS: CardCategoryData[] = [
  {
    id: 1,
    name: "Vòng tập",
    desc: "12+ categories",
    img: vong_tap,
    color: "bg-[#f7f7f7]",
  },
  {
    id: 2,
    name: "Đai tập",
    desc: "12+ categories",
    img: dai_tap,
    color: "bg-[#f7f7f7]",
  },
  {
    id: 3,
    name: "Thảm tập",
    desc: "12+ categories",
    img: tham_tap,
    color: "bg-[#f7f7f7]",
  },
  {
    id: 4,
    name: "Bóng tập",
    desc: "12+ categories",
    img: bong_tap,
    color: "bg-[#f7f7f7]",
  },
];
export function getCategory(id: number) {
  return CATS.find((item) => item.id == id)!.name;
}
export { CATS };
