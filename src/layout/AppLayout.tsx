import Footer from '@/components/user/Footer';
import Header from '@/components/user/Header';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
