import { useState } from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children, title = 'EduSync Admin' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content="EduSync Education Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />

          <main className="relative flex-1 overflow-y-auto focus:outline-none p-6">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>

            {/* Page Content */}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}