import laptop from "../public/catalogIcons/laptop.svg";
import smartphone from "../public/catalogIcons/smartphone.svg";
import controller from "../public/catalogIcons/controller.svg";
import oven from "../public/catalogIcons/oven.svg";
import sofa from "../public/catalogIcons/sofa.svg";
import tools from "../public/catalogIcons/tools.svg";
import plumbing from "../public/catalogIcons/plumbing.svg";
import gardening from "../public/catalogIcons/gardening.svg";
import sports from "../public/catalogIcons/sports.svg";
import toys from "../public/catalogIcons/toys.svg";
import pets from "../public/catalogIcons/pets.svg";
import facebookLogo from "../public/facebook_line-2.svg";
import youtubeLogo from "../public/youtube_line.svg";
import instaLogo from "../public/ins_line.svg";
import buttonIcon from "../public/buttonIcon.svg";
import cartIcon from "../public/cart.svg";
import questionIcon from "../public/question_mark.svg";
import shoppingCardItem from "../public/shoppingCardItemTest.svg";

export const mobileMenuInfo = [
  {
    title: "Про компанію",
    href: "/",
  },
  {
    title: "Публічна оферта",
    href: "/",
  },
  {
    title: "Установка",
    href: "/",
  },
  {
    title: "Гарантія",
    href: "/",
  },
  {
    title: "Кредит",
    href: "/",
  },
];

export const mobileMenuSocialMedia = [
  {
    href: "https://www.facebook.com",
    imageSrc: facebookLogo,
  },
  {
    href: "https://www.youtube.com",
    imageSrc: youtubeLogo,
  },
  {
    href: "https://www.instagram.com",
    imageSrc: instaLogo,
  },
];

export const mobileMenuLinkInfo = [
  {
    href: "?catalog=true",
    imageSrc: buttonIcon,
    title: "Каталог товарів",
  },
  {
    href: "?element=true",
    imageSrc: questionIcon,
    title: "Довідковий центр",
  },
  {
    href: "?shopCard=true",
    imageSrc: cartIcon,
    title: "Кошик",
  },
];

export const CatalogItem = [
  {
    icon: laptop,
    title: "Ноутбуки та компʼютери",
  },
  {
    icon: smartphone,
    title: "Смартфони",
  },
  {
    icon: controller,
    title: "Товари для геймерів",
  },
  {
    icon: oven,
    title: "Побутова техніка",
  },
  {
    icon: sofa,
    title: "Товари для дому",
  },
  {
    icon: tools,
    title: "Інструменти",
  },
  {
    icon: plumbing,
    title: "Сантехніка та ремонт",
  },
  {
    icon: gardening,
    title: "Дача, сад і город",
  },
  {
    icon: sports,
    title: "Спорт і захоплення",
  },
  {
    icon: toys,
    title: "Дитячі товари",
  },
  {
    icon: pets,
    title: "Зоотовари",
  },
];

export const footerBlock = [
  {
    head: "Інформація",
    subHeaders: ["Про компанію", "Публічна оферта"],
  },
  {
    head: "Клієнтам",
    subHeaders: ["Установка", "Гарантія", "Кредит"],
  },
  {
    head: "Наші магазини",
    subHeaders: [
      "Місто, вулиця Найкраща 1б",
      "Місто, вулиця Найкраща 1б",
      "Місто, вулиця Найкраща 1б",
    ],
  },
  {
    head: "Контакти",
    subHeaders: [
      "+38 (093) 123 45 67",
      "+38 (093) 123 45 67",
      "+38 (093) 123 45 67",
    ],
  },
];

export const additionalServices = [
  {
    id: 1,
    title: "service 1",
    desc: "Короткий опис послуги, в якому описані основні переваги тут може бути достатньо тексту, але все залежить від кількості послуг",
    servicesPrice: 1000,
  },
  {
    id: 2,
    title: "service 2",
    desc: "Короткий опис послуги, в якому описані основні переваги тут може бути достатньо тексту, але все залежить від кількості послуг",
    servicesPrice: 2000,
  },
  {
    id: 3,
    title: "service 3",
    desc: "Короткий опис послуги, в якому описані основні переваги тут може бути достатньо тексту, але все залежить від кількості послуг",
    servicesPrice: 3000,
  },
];
