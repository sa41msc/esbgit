import React from 'react';
import { useDashboardData } from '../services/DashboardContext';
// Import the icon as a component instead
import { FiAlertTriangle as AlertIcon } from 'react-icons/fi';

const RecentErrorsTable: React.FC = () => {
  const { recentErrors, loading, errors } = useDashboardData();

  // Format timestamp to a more readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading.recentErrors && recentErrors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Errors</h2>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (errors.recentErrors) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Errors</h2>
        <div className="text-red-500">{errors.recentErrors}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Errors</h2>
      
      {recentErrors.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          {/* Use a simple SVG instead of the problematic icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="mx-auto h-6 w-6 mb-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <p>No recent errors to display</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Error Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentErrors.map((entry: any) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTimestamp(entry.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {entry.service}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentErrorsTable;
