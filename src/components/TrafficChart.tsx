import React from 'react';
import { useDashboardData } from '../services/DashboardContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrafficChart: React.FC = () => {
  const { trafficData, loading, errors } = useDashboardData();

  if (loading.trafficData && trafficData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Traffic (24h)</h2>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (errors.trafficData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Traffic (24h)</h2>
        <div className="text-red-500">{errors.trafficData}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Traffic (24h)</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trafficData}
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
            />
            <Tooltip 
              formatter={(value) => [`${value} requests`, 'Traffic']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="requests" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5, stroke: '#2563EB', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficChart;
