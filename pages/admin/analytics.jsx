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
    student: { 
      overall: { labels: [], present: [], absent: [], late: [] },
      departmentWise: { labels: [], present: [], absent: [], late: [] }
    },
    faculty: { 
      overall: { labels: [], present: [], absent: [], late: [] },
      departmentWise: { labels: [], present: [], absent: [], late: [] }
    }
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students');

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        
        const departmentData = await getDepartmentDistribution();
        setDepartmentDistribution(departmentData);
        
        const facultyData = await getFacultyPerformance();
        setFacultyPerformance(facultyData);
        
        const revenueDataResponse = await getRevenueData();
        setRevenueData(revenueDataResponse);
        
        const attendanceAnalytics = await getAttendanceAnalytics();
        setAttendanceData({
          student: {
            overall: attendanceAnalytics?.student?.overall || { labels: [], present: [], absent: [], late: [] },
            departmentWise: attendanceAnalytics?.student?.departmentWise || { labels: [], present: [], absent: [], late: [] }
          },
          faculty: {
            overall: attendanceAnalytics?.faculty?.overall || { labels: [], present: [], absent: [], late: [] },
            departmentWise: attendanceAnalytics?.faculty?.departmentWise || { labels: [], present: [], absent: [], late: [] }
          }
        });
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, []);
  
  const handleExportCharts = () => {
    alert('This would export the charts to Excel/CSV or as images.');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Department-wise Student Distribution</h2>
              <div className="h-80">
                <ChartComponent
                  type="bar"
                  data={{
                    labels: departmentDistribution.labels,
                    datasets: [
                      {
                        label: 'Number of Students',
                        data: departmentDistribution.data,
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Student Attendance Trends</h2>
                <div className="h-80">
                  <ChartComponent
                    type="line"
                    data={{
                      labels: attendanceData.student.overall.labels,
                      datasets: [
                        {
                          label: 'Present',
                          data: attendanceData.student.overall.present,
                          borderColor: 'rgba(16, 185, 129, 1)',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                        {
                          label: 'Absent',
                          data: attendanceData.student.overall.absent,
                          borderColor: 'rgba(239, 68, 68, 1)',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                        {
                          label: 'Late',
                          data: attendanceData.student.overall.late,
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
                      labels: attendanceData.student.departmentWise.labels,
                      datasets: [
                        {
                          label: 'Present',
                          data: attendanceData.student.departmentWise.present,
                          backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        },
                        {
                          label: 'Absent',
                          data: attendanceData.student.departmentWise.absent,
                          backgroundColor: 'rgba(239, 68, 68, 0.7)',
                        },
                        {
                          label: 'Late',
                          data: attendanceData.student.departmentWise.late,
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

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Revenue Trends</h2>
              <div className="h-80">
                <ChartComponent
                  type="line"
                  data={revenueData}
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

        {activeTab === 'faculty' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Faculty Performance Metrics</h2>
              <div className="h-80">
                <ChartComponent
                  type="radar"
                  data={facultyPerformance}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Faculty Attendance Trends</h2>
                <div className="h-80">
                  <ChartComponent
                    type="line"
                    data={{
                      labels: attendanceData.faculty.overall.labels,
                      datasets: [
                        {
                          label: 'Present',
                          data: attendanceData.faculty.overall.present,
                          borderColor: 'rgba(16, 185, 129, 1)',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                        {
                          label: 'Absent',
                          data: attendanceData.faculty.overall.absent,
                          borderColor: 'rgba(239, 68, 68, 1)',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                        {
                          label: 'Late',
                          data: attendanceData.faculty.overall.late,
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

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Classes Taught Per Department</h2>
              <div className="h-80">
                <ChartComponent
                  type="doughnut"
                  data={{
                    labels: departmentDistribution.labels,
                    datasets: [
                      {
                        data: [15, 12, 8, 10, 7],
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