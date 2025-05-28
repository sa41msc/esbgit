import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with actual API endpoint
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Service status data
export const getServiceStatus = async () => {
  try {
    // In a real app, this would be an API call
    // return await api.get('/services/status');
    
    // Mock data for development
    return {
      data: [
        { id: 1, name: 'Authentication Service', status: 'online' },
        { id: 2, name: 'Payment Gateway', status: 'online' },
        { id: 3, name: 'Data Processing Service', status: 'offline' },
        { id: 4, name: 'Notification Service', status: 'online' }
      ]
    };
  } catch (error) {
    console.error('Error fetching service status:', error);
    throw error;
  }
};

// Latency data for heatmap
export const getLatencyData = async () => {
  try {
    // In a real app, this would be an API call
    // return await api.get('/metrics/latency');
    
    // Mock data for development
    const services = ['Auth', 'Payment', 'Data', 'Notification'];
    const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    
    const data = services.map(service => {
      const values = timeSlots.map(time => ({
        time,
        value: Math.floor(Math.random() * 500) // Random latency between 0-500ms
      }));
      
      return {
        service,
        values
      };
    });
    
    return { data };
  } catch (error) {
    console.error('Error fetching latency data:', error);
    throw error;
  }
};

// Traffic data over time
export const getTrafficData = async () => {
  try {
    // In a real app, this would be an API call
    // return await api.get('/metrics/traffic');
    
    // Mock data for development
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const data = hours.map(hour => ({
      hour,
      requests: Math.floor(Math.random() * 1000) + 200
    }));
    
    return { data };
  } catch (error) {
    console.error('Error fetching traffic data:', error);
    throw error;
  }
};

// Failed requests percentage
export const getFailedRequestsData = async () => {
  try {
    // In a real app, this would be an API call
    // return await api.get('/metrics/failures');
    
    // Mock data for development
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const data = hours.map(hour => ({
      hour,
      percentage: (Math.random() * 5).toFixed(2) // Random failure rate between 0-5%
    }));
    
    return { data };
  } catch (error) {
    console.error('Error fetching failed requests data:', error);
    throw error;
  }
};

// Error codes distribution
export const getErrorStats = async () => {
  try {
    // In a real app, this would be an API call
    // return await api.get('/metrics/errors');
    
    // Mock data for development
    return {
      data: [
        { code: '500', count: 42, name: 'Internal Server Error' },
        { code: '404', count: 78, name: 'Not Found' },
        { code: '401', count: 25, name: 'Unauthorized' },
        { code: '403', count: 15, name: 'Forbidden' },
        { code: '429', count: 30, name: 'Too Many Requests' }
      ]
    };
  } catch (error) {
    console.error('Error fetching error stats:', error);
    throw error;
  }
};

// API usage by endpoint
export const getApiUsageData = async () => {
  try {
    // In a real app, this would be an API call
    // return await api.get('/metrics/api-usage');
    
    // Mock data for development
    return {
      data: [
        { endpoint: '/users', requests: 1250 },
        { endpoint: '/auth/login', requests: 890 },
        { endpoint: '/products', requests: 1540 },
        { endpoint: '/orders', requests: 760 },
        { endpoint: '/payments', requests: 430 }
      ]
    };
  } catch (error) {
    console.error('Error fetching API usage data:', error);
    throw error;
  }
};

// Recent errors
export const getRecentErrors = async () => {
  try {
    // In a real app, this would be an API call
    // return await api.get('/logs/recent-errors');
    
    // Mock data for development
    return {
      data: [
        { id: 1, timestamp: '2025-05-28T07:42:13Z', service: 'Data Processing', message: 'Connection timeout to database' },
        { id: 2, timestamp: '2025-05-28T07:38:21Z', service: 'Authentication', message: 'Invalid token format' },
        { id: 3, timestamp: '2025-05-28T07:35:05Z', service: 'Payment Gateway', message: 'API rate limit exceeded' },
        { id: 4, timestamp: '2025-05-28T07:30:57Z', service: 'Notification', message: 'Template rendering failed' },
        { id: 5, timestamp: '2025-05-28T07:28:32Z', service: 'Data Processing', message: 'Query execution error' }
      ]
    };
  } catch (error) {
    console.error('Error fetching recent errors:', error);
    throw error;
  }
};

export default {
  getServiceStatus,
  getLatencyData,
  getTrafficData,
  getFailedRequestsData,
  getErrorStats,
  getApiUsageData,
  getRecentErrors
};
