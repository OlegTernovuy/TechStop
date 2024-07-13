import laptop from '../../public/catalogIcons/laptop.svg';
import smartphone from '../../public/catalogIcons/smartphone.svg';
import controller from '../../public/catalogIcons/controller.svg';
import oven from '../../public/catalogIcons/oven.svg';
import sofa from '../../public/catalogIcons/sofa.svg';
import tools from '../../public/catalogIcons/tools.svg';
import plumbing from '../../public/catalogIcons/plumbing.svg';
import gardening from '../../public/catalogIcons/gardening.svg';
import sports from '../../public/catalogIcons/sports.svg';
import toys from '../../public/catalogIcons/toys.svg';
import pets from '../../public/catalogIcons/pets.svg';
import facebookLogo from '../../public/FacebookIcon.svg';
import youtubeLogo from '../../public/YoutubeIcon.svg';
import instaLogo from '../../public/InstagramIcon.svg';
import buttonIcon from '../../public/ButtonCatalogIcon.svg';
import cartIcon from '../../public/cart.svg';
import questionIcon from '../../public/question_mark.svg';
import AccountCircleOutlined from '../../public/AccountCircleOutlined.svg';
import ShoppingCartIcon from '../../public/ShoppingCartIcon.svg';
import favorite from '../../public/favorite.svg';
import CommentOutlined from '../../public/CommentOutlined.svg';
import RemoveRedEyeOutlined from '../../public/RemoveRedEyeOutlined.svg';
import NovaPoshtaLogo from '../../public/NovaPoshtaLogo.svg';
import UkrposhtaLogo from '../../public/UkrposhtaLogo.svg';
import shoppingCardItemTest from '../../public//shoppingCardItemTest.svg';
import reviewIconProduct from '../../public/reviewIconProduct.svg';

export const mobileMenuInfo = [
    {
        title: 'Про компанію',
        href: '/',
    },
    {
        title: 'Публічна оферта',
        href: '/',
    },
    {
        title: 'Установка',
        href: '/',
    },
    {
        title: 'Гарантія',
        href: '/',
    },
    {
        title: 'Кредит',
        href: '/',
    },
];

export const mobileMenuSocialMedia = [
    {
        href: 'https://www.facebook.com',
        imageSrc: facebookLogo,
    },
    {
        href: 'https://www.youtube.com',
        imageSrc: youtubeLogo,
    },
    {
        href: 'https://www.instagram.com',
        imageSrc: instaLogo,
    },
];

export const mobileMenuLinkInfo = [
    {
        href: '?catalog=true',
        imageSrc: buttonIcon,
        title: 'Каталог товарів',
    },
    {
        href: '?element=true',
        imageSrc: questionIcon,
        title: 'Довідковий центр',
    },
    {
        href: '?shopCard=true',
        imageSrc: cartIcon,
        title: 'Кошик',
    },
];

export const categoriesItems = [
    {
        id: 1,
        icon: laptop,
        title: 'Ноутбуки та компʼютери',
        subcategories: [
            {
                id: 101,
                name: 'Мобільні телефони',
                model: [
                    {
                        id: '1c',
                        name: 'a',
                    },
                    {
                        id: '2c',
                        name: 'b',
                    },
                    {
                        id: '3c',
                        name: 'c',
                    },
                ],
            },
            {
                id: 102,
                name: 'Ноутбуки',
                model: [
                    {
                        id: '1a',
                        name: 'a',
                    },
                    {
                        id: '2a',
                        name: 'b',
                    },
                    {
                        id: '3a',
                        name: 'c',
                    },
                    {
                        id: '4a',
                        name: 'd',
                    },
                ],
            },
            {
                id: 103,
                name: 'loremerfg',
                model: [
                    {
                        id: '1b',
                        name: 'a',
                    },
                    {
                        id: '2b',
                        name: 'b',
                    },
                    {
                        id: '3b',
                        name: 'c',
                    },
                ],
            },
            {
                id: 104,
                name: 'rrrrrrrr',
                model: [
                    {
                        id: '1d',
                        name: 'a',
                    },
                    {
                        id: '2d',
                        name: 'b',
                    },
                    {
                        id: '3d',
                        name: 'c',
                    },
                ],
            },
            {
                id: 105,
                name: 'qqqqqqqqq',
                model: [
                    {
                        id: '1e',
                        name: 'a',
                    },
                    {
                        id: '2e',
                        name: 'b',
                    },
                    {
                        id: '3e',
                        name: 'c',
                    },
                ],
            },
        ],
    },
    // {
    //   id: 2,
    //   icon: tools,
    //   title: "Інструменти",
    //   subcategories: [
    //     { id: 201, name: "Фантастика" },
    //     { id: 202, name: "Навчальна література" },
    //   ],
    // },
];

