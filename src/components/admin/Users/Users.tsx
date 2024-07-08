import React from "react";
import UsersTHList from "./UsersTHList";
import UsersList from "./UsersList";

const Users = () => {
  return (
    <div className="overflow-auto z-1000000">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <UsersTHList />
        </thead>{" "}
        <tbody>
          <UsersList />
        </tbody>
      </table>
    </div>
  );
};

export default Users;
