import React from "react";
import OrdersTHList from "./OrdersTHList";
import OrdersList from "./OrdersList";

const AdminOrders = () => {
  return (
    <div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <OrdersTHList />
        </thead>{" "}
        <tbody>
          <OrdersList />
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
