import React from 'react';
import StatusPanel from '../components/StatusPanel';
import LatencyHeatmap from '../components/LatencyHeatmap';
import TrafficChart from '../components/TrafficChart';
import FailedRequestsChart from '../components/FailedRequestsChart';
import ErrorCodesPie from '../components/ErrorCodesPie';
import ApiUsageBar from '../components/ApiUsageBar';
import RecentErrorsTable from '../components/RecentErrorsTable';
import { useDashboardData } from '../services/DashboardContext';

const Dashboard: React.FC = () => {
  const { refreshData } = useDashboardData();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">ESB Network Dashboard</h1>
          <button 
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Refresh dashboard data"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            Refresh
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Status Panel */}
          <div className="col-span-1">
            <StatusPanel />
          </div>
          
          {/* Traffic Chart */}
          <div className="col-span-1 md:col-span-2">
            <TrafficChart />
          </div>
          
          {/* Latency Heatmap */}
          <div className="col-span-1 md:col-span-2">
            <LatencyHeatmap />
          </div>
          
          {/* Failed Requests Chart */}
          <div className="col-span-1">
            <FailedRequestsChart />
          </div>
          
          {/* Error Codes Pie */}
          <div className="col-span-1">
            <ErrorCodesPie />
          </div>
          
          {/* API Usage Bar */}
          <div className="col-span-1 md:col-span-2">
            <ApiUsageBar />
          </div>
          
          {/* Recent Errors Table */}
          <div className="col-span-1 md:col-span-3">
            <RecentErrorsTable />
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            ESB Network Dashboard © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
