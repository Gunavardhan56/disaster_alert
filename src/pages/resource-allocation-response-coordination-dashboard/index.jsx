import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ResourceKPICard from './components/ResourceKPICard';
import ResourceDeploymentChart from './components/ResourceDeploymentChart';
import ResourceMap from './components/ResourceMap';
import DeploymentQueue from './components/DeploymentQueue';
import CapacityMonitoringGrid from './components/CapacityMonitoringGrid';
import ControlBar from './components/ControlBar';

const ResourceAllocationResponseCoordinationDashboard = () => {
  const [filters, setFilters] = useState({
    incident: 'all',
    resourceType: 'all',
    deploymentStatus: 'all',
    timeRange: 'realtime'
  });

  // Mock data for deployment timeline chart
  const deploymentTimelineData = [
    { time: '00:00', deployedResources: 45, incidentSeverity: 3 },
    { time: '02:00', deployedResources: 52, incidentSeverity: 4 },
    { time: '04:00', deployedResources: 68, incidentSeverity: 6 },
    { time: '06:00', deployedResources: 85, incidentSeverity: 8 },
    { time: '08:00', deployedResources: 92, incidentSeverity: 7 },
    { time: '10:00', deployedResources: 78, incidentSeverity: 5 },
    { time: '12:00', deployedResources: 65, incidentSeverity: 4 },
    { time: '14:00', deployedResources: 58, incidentSeverity: 3 },
    { time: '16:00', deployedResources: 62, incidentSeverity: 4 },
    { time: '18:00', deployedResources: 71, incidentSeverity: 5 },
    { time: '20:00', deployedResources: 69, incidentSeverity: 4 },
    { time: '22:00', deployedResources: 55, incidentSeverity: 3 }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real application, this would trigger data refetch based on filters
    console.log('Filters updated:', newFilters);
  };

  useEffect(() => {
    // Simulate real-time updates when in real-time mode
    if (filters?.timeRange === 'realtime') {
      const interval = setInterval(() => {
        // Update data here in real application
        console.log('Real-time data update');
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [filters?.timeRange]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Resource Allocation & Response Coordination</h1>
              <p className="text-muted-foreground mt-1">
                Monitor resource deployment, track team availability, and optimize emergency response coordination
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-muted-foreground">
                Last updated: {new Date()?.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Control Bar */}
          <ControlBar onFiltersChange={handleFiltersChange} />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ResourceKPICard
              title="Available Response Teams"
              value="24"
              subtitle="Ready for deployment"
              icon="Users"
              status="success"
              trend="up"
              trendValue="+3"
            />
            <ResourceKPICard
              title="Deployed Resources"
              value="78%"
              subtitle="Currently active"
              icon="Truck"
              status="warning"
              trend="up"
              trendValue="+12%"
            />
            <ResourceKPICard
              title="Shelter Capacity"
              value="65%"
              subtitle="Utilization rate"
              icon="Home"
              status="normal"
              trend="down"
              trendValue="-5%"
            />
            <ResourceKPICard
              title="Avg Deployment Time"
              value="14 min"
              subtitle="Response time"
              icon="Clock"
              status="success"
              trend="down"
              trendValue="-2 min"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-16 gap-6">
            {/* Resource Deployment Chart - 10 columns */}
            <div className="lg:col-span-10">
              <ResourceDeploymentChart data={deploymentTimelineData} />
            </div>

            {/* Deployment Queue - 6 columns */}
            <div className="lg:col-span-6">
              <DeploymentQueue />
            </div>
          </div>

          {/* Resource Map */}
          <ResourceMap />

          {/* Capacity Monitoring Grid */}
          <CapacityMonitoringGrid />
        </div>
      </main>
    </div>
  );
};

export default ResourceAllocationResponseCoordinationDashboard;