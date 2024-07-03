import { PurchasesDeliveryAddress } from "@/app/account/purchases/purchasesType";
import React, { FC } from "react";

interface IDeliveryAddressListProps {
  deliveryAddress: PurchasesDeliveryAddress;
}

const DeliveryAddressList: FC<IDeliveryAddressListProps> = ({
  deliveryAddress,
}) => {
  return (
    <>
      {deliveryAddress &&
        [Object(deliveryAddress)].map(
          ({ city, street, house, apartment }, idx) => (
            <li key={idx}>
              {" "}
              <p className="text-TechStopBlue font-bold ">
                Місто - <span className="text-white">{city}</span>
              </p>
              <p className="text-TechStopBlue font-bold ">
                Вулиця - <span className="text-white">{street}</span>
              </p>
              <p className="text-TechStopBlue font-bold ">
                Будинок - <span className="text-white">{house}</span>
              </p>
              <p className="text-TechStopBlue font-bold ">
                квартира - <span className="text-white">{apartment}</span>
              </p>
            </li>
          )
        )}
    </>
  );
};

export default DeliveryAddressList;
