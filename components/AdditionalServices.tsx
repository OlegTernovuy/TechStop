import Image from "next/image";

const AdditionalServices = () => {
  return (
    <div className="flex justify-between min-w-[32%] py-4">
      <div>
        <div className="flex items-center pb-4">
          <div className="w-2 h-2 rounded-full bg-deWiseMain mr-2"></div>
          <h4 className="text-subtitle1 text-[20px]">Страховка</h4>
        </div>
        <p className="text-sm pl-4 w-80">
          Короткий опис послуги, в якому описані основні переваги тут може бути
          достатньо тексту, але все залежить від кількості послуг
        </p>
      </div>
      <div className="flex flex-col justify-between items-end pl-6">
        <span className="flex">
          1700{" "}
          <Image
            src="/ukraineHryvna.svg"
            alt="ukraineHryvna"
            width={12}
            height={12}
          />
        </span>
        <Image
          src="/tifanyCard.svg"
          alt="shoppingCard"
          width={32}
          height={32}
          className="stroke-black text-deWiseMain"
        />
      </div>
    </div>
  );
};

export default AdditionalServices;
