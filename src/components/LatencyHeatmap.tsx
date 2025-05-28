import React from 'react';
import { useDashboardData } from '../services/DashboardContext';

interface LatencyValue {
  time: string;
  value: number;
}

interface ServiceLatency {
  service: string;
  values: LatencyValue[];
}

const LatencyHeatmap: React.FC = () => {
  const { latencyData, loading, errors } = useDashboardData();

  // Function to determine color intensity based on latency value
  const getColorIntensity = (value: number) => {
    // Assuming 500ms is the max latency (red), 0ms is the min (green)
    if (value < 100) return 'bg-green-100';
    if (value < 200) return 'bg-green-300';
    if (value < 300) return 'bg-yellow-200';
    if (value < 400) return 'bg-orange-300';
    return 'bg-red-400';
  };

  if (loading.latencyData && latencyData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Latency Heatmap (ms)</h2>
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (errors.latencyData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Latency Heatmap (ms)</h2>
        <div className="text-red-500">{errors.latencyData}</div>
      </div>
    );
  }

  // Get unique time slots for column headers
  const timeSlots = latencyData.length > 0 
    ? latencyData[0].values.map((v: LatencyValue) => v.time) 
    : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Latency Heatmap (ms)</h2>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header row with time slots */}
          <div className="flex border-b">
            <div className="w-24 flex-shrink-0 font-medium p-2">Service</div>
            {timeSlots.map((time: string) => (
              <div key={time} className="w-12 flex-shrink-0 text-xs text-center p-1">
                {time}
              </div>
            ))}
          </div>
          
          {/* Data rows */}
          {latencyData.map((service: ServiceLatency) => (
            <div key={service.service} className="flex border-b">
              <div className="w-24 flex-shrink-0 font-medium p-2">
                {service.service}
              </div>
              {service.values.map((value: LatencyValue) => (
                <div 
                  key={`${service.service}-${value.time}`} 
                  className={`w-12 h-12 flex-shrink-0 flex items-center justify-center text-xs ${getColorIntensity(value.value)}`}
                  title={`${service.service} at ${value.time}: ${value.value}ms`}
                >
                  {value.value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center text-xs">
        <span>Latency:</span>
        <div className="ml-2 flex">
          <div className="flex items-center mr-2">
            <div className="w-3 h-3 bg-green-100 mr-1"></div>
            <span>&lt;100ms</span>
          </div>
          <div className="flex items-center mr-2">
            <div className="w-3 h-3 bg-green-300 mr-1"></div>
            <span>&lt;200ms</span>
          </div>
          <div className="flex items-center mr-2">
            <div className="w-3 h-3 bg-yellow-200 mr-1"></div>
            <span>&lt;300ms</span>
          </div>
          <div className="flex items-center mr-2">
            <div className="w-3 h-3 bg-orange-300 mr-1"></div>
            <span>&lt;400ms</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-400 mr-1"></div>
            <span>≥400ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatencyHeatmap;
