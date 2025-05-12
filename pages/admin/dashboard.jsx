import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FiUsers, FiBookOpen, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { mockDashboardStats } from '@/utils/mockData';

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, increase, color }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 rounded-md flex items-center justify-center ${color}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-xl font-semibold text-gray-900">{value.toLocaleString()}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`bg-gray-50 px-5 py-2 border-t border-gray-200`}>
        <div className="text-sm">
          {increase > 0 ? (
            <span className="text-green-600 font-medium">
              +{increase}% <span className="text-gray-500">from last month</span>
            </span>
          ) : increase < 0 ? (
            <span className="text-red-600 font-medium">
              {increase}% <span className="text-gray-500">from last month</span>
            </span>
          ) : (
            <span className="text-gray-500 font-medium">No change from last month</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Recent Activity Component
const ActivityItem = ({ title, message, time, type }) => {
  const getIconColor = (type) => {
    switch (type) {
      case 'course':
        return 'bg-blue-500';
      case 'student':
        return 'bg-green-500';
      case 'faculty':
        return 'bg-purple-500';
      case 'event':
        return 'bg-yellow-500';
      case 'invoice':
        return 'bg-indigo-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'course':
        return <FiBookOpen className="h-4 w-4 text-white" />;
      case 'student':
      case 'faculty':
        return <FiUsers className="h-4 w-4 text-white" />;
      case 'event':
        return <FiCalendar className="h-4 w-4 text-white" />;
      case 'invoice':
        return <FiDollarSign className="h-4 w-4 text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex py-3">
      <div className={`${getIconColor(type)} h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
        {getIcon(type)}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with mock data
    setTimeout(() => {
      setStats(mockDashboardStats);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      title: 'New Student Registration',
      message: 'Student Ayesha Khan has been registered in Computer Science department.',
      time: '2 hours ago',
      type: 'student'
    },
    {
      id: 2,
      title: 'New Course Added',
      message: 'Course "Introduction to Artificial Intelligence" has been added to the curriculum.',
      time: '5 hours ago',
      type: 'course'
    },
    {
      id: 3,
      title: 'Faculty Leave Request',
      message: 'Prof. Sana Khan has requested leave for next Monday.',
      time: '1 day ago',
      type: 'faculty'
    },
    {
      id: 4,
      title: 'Event Scheduled',
      message: 'Annual Sports Day has been scheduled for October 20.',
      time: '2 days ago',
      type: 'event'
    },
    {
      id: 5,
      title: 'Invoice Generated',
      message: 'Semester fee invoices have been generated for all students.',
      time: '3 days ago',
      type: 'invoice'
    }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Orientation Day',
      date: 'September 1, 2023',
      location: 'Main Auditorium'
    },
    {
      id: 2,
      title: 'Faculty Meeting',
      date: 'September 15, 2023',
      location: 'Conference Room'
    },
    {
      id: 3,
      title: 'Annual Sports Day',
      date: 'October 20, 2023',
      location: 'Sports Complex'
    }
  ];

  return (
    <Layout title="Admin Dashboard">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Students"
              value={stats.students.total}
              increase={stats.students.increase}
              icon={FiUsers}
              color="bg-blue-500"
            />
            <StatCard
              title="Total Faculty"
              value={stats.faculty.total}
              increase={stats.faculty.increase}
              icon={FiUsers}
              color="bg-purple-500"
            />
            <StatCard
              title="Total Courses"
              value={stats.courses.total}
              increase={stats.courses.increase}
              icon={FiBookOpen}
              color="bg-green-500"
            />
            <StatCard
              title="Upcoming Events"
              value={stats.events.total}
              increase={stats.events.increase}
              icon={FiCalendar}
              color="bg-yellow-500"
            />
          </div>

          {/* Activity and Events */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6 divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} {...activity} />
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Events</h3>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  {upcomingEvents.map((event) => (
                    <li key={event.id} className="py-4">
                      <div className="flex space-x-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">{event.title}</h3>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <p>{event.date}</p>
                            <p>{event.location}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a
                    href="/admin/events"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View all events
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <a
                  href="/admin/users"
                  className="group flex items-center p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <div className="bg-blue-500 group-hover:bg-blue-600 p-2 rounded-full mr-3">
                    <FiUsers className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700">Manage Users</span>
                </a>
                <a
                  href="/admin/courses"
                  className="group flex items-center p-4 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-colors"
                >
                  <div className="bg-green-500 group-hover:bg-green-600 p-2 rounded-full mr-3">
                    <FiBookOpen className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-green-700">Manage Courses</span>
                </a>
                <a
                  href="/admin/events"
                  className="group flex items-center p-4 rounded-lg border border-gray-200 hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
                >
                  <div className="bg-yellow-500 group-hover:bg-yellow-600 p-2 rounded-full mr-3">
                    <FiCalendar className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-yellow-700">Manage Events</span>
                </a>
                <a
                  href="/admin/invoices"
                  className="group flex items-center p-4 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                >
                  <div className="bg-indigo-500 group-hover:bg-indigo-600 p-2 rounded-full mr-3">
                    <FiDollarSign className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-indigo-700">Generate Invoices</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}