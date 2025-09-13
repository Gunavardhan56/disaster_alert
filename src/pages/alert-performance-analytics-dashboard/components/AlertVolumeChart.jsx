import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AlertVolumeChart = ({ data, selectedMetric, onMetricChange }) => {
  const metrics = [
    { key: 'all', label: 'All Channels', color: '#DC2626' },
    { key: 'sms', label: 'SMS', color: '#059669' },
    { key: 'radio', label: 'Radio', color: '#D97706' },
    { key: 'mobile', label: 'Mobile App', color: '#1E40AF' },
    { key: 'social', label: 'Social Media', color: '#7C3AED' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-xs text-muted-foreground">{entry?.name}:</span>
              </div>
              <span className="text-xs font-medium text-popover-foreground">
                {entry?.name === 'Response Time' ? `${entry?.value}min` : entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Alert Volume & Response Time</h3>
          <p className="text-sm text-muted-foreground">Distribution patterns and response efficiency</p>
        </div>
        <div className="flex items-center space-x-2">
          {metrics?.map((metric) => (
            <button
              key={metric?.key}
              onClick={() => onMetricChange(metric?.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                selectedMetric === metric?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {metric?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis 
              dataKey="time" 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="alerts" 
              fill="#DC2626" 
              name="Alert Volume"
              radius={[2, 2, 0, 0]}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="responseTime" 
              stroke="#F59E0B" 
              strokeWidth={2}
              name="Response Time"
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AlertVolumeChart;