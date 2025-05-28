import React from 'react';
import { useDashboardData } from '../services/DashboardContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ApiUsageBar: React.FC = () => {
  const { apiUsageData, loading, errors } = useDashboardData();

  if (loading.apiUsageData && apiUsageData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">API Usage</h2>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (errors.apiUsageData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">API Usage</h2>
        <div className="text-red-500">{errors.apiUsageData}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">API Usage</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={apiUsageData}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="endpoint" 
              type="category" 
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip 
              formatter={(value) => [`${value} requests`, 'Count']}
              labelFormatter={(label) => `Endpoint: ${label}`}
            />
            <Bar 
              dataKey="requests" 
              fill="#8B5CF6" 
              barSize={20}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ApiUsageBar;
