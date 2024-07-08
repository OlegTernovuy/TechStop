"use client";

import withAuth from "@/components/hoc/withAuth";

const DashboardPage = () => {
  return (
    <div className="mb-screen">
      <h1 className="text-5xl text-TechStopBlue font-bold mb-4">Dashboard</h1>
      <p className="text-TechStopBlue text-3xl">
        Welcome to the admin dashboard!
      </p>
    </div>
  );
};

export default withAuth(DashboardPage);
