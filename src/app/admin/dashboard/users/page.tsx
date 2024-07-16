"use client";

import Users from "@/components/admin/Users/Users";
import withAuth from "@/components/hoc/withAuth";

const UsersPage = () => {
  return (
    <div>
      <h1 className="text-5xl text-TechStopBlue font-bold mb-4">Users</h1>
      <p className="text-TechStopBlue text-3xl">Manage your users here.</p>

      <Users />
    </div>
  );
};

export default withAuth(UsersPage);
