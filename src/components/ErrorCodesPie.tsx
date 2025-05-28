import React from 'react';
import { useDashboardData } from '../services/DashboardContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ErrorCodesPie: React.FC = () => {
  const { errorStats, loading, errors } = useDashboardData();

  // Colors for different error types
  const COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899'];

  if (loading.errorStats && errorStats.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Error Codes Distribution</h2>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (errors.errorStats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Error Codes Distribution</h2>
        <div className="text-red-500">{errors.errorStats}</div>
      </div>
    );
  }

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{`${data.code}: ${data.name}`}</p>
          <p>{`Count: ${data.count}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Error Codes Distribution</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={errorStats}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              nameKey="code"
              label={({ code, percent }) => `${code} (${(percent * 100).toFixed(0)}%)`}
            >
              {errorStats.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ErrorCodesPie;
