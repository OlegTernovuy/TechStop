import React from "react";
import { ordersThList } from "../constants";

const OrdersTHList = () => {
  return (
    <tr>
      {ordersThList.map((item) => (
        <th className="w-1/6 p-3 text-lef" key={item?.id}>
          {item?.title}
        </th>
      ))}
    </tr>
  );
};

export default OrdersTHList;
