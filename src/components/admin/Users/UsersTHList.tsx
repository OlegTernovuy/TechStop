import React from "react";
import { usersTHList } from "../constants";

const UsersTHList = () => {
  return (
    <tr>
      {usersTHList.map((item) => (
        <th className="w-1/6 p-3 text-lef" key={item?.id}>
          {item?.title}
        </th>
      ))}
    </tr>
  );
};

export default UsersTHList;
