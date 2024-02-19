import Image from "next/image";

const CheaperTogether = () => {
  return (
    <div className="flex pb-2 mb-2 border-b">
      <Image
        src="/shoppingCardItemTest.svg"
        alt="item"
        width={64}
        height={96}
        className="min-h-24 object-cover"
      />
      <div className="pl-2 flex flex-col justify-between">
        <p className="text-sm">
          Дуже довга назва товару з якимись цифрами HTG-7658
        </p>
        <span className="text-subtitle1">19 999</span>
      </div>
    </div>
  );
};

export default CheaperTogether;
