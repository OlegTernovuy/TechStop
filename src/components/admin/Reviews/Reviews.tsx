import React from "react";
import ReviewsTHList from "./ReviewsTHList";
import ReviewsList from "./ReviewsList";

const AdminReviews = () => {
  return (
    <div className="overflow-auto z-1000000">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <ReviewsTHList />
        </thead>{" "}
        <tbody>
          <ReviewsList />
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviews;
