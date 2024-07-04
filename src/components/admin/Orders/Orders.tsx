import React, { FC } from "react";
import OrdersTHList from "./OrdersTHList";
import OrdersList from "./OrdersList";
import BtnToTop from "@/components/ProductCard/BtnToTop";

const Orders: FC = () => {
  return (
    <div className="overflow-auto z-1000000">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <OrdersTHList />
        </thead>{" "}
        <tbody>
          <OrdersList />
        </tbody>
      </table>
      <BtnToTop />
    </div>
  );
};

export default Orders;
