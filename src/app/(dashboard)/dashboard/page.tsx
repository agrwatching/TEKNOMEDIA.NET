// src/app/(dashboard)/dashboard/page.tsx
import React from "react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">1,245</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">Total Posts</h2>
          <p className="text-3xl font-bold">310</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">Active Sessions</h2>
          <p className="text-3xl font-bold">87</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">New Messages</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="p-3 border rounded-lg">User John added a new post</li>
          <li className="p-3 border rounded-lg">Admin updated the settings</li>
          <li className="p-3 border rounded-lg">New user registered: Sarah</li>
        </ul>
      </div>
    </div>
  );
}
