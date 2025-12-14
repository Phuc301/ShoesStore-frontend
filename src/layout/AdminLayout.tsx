import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout() {
  const [isSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} />
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        } px-6 bg-gray-100`}
      >
        <Outlet />
      </main>
    </div>
  );
}
