import Image from "next/image";

const AdditionalServices = () => {
  return (
    <div className="flex justify-between py-4">
      <div className="flex flex-col pb-4">
        <h4 className="text-subtitle1 text-[20px] pb-2">Страховка</h4>
        <p className="text-sm max-w-72">
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
