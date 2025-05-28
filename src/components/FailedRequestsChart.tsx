import React from 'react';
import { useDashboardData } from '../services/DashboardContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FailedRequestsChart: React.FC = () => {
  const { failedRequestsData, loading, errors } = useDashboardData();

  if (loading.failedRequestsData && failedRequestsData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Failed Requests (%)</h2>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (errors.failedRequestsData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Failed Requests (%)</h2>
        <div className="text-red-500">{errors.failedRequestsData}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Failed Requests (%)</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={failedRequestsData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="hour" 
              tick={{ fontSize: 12 }}
              interval={3} // Show every 4th label to avoid crowding
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              width={40}
              domain={[0, 5]} // Set domain from 0 to 5%
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Failure Rate']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="percentage" 
              stroke="#EF4444" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5, stroke: '#DC2626', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FailedRequestsChart;
