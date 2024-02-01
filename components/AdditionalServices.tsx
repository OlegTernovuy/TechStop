import Image from "next/image";
import { AddServices } from "../types";
import { useCartStore } from "@/store/useCartStore";

interface AddServicesProps {
  service: AddServices;
}

const AdditionalServices = ({ service }: AddServicesProps) => {
  const { addAdditionalServices } = useCartStore();

  const addServiceToCart = () => {
    addAdditionalServices(service);
  };
  return (
    <div className="flex justify-between py-4">
      <div className="flex flex-col pb-4">
        <h4 className="text-subtitle1 !text-[20px] pb-2">{service.title}</h4>
        <p className="text-sm max-w-72">{service.desc}</p>
      </div>
      <div className="flex flex-col justify-between items-end pl-6">
        <span className="flex">
          {service.servicesPrice}
          <Image
            src="/ukraineHryvna.svg"
            alt="ukraineHryvna"
            width={12}
            height={12}
          />
        </span>
        <button onClick={addServiceToCart}>
          <Image
            src="/tifanyCard.svg"
            alt="shoppingCard"
            width={32}
            height={32}
            className="stroke-black text-deWiseMain"
          />
        </button>
      </div>
    </div>
  );
};

export default AdditionalServices;
