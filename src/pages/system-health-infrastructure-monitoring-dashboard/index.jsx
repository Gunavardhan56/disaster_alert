import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import GlobalControlPanel from './components/GlobalControlPanel';
import SystemMetricsCard from './components/SystemMetricsCard';
import SystemPerformanceChart from './components/SystemPerformanceChart';
import SystemAlertsFeed from './components/SystemAlertsFeed';
import ComponentStatusGrid from './components/ComponentStatusGrid';

const SystemHealthInfrastructureMonitoringDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const systemMetrics = [
    {
      title: 'System Uptime',
      value: '99.8',
      unit: '%',
      status: 'excellent',
      trend: 'up',
      trendValue: '+0.2%',
      icon: 'Activity',
      description: 'Overall system availability'
    },
    {
      title: 'Satellite Signal',
      value: '87',
      unit: '%',
      status: 'good',
      trend: 'stable',
      trendValue: '0.0%',
      icon: 'Satellite',
      description: 'Average signal strength'
    },
    {
      title: 'Weather Stations',
      value: '92',
      unit: '%',
      status: 'warning',
      trend: 'down',
      trendValue: '-3.2%',
      icon: 'CloudRain',
      description: 'Stations connectivity'
    },
    {
      title: 'Network Performance',
      value: '96',
      unit: '%',
      status: 'excellent',
      trend: 'up',
      trendValue: '+1.5%',
      icon: 'Wifi',
      description: 'Communication network health'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-[1920px] mx-auto p-6 space-y-6">
          {/* Global Control Panel */}
          <GlobalControlPanel />

          {/* System Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics?.map((metric, index) => (
              <SystemMetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                status={metric?.status}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                icon={metric?.icon}
                description={metric?.description}
              />
            ))}
          </div>

          {/* Main Monitoring Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Chart - Takes 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <SystemPerformanceChart />
            </div>
            
            {/* System Alerts Feed - Takes 1/3 width on large screens */}
            <div className="lg:col-span-1">
              <SystemAlertsFeed />
            </div>
          </div>

          {/* Component Status Grid */}
          <ComponentStatusGrid />

          {/* Footer with Current Time */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>Last Updated: {currentTime?.toLocaleTimeString()}</span>
                <span>•</span>
                <span>System Time: {currentTime?.toLocaleString()}</span>
                <span>•</span>
                <span>Monitoring Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Real-time Data Stream</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemHealthInfrastructureMonitoringDashboard;