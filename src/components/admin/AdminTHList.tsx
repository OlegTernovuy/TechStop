import React from "react";
import { thList } from "./constants";

const AdminTHList = () => {
  return (
    <tr>
      {thList.map((item) => (
        <th className="w-1/6 p-3 text-lef" key={item?.id}>
          {item?.title}
        </th>
      ))}
    </tr>
  );
};

export default AdminTHList;
