import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import AlertFeed from './components/AlertFeed';
import ThreatMap from './components/ThreatMap';
import SystemMetrics from './components/SystemMetrics';
import ControlPanel from './components/ControlPanel';

const RealTimeCommandCenterDashboard = () => {
  const [filters, setFilters] = useState({
    disasterType: 'all',
    region: 'all',
    severity: 'all',
    autoRefresh: 15
  });

  const [kpiData, setKpiData] = useState({
    activeAlerts: {
      title: 'Active Alerts',
      value: 23,
      unit: 'alerts',
      trend: 'up',
      trendValue: '+5',
      severity: 'critical',
      icon: 'AlertTriangle',
      description: 'Critical and warning level alerts requiring immediate attention'
    },
    systemHealth: {
      title: 'System Health',
      value: 94,
      unit: '%',
      trend: 'down',
      trendValue: '-2%',
      severity: 'warning',
      icon: 'Activity',
      description: 'Overall infrastructure and communication system status'
    },
    populationAtRisk: {
      title: 'Population at Risk',
      value: 4.6,
      unit: 'M',
      trend: 'up',
      trendValue: '+0.8M',
      severity: 'critical',
      icon: 'Users',
      description: 'Total population in active threat zones and evacuation areas'
    },
    responseTeams: {
      title: 'Response Teams',
      value: 45,
      unit: 'deployed',
      trend: 'up',
      trendValue: '+12',
      severity: 'success',
      icon: 'Shield',
      description: 'Emergency response teams currently deployed in field operations'
    }
  });

  useEffect(() => {
    // Simulate real-time KPI updates
    const interval = setInterval(() => {
      setKpiData(prevData => {
        const updatedData = { ...prevData };
        
        // Simulate random updates to KPI values
        Object.keys(updatedData)?.forEach(key => {
          const current = updatedData?.[key];
          let newValue = current?.value;
          
          switch (key) {
            case 'activeAlerts':
              newValue = Math.max(0, current?.value + Math.floor(Math.random() * 5) - 2);
              break;
            case 'systemHealth':
              newValue = Math.max(85, Math.min(100, current?.value + (Math.random() - 0.5) * 3));
              break;
            case 'populationAtRisk':
              newValue = Math.max(0, current?.value + (Math.random() - 0.5) * 0.5);
              break;
            case 'responseTeams':
              newValue = Math.max(0, current?.value + Math.floor(Math.random() * 3) - 1);
              break;
          }
          
          updatedData[key] = {
            ...current,
            value: key === 'populationAtRisk' ? parseFloat(newValue?.toFixed(1)) : Math.round(newValue)
          };
        });
        
        return updatedData;
      });
    }, filters?.autoRefresh * 1000);

    return () => clearInterval(interval);
  }, [filters?.autoRefresh]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real application, this would trigger API calls to fetch filtered data
    console.log('Filters updated:', newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-[1920px] mx-auto p-6 space-y-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Real-Time Command Center Dashboard
            </h1>
            <p className="text-muted-foreground">
              Centralized operational hub for monitoring active threats, system health, and emergency response coordination across all disaster monitoring infrastructure.
            </p>
          </div>

          {/* Control Panel */}
          <ControlPanel onFiltersChange={handleFiltersChange} />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(kpiData)?.map(([key, data]) => (
              <KPICard
                key={key}
                title={data?.title}
                value={data?.value}
                unit={data?.unit}
                trend={data?.trend}
                trendValue={data?.trendValue}
                severity={data?.severity}
                icon={data?.icon}
                description={data?.description}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Threat Map - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <ThreatMap />
            </div>

            {/* Alert Feed - Takes 1 column */}
            <div className="lg:col-span-1">
              <AlertFeed />
            </div>
          </div>

          {/* System Metrics */}
          <div className="mt-8">
            <SystemMetrics />
          </div>

          {/* Emergency Actions Footer */}
          <div className="bg-card border border-border rounded-lg p-6 mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Emergency Response Actions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Quick access to critical emergency management functions and coordination tools.
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-error text-error-foreground rounded-lg font-medium hover:bg-error/90 transition-colors">
                  Emergency Broadcast
                </button>
                <button className="px-4 py-2 bg-warning text-warning-foreground rounded-lg font-medium hover:bg-warning/90 transition-colors">
                  Evacuation Alert
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Resource Deployment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealTimeCommandCenterDashboard;