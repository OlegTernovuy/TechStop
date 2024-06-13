import first from "/public/product-card-icons/test_svg_1.svg";
import second from "/public/product-card-icons/test_svg_2.svg";
import third from "/public/product-card-icons/test_svg.svg";

//*Navigation list

export const productNavList = [
  { _id: "1", title: "усе про товар", path: "about-product" },
  { _id: "2", title: "Характеристики", path: "characteristics" },
  { _id: "3", title: "Залишити відгук", path: "feedback" },
];

//*Check box labels

export const checkboxLabels = [
  {
    servicesId: 1,
    servicesTitle: "warranty",
    servicesDesc: "Гарантія 24/7",
    servicesPrice: 500,
  },
  {
    servicesId: 2,
    servicesTitle: "repairService",
    servicesDesc: "Сервіс “Ремонт після всього”",
    servicesPrice: 700,
  },
  {
    servicesId: 3,
    servicesTitle: "insurance",
    servicesDesc: "Страховка від стихійних лих",
    servicesPrice: 1000,
  },
  {
    servicesId: 4,
    servicesTitle: "nonWarrantyService",
    servicesDesc: "Сервіс для негарантійних випадків",
    servicesPrice: 1200,
  },
];

//* Slider

export const gallery = [
  {
    id: 1,
    href: first,
  },
  {
    id: 2,
    href: second,
  },
  {
    id: 3,
    href: third,
  },
];
