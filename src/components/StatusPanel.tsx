import React from 'react';
import { useDashboardData } from '../services/DashboardContext';

const StatusPanel: React.FC = () => {
  const { serviceStatus, loading, errors } = useDashboardData();

  if (loading.serviceStatus && serviceStatus.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Service Status</h2>
        <div className="animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center mb-3">
              <div className="w-4 h-4 rounded-full bg-gray-200 mr-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (errors.serviceStatus) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Service Status</h2>
        <div className="text-red-500">{errors.serviceStatus}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Service Status</h2>
      <div className="space-y-3">
        {serviceStatus.map((service) => (
          <div key={service.id} className="flex items-center justify-between">
            <div className="flex items-center">
              {service.status === 'online' ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-success mr-3" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-error mr-3" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              )}
              <span>{service.name}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              service.status === 'online' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {service.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusPanel;
