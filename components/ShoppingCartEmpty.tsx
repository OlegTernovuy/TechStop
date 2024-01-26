import Image from "next/image";

const ShoppingCardEmpty = () => {
  return (
    <div className="text-deWiseBlack">
      <div className="flex flex-col pt-[10%] px-4 items-center text-center">
        <Image
          src="/shoppingCardEmpty.svg"
          alt="ShoppingCartEmpty"
          width={400}
          height={400}
          className="max-w-[230px] md:max-w-full"
        />
        <span>
          <h2 className="text-Headline5 md:text-Headline3 pt-8 pb-1 md:pb-6">
            Кошик порожній
          </h2>
          <p className="text-base md:text-Headline5">Вперед до покупок :)</p>
        </span>
      </div>
    </div>
  );
};

export default ShoppingCardEmpty;
