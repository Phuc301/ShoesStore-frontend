import Header from '@/components/auth/Header';
import Footer from '@/components/auth/Footer';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
