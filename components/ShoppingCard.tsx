import Image from "next/image";

const ShoppingCard = () => {
  return (
    <div className="flex flex-col pt-16 items-center text-center">
      <Image src="/shoppingCardEmpty.svg" alt="ShoppingCartEmpty" />
      <span>
        <h2 className="text-Headline5 pt-8 pb-1">Кошик порожній</h2>
        <p className="text-base">Вперед до покупок :)</p>
      </span>
    </div>
  );
};

export default ShoppingCard;
