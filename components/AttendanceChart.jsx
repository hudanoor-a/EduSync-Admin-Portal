import React from 'react';
import ChartComponent from './ChartComponent';

export default function AttendanceChart({ data, type = 'student' }) {
  // Prepare data for chart
  const chartData = {
    labels: data.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Present',
        data: data.present || [65, 70, 80, 81, 90, 85],
        backgroundColor: '#10B981',
        borderColor: '#10B981',
        borderWidth: 1,
      },
      {
        label: 'Absent',
        data: data.absent || [25, 20, 15, 10, 5, 10],
        backgroundColor: '#EF4444',
        borderColor: '#EF4444',
        borderWidth: 1,
      },
      {
        label: 'Late',
        data: data.late || [10, 10, 5, 9, 5, 5],
        backgroundColor: '#F59E0B',
        borderColor: '#F59E0B',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: type === 'student' ? 'Student Attendance Trends' : 'Faculty Attendance Report',
        font: { size: 16 },
      },
      legend: {
        position: 'bottom',
      },
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
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Percentage',
        },
        min: 0,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-80 p-4 bg-white rounded-lg shadow">
      <ChartComponent
        type="bar"
        data={chartData}
        options={options}
        height={300}
      />
    </div>
  );
}
