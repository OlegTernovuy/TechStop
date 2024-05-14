'"use client";';

import { useFavoritesStore } from "@/store/useFavoritesStore";
import { FC } from "react";

const TestFavorites: FC = () => {
  const { favorites } = useFavoritesStore();

  return (
    <div>
      {favorites.map(({ _id, price, title }) => (
        <li key={_id} className="text-TechStopBlue">
          <p>
            PRICE <strong>{price}</strong>
          </p>
          <p>
            TITLE <strong>{title}</strong>
          </p>
          <p>
            ID <strong>{_id}</strong>
          </p>
        </li>
      ))}
    </div>
  );
};

export default TestFavorites;
