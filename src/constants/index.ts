import laptop from "../../public/catalogIcons/laptop.svg";
import smartphone from "../../public/catalogIcons/smartphone.svg";
import controller from "../../public/catalogIcons/controller.svg";
import oven from "../../public/catalogIcons/oven.svg";
import sofa from "../../public/catalogIcons/sofa.svg";
import tools from "../../public/catalogIcons/tools.svg";
import plumbing from "../../public/catalogIcons/plumbing.svg";
import gardening from "../../public/catalogIcons/gardening.svg";
import sports from "../../public/catalogIcons/sports.svg";
import toys from "../../public/catalogIcons/toys.svg";
import pets from "../../public/catalogIcons/pets.svg";
import facebookLogo from "../../public/FacebookIcon.svg";
import youtubeLogo from "../../public/YoutubeIcon.svg";
import instaLogo from "../../public/InstagramIcon.svg";
import buttonIcon from "../../public/ButtonCatalogIcon.svg";
import cartIcon from "../../public/cart.svg";
import questionIcon from "../../public/question_mark.svg";
import AccountCircleOutlined from "../../public/AccountCircleOutlined.svg";
import ShoppingCartIcon from "../../public/ShoppingCartIcon.svg";
import favorite from "../../public/favorite.svg";
import CommentOutlined from "../../public/CommentOutlined.svg";
import RemoveRedEyeOutlined from "../../public/AccountCircleOutlined.svg";
import NovaPoshtaLogo from "../../public/NovaPoshtaLogo.svg";
import UkrposhtaLogo from "../../public/UkrposhtaLogo.svg";
import shoppingCardItemTest from "../../public//shoppingCardItemTest.svg";

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

export const categoriesItems = [
  {
    id: 1,
    icon: laptop,
    title: "Ноутбуки та компʼютери",
    subcategories: [
      { id: 101, name: "Мобільні телефони" },
      { id: 102, name: "Ноутбуки" },
    ],
  },
  {
    id: 2,
    icon: tools,
    title: "Інструменти",
    subcategories: [
      { id: 201, name: "Фантастика" },
      { id: 202, name: "Навчальна література" },
    ],
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
  // {
  //   head: "Наші магазини",
  //   subHeaders: [
  //     "Місто, вулиця Найкраща 1б",
  //     "Місто, вулиця Найкраща 1б",
  //     "Місто, вулиця Найкраща 1б",
  //   ],
  // },
  {
    head: "Контакти",
    subHeaders: ["Місто, вулиця Найкраща 1б", "+38 (093) 123 45 67"],
  },
];

export const additionalServices = [
  {
    servicesId: 1,
    servicesTitle: "service 1",
    servicesDesc:
      "Короткий опис послуги, в якому описані основні переваги тут може бути достатньо тексту, але все залежить від кількості послуг",
    servicesPrice: 1000,
  },
  {
    servicesId: 2,
    servicesTitle: "service 2",
    servicesDesc:
      "Короткий опис послуги, в якому описані основні переваги тут може бути достатньо тексту, але все залежить від кількості послуг",
    servicesPrice: 2000,
  },
  {
    servicesId: 3,
    servicesTitle: "service 3",
    servicesDesc:
      "Короткий опис послуги, в якому описані основні переваги тут може бути достатньо тексту, але все залежить від кількості послуг",
    servicesPrice: 3000,
  },
];

export const paymentsMethods = [
  {
    id: 1,
    title: "Оплата після отриманні",
  },
  {
    id: 2,
    title: "Оплата частинами",
  },
  {
    id: 3,
    title: "Онлайн оплата Visa/MasterCard",
  },
  {
    id: 4,
    title: "Apple Pay",
  },
  {
    id: 5,
    title: "Google Pay",
  },
];

export const profileNavItems = [
  {
    title: "Персональні дані",
    url: "/account",
    icon: AccountCircleOutlined,
  },
  {
    title: "Мої замовлення",
    url: "/account/purchases",
    icon: ShoppingCartIcon,
  },
  {
    title: "Обране",
    url: "/account/favorites",
    icon: favorite,
  },
  {
    title: "Відгуки",
    url: "/account/reviews",
    icon: CommentOutlined,
  },
  {
    title: "Переглянути товари",
    url: "/account/viewedProducts",
    icon: RemoveRedEyeOutlined,
  },
];

export const DeliveryAddressData = [
  {
    id: 1,
    title: "Адресна доставка",
    icon: "",
  },
  {
    id: 2,
    title: "Nova Post",
    icon: NovaPoshtaLogo,
  },
  {
    id: 3,
    title: "Ukr Post",
    icon: UkrposhtaLogo,
  },
];

export const Posts = [
  {
    id: 1,
    name: "Нова Пошта",
  },
  {
    id: 2,
    name: "УкрПошта",
  },
  {
    id: 3,
    name: "Самовивіз з магазину",
  },
  {
    id: 4,
    name: "Курʼєром",
  },
];

export const UkrPostDepartments = [
  {
    id: 1,
    title: "Відділення 1",
  },
  {
    id: 2,
    title: "Відділення 2",
  },
  {
    id: 3,
    title: "Відділення 3",
  },
  {
    id: 4,
    title: "Відділення 4",
  },
  {
    id: 5,
    title: "Відділення 5",
  },
];

export const OurShops = [
  {
    id: 1,
    title: "Магазин 1",
  },
  {
    id: 2,
    title: "Магазин 2",
  },
  {
    id: 3,
    title: "Магазин 3",
  },
];

export const InfoAboutPurchase = [
  {
    productId: 1,
    orderNumber: "123456",
    orderStatus: "Виконано",
    orderDate: "4 квітня 2024",
    orderIcon: shoppingCardItemTest,
    orderTitle:
      "Геймпад Microsoft Xbox Series X | S Wireless Controller Velocity Green (QAU-00091)",
    orderPrice: 19999,
    orderCount: 1,
    paymentStatus: "Сплачено",
    PaymentMethod: "картою онлайн",
    deliveryAddress: "Львів, вул. Степана Бандери, 13/13",
    orderRecipientName: "Степан Підбийкопито",
    orderRecipientPhone: "+38 - (063) - 345 - 22 - 34",
    inStock: true,
  },
  {
    productId: 2,
    orderNumber: "456765",
    orderStatus: "Виконано",
    orderDate: "8 квітня 2024",
    orderIcon: shoppingCardItemTest,
    orderTitle:
      "Геймпад Microsoft Xbox Series X | S Wireless Controller Velocity Green (QAU-00091)",
    orderPrice: 29999,
    orderCount: 2,
    paymentStatus: "Сплачено",
    PaymentMethod: "картою онлайн",
    deliveryAddress: "Тернопіль, вул. Степана Бандери, 14/14",
    orderRecipientName: "Йохим Підбийкопито",
    orderRecipientPhone: "+38 - (063) - 345 - 22 - 34",
    inStock: true,
  },
];

export const DiscountPercentage = 1.2;

export const categories = [
  {
    id: 1,
    slug: "technology",
    name: "Технології",
    subcategories: ["Комп'ютери", "Смартфони"],
  },
  {
    id: 2,
    slug: "books",
    name: "Книги",
    subcategories: ["Художня література", "Наукова література"],
  },
  { id: 3, slug: "music", name: "Музика", subcategories: ["Класична", "Рок"] },
];
