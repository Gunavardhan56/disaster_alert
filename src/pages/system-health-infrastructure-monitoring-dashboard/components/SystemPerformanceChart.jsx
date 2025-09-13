import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemPerformanceChart = () => {
  const [selectedMetrics, setSelectedMetrics] = useState(['uptime', 'signal', 'network']);
  const [timeRange, setTimeRange] = useState('24h');

  const performanceData = [
    { time: '00:00', uptime: 99.8, signal: 87, network: 94, weather: 91 },
    { time: '02:00', uptime: 99.9, signal: 89, network: 96, weather: 93 },
    { time: '04:00', uptime: 99.7, signal: 85, network: 92, weather: 88 },
    { time: '06:00', uptime: 99.9, signal: 91, network: 97, weather: 95 },
    { time: '08:00', uptime: 99.8, signal: 88, network: 94, weather: 92 },
    { time: '10:00', uptime: 99.9, signal: 93, network: 98, weather: 96 },
    { time: '12:00', uptime: 99.6, signal: 86, network: 91, weather: 89 },
    { time: '14:00', uptime: 99.8, signal: 90, network: 95, weather: 94 },
    { time: '16:00', uptime: 99.9, signal: 92, network: 97, weather: 97 },
    { time: '18:00', uptime: 99.7, signal: 87, network: 93, weather: 90 },
    { time: '20:00', uptime: 99.8, signal: 89, network: 96, weather: 93 },
    { time: '22:00', uptime: 99.9, signal: 91, network: 98, weather: 95 }
  ];

  const metrics = [
    { key: 'uptime', label: 'System Uptime', color: '#059669', icon: 'Activity' },
    { key: 'signal', label: 'Satellite Signal', color: '#DC2626', icon: 'Satellite' },
    { key: 'network', label: 'Network Health', color: '#1E40AF', icon: 'Wifi' },
    { key: 'weather', label: 'Weather Stations', color: '#F59E0B', icon: 'CloudRain' }
  ];

  const timeRanges = [
    { value: '1h', label: '1H' },
    { value: '6h', label: '6H' },
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' }
  ];

  const toggleMetric = (metricKey) => {
    setSelectedMetrics(prev => 
      prev?.includes(metricKey) 
        ? prev?.filter(m => m !== metricKey)
        : [...prev, metricKey]
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">System Performance Metrics</h3>
          <p className="text-sm text-muted-foreground">Real-time monitoring of critical infrastructure components</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Metric Toggles */}
          <div className="flex items-center space-x-2">
            {metrics?.map((metric) => (
              <button
                key={metric?.key}
                onClick={() => toggleMetric(metric?.key)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  selectedMetrics?.includes(metric?.key)
                    ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                <Icon name={metric?.icon} size={12} />
                <span>{metric?.label}</span>
              </button>
            ))}
          </div>
          
          {/* Time Range Selector */}
          <div className="flex items-center space-x-1 bg-muted/50 rounded-md p-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.value}
                onClick={() => setTimeRange(range?.value)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  timeRange === range?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis 
              dataKey="time" 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[80, 100]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '8px',
                color: '#F8FAFC'
              }}
            />
            <Legend />
            {metrics?.map((metric) => (
              selectedMetrics?.includes(metric?.key) && (
                <Line
                  key={metric?.key}
                  type="monotone"
                  dataKey={metric?.key}
                  stroke={metric?.color}
                  strokeWidth={2}
                  dot={{ fill: metric?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: metric?.color, strokeWidth: 2 }}
                  name={metric?.label}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SystemPerformanceChart;