import React from "react";
import CategoriesTHList from "./CategoriesTHList";
import CategoriesList from "./CategoriesList";

const Categories = () => {
  return (
    <div className="overflow-auto z-1000000">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <CategoriesTHList />
        </thead>{" "}
        <tbody>
          <CategoriesList />
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
