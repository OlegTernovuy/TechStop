import { additionalServices } from "@/constants";
import { useCartStore } from "@/store/useCartStore";
import { AddServices } from "@/types";

const AdditionalServicesDesktop = () => {
  const { addAdditionalServices, checkAddService } = useCartStore();

  const addServiceToCart = (service: AddServices) => {
    addAdditionalServices(service);
  };
  return (
    <div>
      <h3 className="text-Headline6 text-TechStopBlue pb-3">
        Додаткові послуги
      </h3>
      <ul className="flex flex-col gap-4">
        {additionalServices.length ? (
          additionalServices.map(
            (service: {
              id: number;
              title: string;
              desc: string;
              servicesPrice: number;
            }) => {
              return (
                <li key={service.id} className="flex justify-between ">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={Boolean(checkAddService(service.id))}
                      onChange={() => addServiceToCart(service)}
                      className=" mr-2 w-[18px] h-[18px] "
                    />
                    <label className="text-body1">{service.title}</label>
                  </div>
                  <span className="text-Headline6">
                    {service.servicesPrice}
                  </span>
                </li>
              );
            }
          )
        ) : (
          <div>Not Data</div>
        )}
      </ul>
    </div>
  );
};

export default AdditionalServicesDesktop;
