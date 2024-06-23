import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { AddServices, AdditionalServicesDesktopType } from "../../types";
import { checkboxLabels } from "../../constants";

const AdditionalServicesMobile = (productId: AdditionalServicesDesktopType) => {
  const { addAdditionalServices, checkAddService } = useCartStore();

  const addServiceToCart = (service: AddServices) => {
    addAdditionalServices(service, productId);
  };
  return (
    <div className="w-full">
      <div className="mx-auto w-full mt-4 p-4 border-[1px] border-[#26262680] rounded-lg bg-white">
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between items-center rounded-lg text-left text-subtitle1  focus:outline-none focus-visible:ring ">
                <span>Додаткові послуги (3)</span>
                <Image
                  src="/up.svg"
                  alt="up icon"
                  width={12}
                  height={12}
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-3 w-3 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 text-sm text-gray-500">
                <ul>
                  {checkboxLabels.length ? (
                    checkboxLabels.map(
                      (service: {
                        servicesId: number;
                        servicesTitle: string;
                        servicesDesc: string;
                        servicesPrice: number;
                      }) => {
                        return (
                          <li
                            key={service.servicesId}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center">
                              <input
                                id="vue-checkbox"
                                type="checkbox"
                                checked={Boolean(
                                  checkAddService(service.servicesId, productId)
                                )}
                                onChange={() => addServiceToCart(service)}
                                className="w-5 h-5 "
                                style={{accentColor: "#667f9abd"}}
                              />
                              <label className="w-full py-3 ms-3 text-sm">
                                {service.servicesDesc}
                              </label>
                            </div>
                            <span>{service.servicesPrice + ' ₴'}</span>
                          </li>
                        );
                      }
                    )
                  ) : (
                    <div>Not Data</div>
                  )}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default AdditionalServicesMobile;
