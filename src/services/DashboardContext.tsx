import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as api from './api';

// Define the shape of our dashboard data context
interface DashboardDataContextType {
  serviceStatus: any[];
  latencyData: any[];
  trafficData: any[];
  failedRequestsData: any[];
  errorStats: any[];
  apiUsageData: any[];
  recentErrors: any[];
  loading: {
    serviceStatus: boolean;
    latencyData: boolean;
    trafficData: boolean;
    failedRequestsData: boolean;
    errorStats: boolean;
    apiUsageData: boolean;
    recentErrors: boolean;
  };
  errors: {
    serviceStatus: string | null;
    latencyData: string | null;
    trafficData: string | null;
    failedRequestsData: string | null;
    errorStats: string | null;
    apiUsageData: string | null;
    recentErrors: string | null;
  };
  refreshData: () => void;
}

// Create the context with default values
const DashboardDataContext = createContext<DashboardDataContextType>({
  serviceStatus: [],
  latencyData: [],
  trafficData: [],
  failedRequestsData: [],
  errorStats: [],
  apiUsageData: [],
  recentErrors: [],
  loading: {
    serviceStatus: false,
    latencyData: false,
    trafficData: false,
    failedRequestsData: false,
    errorStats: false,
    apiUsageData: false,
    recentErrors: false,
  },
  errors: {
    serviceStatus: null,
    latencyData: null,
    trafficData: null,
    failedRequestsData: null,
    errorStats: null,
    apiUsageData: null,
    recentErrors: null,
  },
  refreshData: () => {},
});

// Provider component
export const DashboardDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State for each data type
  const [serviceStatus, setServiceStatus] = useState<any[]>([]);
  const [latencyData, setLatencyData] = useState<any[]>([]);
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [failedRequestsData, setFailedRequestsData] = useState<any[]>([]);
  const [errorStats, setErrorStats] = useState<any[]>([]);
  const [apiUsageData, setApiUsageData] = useState<any[]>([]);
  const [recentErrors, setRecentErrors] = useState<any[]>([]);

  // Loading states
  const [loading, setLoading] = useState({
    serviceStatus: true,
    latencyData: true,
    trafficData: true,
    failedRequestsData: true,
    errorStats: true,
    apiUsageData: true,
    recentErrors: true,
  });

  // Error states
  const [errors, setErrors] = useState({
    serviceStatus: null as string | null,
    latencyData: null as string | null,
    trafficData: null as string | null,
    failedRequestsData: null as string | null,
    errorStats: null as string | null,
    apiUsageData: null as string | null,
    recentErrors: null as string | null,
  });

  // Function to fetch service status
  const fetchServiceStatus = async () => {
    try {
      setLoading(prev => ({ ...prev, serviceStatus: true }));
      const response = await api.getServiceStatus();
      setServiceStatus(response.data);
      setErrors(prev => ({ ...prev, serviceStatus: null }));
    } catch (err) {
      setErrors(prev => ({ ...prev, serviceStatus: 'Failed to load service status' }));
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, serviceStatus: false }));
    }
  };

  // Function to fetch latency data
  const fetchLatencyData = async () => {
    try {
      setLoading(prev => ({ ...prev, latencyData: true }));
      const response = await api.getLatencyData();
      setLatencyData(response.data);
      setErrors(prev => ({ ...prev, latencyData: null }));
    } catch (err) {
      setErrors(prev => ({ ...prev, latencyData: 'Failed to load latency data' }));
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, latencyData: false }));
    }
  };

  // Function to fetch traffic data
  const fetchTrafficData = async () => {
    try {
      setLoading(prev => ({ ...prev, trafficData: true }));
      const response = await api.getTrafficData();
      setTrafficData(response.data);
      setErrors(prev => ({ ...prev, trafficData: null }));
    } catch (err) {
      setErrors(prev => ({ ...prev, trafficData: 'Failed to load traffic data' }));
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, trafficData: false }));
    }
  };

  // Function to fetch failed requests data
  const fetchFailedRequestsData = async () => {
    try {
      setLoading(prev => ({ ...prev, failedRequestsData: true }));
      const response = await api.getFailedRequestsData();
      setFailedRequestsData(response.data);
      setErrors(prev => ({ ...prev, failedRequestsData: null }));
    } catch (err) {
      setErrors(prev => ({ ...prev, failedRequestsData: 'Failed to load failed requests data' }));
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, failedRequestsData: false }));
    }
  };

  // Function to fetch error stats
  const fetchErrorStats = async () => {
    try {
      setLoading(prev => ({ ...prev, errorStats: true }));
      const response = await api.getErrorStats();
      setErrorStats(response.data);
      setErrors(prev => ({ ...prev, errorStats: null }));
    } catch (err) {
      setErrors(prev => ({ ...prev, errorStats: 'Failed to load error statistics' }));
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, errorStats: false }));
    }
  };

  // Function to fetch API usage data
  const fetchApiUsageData = async () => {
    try {
      setLoading(prev => ({ ...prev, apiUsageData: true }));
      const response = await api.getApiUsageData();
      setApiUsageData(response.data);
      setErrors(prev => ({ ...prev, apiUsageData: null }));
    } catch (err) {
      setErrors(prev => ({ ...prev, apiUsageData: 'Failed to load API usage data' }));
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, apiUsageData: false }));
    }
  };

  // Function to fetch recent errors
  const fetchRecentErrors = async () => {
    try {
      setLoading(prev => ({ ...prev, recentErrors: true }));
      const response = await api.getRecentErrors();
      setRecentErrors(response.data);
      setErrors(prev => ({ ...prev, recentErrors: null }));
    } catch (err) {
      setErrors(prev => ({ ...prev, recentErrors: 'Failed to load recent errors' }));
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, recentErrors: false }));
    }
  };

  // Function to refresh all data
  const refreshData = () => {
    fetchServiceStatus();
    fetchLatencyData();
    fetchTrafficData();
    fetchFailedRequestsData();
    fetchErrorStats();
    fetchApiUsageData();
    fetchRecentErrors();
  };

  // Initial data fetch
  useEffect(() => {
    refreshData();
    
    // Set up polling intervals for real-time data
    const statusInterval = setInterval(fetchServiceStatus, 30000); // Every 30 seconds
    const errorsInterval = setInterval(fetchRecentErrors, 60000); // Every minute
    const metricsInterval = setInterval(() => {
      fetchLatencyData();
      fetchTrafficData();
      fetchFailedRequestsData();
      fetchErrorStats();
      fetchApiUsageData();
    }, 300000); // Every 5 minutes
    
    // Clean up intervals on unmount
    return () => {
      clearInterval(statusInterval);
      clearInterval(errorsInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  return (
    <DashboardDataContext.Provider
      value={{
        serviceStatus,
        latencyData,
        trafficData,
        failedRequestsData,
        errorStats,
        apiUsageData,
        recentErrors,
        loading,
        errors,
        refreshData,
      }}
    >
      {children}
    </DashboardDataContext.Provider>
  );
};

// Custom hook to use the dashboard data context
export const useDashboardData = () => useContext(DashboardDataContext);

export default DashboardDataContext;
