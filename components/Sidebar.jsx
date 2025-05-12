import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  FiX, FiHome, FiUsers, FiCalendar, FiBookOpen, 
  FiClock, FiFileText, FiMail, FiBarChart2, FiSettings 
} from 'react-icons/fi';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const router = useRouter();
  
  // Get current path for active state
  const currentPath = router.pathname;

  // Navigation items
  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: FiHome 
    },
    { 
      name: 'User Management', 
      href: '/admin/users', 
      icon: FiUsers 
    },
    { 
      name: 'Courses', 
      href: '/admin/courses', 
      icon: FiBookOpen 
    },
    { 
      name: 'Timetable', 
      href: '/admin/timetable', 
      icon: FiClock 
    },
    { 
      name: 'Attendance', 
      href: '/admin/attendance', 
      icon: FiCalendar 
    },
    { 
      name: 'Events', 
      href: '/admin/events', 
      icon: FiCalendar 
    },
    { 
      name: 'Invoices', 
      href: '/admin/invoices', 
      icon: FiFileText 
    },
    { 
      name: 'Messages', 
      href: '/admin/messages', 
      icon: FiMail 
    },
    { 
      name: 'Leave Requests', 
      href: '/admin/leaves', 
      icon: FiCalendar 
    },
    { 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: FiBarChart2 
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: FiSettings 
    },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:z-auto`}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link href="/admin/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">EduSync</span>
          </Link>
          <button 
            type="button" 
            className="text-gray-500 hover:text-gray-600 md:hidden" 
            onClick={toggleSidebar}
          >
            <span className="sr-only">Close sidebar</span>
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="h-0 flex-1 flex flex-col overflow-y-auto pt-4">
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <span>A</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@edusync.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}