export const CatalogItem = [
    {
        icon: laptop,
        title: 'Ноутбуки та компʼютери',
    },
    {
        icon: smartphone,
        title: 'Смартфони',
    },
    {
        icon: controller,
        title: 'Товари для геймерів',
    },
    {
        icon: oven,
        title: 'Побутова техніка',
    },
    {
        icon: sofa,
        title: 'Товари для дому',
    },
    {
        icon: tools,
        title: 'Інструменти',
    },
    {
        icon: plumbing,
        title: 'Сантехніка та ремонт',
    },
    {
        icon: gardening,
        title: 'Дача, сад і город',
    },
    {
        icon: sports,
        title: 'Спорт і захоплення',
    },
    {
        icon: toys,
        title: 'Дитячі товари',
    },
    {
        icon: pets,
        title: 'Зоотовари',
    },
];

export const footerBlock = [
    {
        head: 'Інформація',
        subHeaders: [
            { title: 'Про компанію', href: '/aboutCompany' },
            { title: 'Публічна оферта', href: '/publicOffer' },
        ],
    },
    {
        head: 'Клієнтам',
        subHeaders: [
            { title: 'Установка', href: '/installation' },
            { title: 'Гарантія', href: '/warranty' },
            { title: 'Кредит', href: '/credit' },
        ],
    },
    {
        head: 'Контакти',
        subHeaders: [
            {
                title: 'Місто, вулиця Найкраща 1б',
                href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    'Київ, Україна'
                )}`,
                target: true,
            },
            { title: '+38 (093) 123 45 67', href: 'tel:0931234567' },
        ],
    },
];

export const checkboxLabels = [
    {
        servicesId: 1,
        servicesTitle: 'warranty',
        servicesDesc: 'Гарантія 24/7',
        servicesPrice: 500,
    },
    {
        servicesId: 2,
        servicesTitle: 'repairService',
        servicesDesc: 'Сервіс “Ремонт після всього”',
        servicesPrice: 700,
    },
    {
        servicesId: 3,
        servicesTitle: 'insurance',
        servicesDesc: 'Страховка від стихійних лих',
        servicesPrice: 1000,
    },
    {
        servicesId: 4,
        servicesTitle: 'nonWarrantyService',
        servicesDesc: 'Сервіс для негарантійних випадків',
        servicesPrice: 1200,
    },
];

export const paymentsMethods = [
    {
        id: 1,
        title: 'Оплата після отримання',
    },
    {
        id: 2,
        title: 'Оплата частинами',
    },
    {
        id: 3,
        title: 'Онлайн оплата Visa/MasterCard',
    },
    {
        id: 4,
        title: 'Apple Pay',
    },
    {
        id: 5,
        title: 'Google Pay',
    },
];

export const profileNavItems = [
    {
        title: 'Персональні дані',
        url: '/account',
        icon: AccountCircleOutlined,
    },
    {
        title: 'Мої замовлення',
        url: '/account/purchases',
        icon: ShoppingCartIcon,
    },
    {
        title: 'Обране',
        url: '/account/favorites',
        icon: favorite,
    },
    {
        title: 'Відгуки',
        url: '/account/reviews',
        icon: CommentOutlined,
    },
    {
        title: 'Переглянуті товари',
        url: '/account/viewedProducts',
        icon: RemoveRedEyeOutlined,
    },
];

export const DeliveryAddressData = [
    {
        id: 1,
        title: 'Адресна доставка',
        // icon: "",
    },
    // {
    //   id: 2,
    //   title: "Нова Пошта",
    //   // icon: NovaPoshtaLogo,
    // },
    // {
    //   id: 3,
    //   title: "УкрПошта",
    //   // icon: UkrposhtaLogo,
    // },
];

export const Posts = [
    {
        id: 1,
        name: 'Нова Пошта',
    },
    {
        id: 2,
        name: 'УкрПошта',
    },
    {
        id: 3,
        name: 'Самовивіз з магазину',
    },
    {
        id: 4,
        name: 'Курʼєром',
    },
];

export const UkrPostDepartments = [
    {
        id: 1,
        title: 'Відділення 1',
    },
    {
        id: 2,
        title: 'Відділення 2',
    },
    {
        id: 3,
        title: 'Відділення 3',
    },
    {
        id: 4,
        title: 'Відділення 4',
    },
    {
        id: 5,
        title: 'Відділення 5',
    },
];

export const OurShops = [
    {
        id: 1,
        title: 'Магазин 1',
    },
    {
        id: 2,
        title: 'Магазин 2',
    },
    {
        id: 3,
        title: 'Магазин 3',
    },
];

export const InfoAboutPurchase = [
    {
        productId: 1,
        orderNumber: '123456',
        orderStatus: 'Виконано',
        orderDate: '4 квітня 2024',
        orderIcon: reviewIconProduct,
        orderTitle:
            'Геймпад Microsoft Xbox Series X | S Wireless Controller Velocity Green (QAU-00091)',
        orderPrice: 19999,
        orderCount: 1,
        paymentStatus: 'Сплачено',
        PaymentMethod: 'картою онлайн',
        deliveryAddress: 'Львів, вул. Степана Бандери, 13/13',
        orderRecipientName: 'Степан Підбийкопито',
        orderRecipientPhone: '+38 - (063) - 345 - 22 - 34',
        inStock: true,
    },
    {
        productId: 2,
        orderNumber: '456765',
        orderStatus: 'Виконано',
        orderDate: '8 квітня 2024',
        orderIcon: shoppingCardItemTest,
        orderTitle:
            'Геймпад Microsoft Xbox Series X | S Wireless Controller Velocity Green (QAU-00091)',
        orderPrice: 29999,
        orderCount: 2,
        paymentStatus: 'Сплачено',
        PaymentMethod: 'картою онлайн',
        deliveryAddress: 'Тернопіль, вул. Степана Бандери, 14/14',
        orderRecipientName: 'Йохим Підбийкопито',
        orderRecipientPhone: '+38 - (063) - 345 - 22 - 34',
        inStock: true,
    },
];

export const DiscountPercentage = 1.2;

export const categories = [
    {
        id: 1,
        slug: 'technology',
        name: 'Технології',
        subcategories: ["Комп'ютери", 'Смартфони'],
    },
    {
        id: 2,
        slug: 'books',
        name: 'Книги',
        subcategories: ['Художня література', 'Наукова література'],
    },
    {
        id: 3,
        slug: 'music',
        name: 'Музика',
        subcategories: ['Класична', 'Рок'],
    },
];

export const reviews = [
    {
        id: 1,
        icon: reviewIconProduct,
        title: 'Дуже хороший геймпад, чоловік дуже тішився, покликав друзів, вже тиждень граються',
    },
    {
        id: 2,
        icon: reviewIconProduct,
        title: 'Дуже хороший геймпад, чоловік дуже тішився, покликав друзів, вже тиждень граються',
    },
    {
        id: 3,
        icon: reviewIconProduct,
        title: 'Дуже хороший геймпад, чоловік дуже тішився, покликав друзів, вже тиждень граються',
    },
];

export const productFilters = [
    {
        brandId: 1,
        brandTitle: 'Apple',
    },
    {
        brandId: 2,
        brandTitle: 'Samsung',
    },
    {
        brandId: 3,
        brandTitle: 'LG',
    },
    {
        brandId: 4,
        brandTitle: 'HP',
    },
    {
        brandId: 5,
        brandTitle: 'DELL',
    },
    {
        brandId: 6,
        brandTitle: 'Lenovo',
    },
];


export const NEXTAUTH_SECRET="7d5f9b372b79f01a9c5454048d5b8c14"
export const NEXT_PUBLIC_BASE_URL = "https://team-project-server-41ev.onrender.com/api"
export const NEXT_PUBLIC_CALLBACK_URL="http://localhost:3000/admin/login"
