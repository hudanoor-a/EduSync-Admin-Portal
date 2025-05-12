import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiDownload } from 'react-icons/fi';
import ChartComponent from '../../components/ChartComponent';
import { 
  getDepartmentDistribution, 
  getFacultyPerformance, 
  getRevenueData, 
  getAttendanceAnalytics 
} from '../../utils/adminApi';

export default function Analytics() {
  const [departmentDistribution, setDepartmentDistribution] = useState({
    labels: [],
    data: []
  });
  const [facultyPerformance, setFacultyPerformance] = useState({
    labels: [],
    datasets: []
  });
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: []
  });
  const [attendanceData, setAttendanceData] = useState({
    student: { overall: {}, departmentWise: {} },
    faculty: { overall: {}, departmentWise: {} }
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students'); // 'students' or 'faculty'

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        
        // Fetch department distribution data
        const departmentData = await getDepartmentDistribution();
        setDepartmentDistribution(departmentData);
        
        // Fetch faculty performance data
        const facultyData = await getFacultyPerformance();
        setFacultyPerformance(facultyData);
        
        // Fetch revenue data
        const revenueDataResponse = await getRevenueData();
        setRevenueData(revenueDataResponse);
        
        // Fetch attendance analytics
        const attendanceAnalytics = await getAttendanceAnalytics();
        setAttendanceData(attendanceAnalytics);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, []);
  
  const handleExportCharts = () => {
    // Logic to export charts as images or data to Excel/CSV
    alert('This would export the charts to Excel/CSV or as images.');
  };

  return (
    <>
      <Head>
        <title>Analytics | EduSync</title>
      </Head>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleExportCharts}
              className="btn btn-secondary flex items-center"
            >
              <FiDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* View Type Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('students')}
            className={`py-2 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'students'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Student Analytics
          </button>
          <button
            onClick={() => setActiveTab('faculty')}
            className={`ml-4 py-2 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'faculty'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Faculty Analytics
          </button>
        </div>

        {/* Student Analytics Section */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Department Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Department-wise Student Distribution</h2>
              <div className="h-80">
                <ChartComponent
                  type="bar"
                  data={{
                    labels: departmentDistribution?.labels || ['Science', 'Arts', 'Commerce', 'Engineering', 'Medical'],
                    datasets: [
                      {
                        label: 'Number of Students',
                        data: departmentDistribution?.data || [120, 85, 90, 110, 95],
                        backgroundColor: [
                          'rgba(54, 162, 235, 0.7)',
                          'rgba(255, 99, 132, 0.7)',
                          'rgba(255, 206, 86, 0.7)',
                          'rgba(75, 192, 192, 0.7)',
                          'rgba(153, 102, 255, 0.7)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Number of Students',
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Department',
                        },
                      },
                    },
                  }}
                  height={300}
                />
              </div>
            </div>

            {/* Student Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Student Attendance Trends</h2>
                <div className="h-80">
                  <ChartComponent
                    type="line"
                    data={{
                      labels: attendanceData?.student?.overall?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                      datasets: [
                        {
                          label: 'Present',
                          data: attendanceData?.student?.overall?.present || [85, 82, 88, 90, 85],
                          borderColor: 'rgba(16, 185, 129, 1)',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                        {
                          label: 'Absent',
                          data: attendanceData?.student?.overall?.absent || [10, 12, 8, 5, 10],
                          borderColor: 'rgba(239, 68, 68, 1)',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                        {
                          label: 'Late',
                          data: attendanceData?.student?.overall?.late || [5, 6, 4, 5, 5],
                          borderColor: 'rgba(245, 158, 11, 1)',
                          backgroundColor: 'rgba(245, 158, 11, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          title: {
                            display: true,
                            text: 'Percentage',
                          },
                          ticks: {
                            callback: function(value) {
                              return value + '%';
                            }
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'Month',
                          },
                        },
                      },
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                label += ': ';
                              }
                              if (context.parsed.y !== null) {
                                label += context.parsed.y + '%';
                              }
                              return label;
                            }
                          }
                        }
                      }
                    }}
                    height={300}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Department-wise Attendance</h2>
                <div className="h-80">
                  <ChartComponent
                    type="bar"
                    data={{
                      labels: attendanceData?.student?.departmentWise?.labels || ['Science', 'Arts', 'Commerce', 'Engineering', 'Medical'],
                      datasets: [
                        {
                          label: 'Present',
                          data: attendanceData?.student?.departmentWise?.present || [88, 85, 82, 90, 87],
                          backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        },
                        {
                          label: 'Absent',
                          data: attendanceData?.student?.departmentWise?.absent || [8, 10, 12, 6, 9],
                          backgroundColor: 'rgba(239, 68, 68, 0.7)',
                        },
                        {
                          label: 'Late',
                          data: attendanceData?.student?.departmentWise?.late || [4, 5, 6, 4, 4],
                          backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        },
                      ],
                    }}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          title: {
                            display: true,
                            text: 'Percentage',
                          },
                          ticks: {
                            callback: function(value) {
                              return value + '%';
                            }
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'Department',
                          },
                        },
                      },
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                label += ': ';
                              }
                              if (context.parsed.y !== null) {
                                label += context.parsed.y + '%';
                              }
                              return label;
                            }
                          }
                        }
                      }
                    }}
                    height={300}
                  />
                </div>
              </div>
            </div>

            {/* Financial Data */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Revenue Trends</h2>
              <div className="h-80">
                <ChartComponent
                  type="line"
                  data={revenueData || {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                      {
                        label: 'Tuition Fees',
                        data: [45000, 52000, 48000, 50000, 55000, 60000],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        tension: 0.4,
                      },
                      {
                        label: 'Other Income',
                        data: [12000, 15000, 18000, 14000, 20000, 16000],
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.1)',
                        tension: 0.4,
                      }
                    ]
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Amount (USD)',
                        },
                        ticks: {
                          callback: function(value) {
                            return '$' + value.toLocaleString();
                          }
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Month',
                        },
                      },
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                              label += ': ';
                            }
                            if (context.parsed.y !== null) {
                              label += '$' + context.parsed.y.toLocaleString();
                            }
                            return label;
                          }
                        }
                      }
                    }
                  }}
                  height={300}
                />
              </div>
            </div>
          </div>
        )}

        {/* Faculty Analytics Section */}
        {activeTab === 'faculty' && (
          <div className="space-y-6">
            {/* Faculty Performance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Faculty Performance Metrics</h2>
              <div className="h-80">
                <ChartComponent
                  type="radar"
                  data={facultyPerformance || {
                    labels: ['Teaching Quality', 'Student Feedback', 'Research', 'Punctuality', 'Mentorship'],
                    datasets: [
                      {
                        label: 'Department Average',
                        data: [4.2, 3.8, 3.5, 4.5, 4.0],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
                      },
                      {
                        label: 'Institution Average',
                        data: [3.8, 3.9, 3.7, 4.2, 3.8],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                      }
                    ]
                  }}
                  options={{
                    scales: {
                      r: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                          stepSize: 1
                        }
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                              label += ': ';
                            }
                            if (context.parsed.r !== null) {
                              label += context.parsed.r.toFixed(1) + '/5';
                            }
                            return label;
                          }
                        }
                      }
                    }
                  }}
                  height={300}
                />
              </div>
            </div>

            {/* Faculty Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Faculty Attendance Trends</h2>
                <div className="h-80">
                  <ChartComponent
                    type="line"
                    data={{
                      labels: attendanceData?.faculty?.overall?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                      datasets: [
                        {
                          label: 'Present',
                          data: attendanceData?.faculty?.overall?.present || [92, 90, 94, 95, 93],
                          borderColor: 'rgba(16, 185, 129, 1)',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                        {
                          label: 'Absent',
                          data: attendanceData?.faculty?.overall?.absent || [5, 7, 4, 3, 5],
                          borderColor: 'rgba(239, 68, 68, 1)',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                        {
                          label: 'Late',
                          data: attendanceData?.faculty?.overall?.late || [3, 3, 2, 2, 2],
                          borderColor: 'rgba(245, 158, 11, 1)',
                          backgroundColor: 'rgba(245, 158, 11, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          title: {
                            display: true,
                            text: 'Percentage',
                          },
                          ticks: {
                            callback: function(value) {
                              return value + '%';
                            }
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'Month',
                          },
                        },
                      },
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                label += ': ';
                              }
                              if (context.parsed.y !== null) {
                                label += context.parsed.y + '%';
                              }
                              return label;
                            }
                          }
                        }
                      }
                    }}
                    height={300}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Department-wise Faculty Attendance</h2>
                <div className="h-80">
                  <ChartComponent
                    type="bar"
                    data={{
                      labels: attendanceData.faculty.departmentWise.labels,
                      datasets: [
                        {
                          label: 'Present',
                          data: attendanceData.faculty.departmentWise.present,
                          backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        },
                        {
                          label: 'Absent',
                          data: attendanceData.faculty.departmentWise.absent,
                          backgroundColor: 'rgba(239, 68, 68, 0.7)',
                        },
                        {
                          label: 'Late',
                          data: attendanceData.faculty.departmentWise.late,
                          backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        },
                      ],
                    }}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          title: {
                            display: true,
                            text: 'Percentage',
                          },
                          ticks: {
                            callback: function(value) {
                              return value + '%';
                            }
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'Department',
                          },
                        },
                      },
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                label += ': ';
                              }
                              if (context.parsed.y !== null) {
                                label += context.parsed.y + '%';
                              }
                              return label;
                            }
                          }
                        }
                      }
                    }}
                    height={300}
                  />
                </div>
              </div>
            </div>

            {/* Classes Taught Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Classes Taught Per Department</h2>
              <div className="h-80">
                <ChartComponent
                  type="doughnut"
                  data={{
                    labels: departmentDistribution.labels,
                    datasets: [
                      {
                        data: [15, 12, 8, 10, 7], // Example data for classes taught
                        backgroundColor: [
                          'rgba(54, 162, 235, 0.7)',
                          'rgba(255, 99, 132, 0.7)',
                          'rgba(255, 206, 86, 0.7)',
                          'rgba(75, 192, 192, 0.7)',
                          'rgba(153, 102, 255, 0.7)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} classes (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                  height={300}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
