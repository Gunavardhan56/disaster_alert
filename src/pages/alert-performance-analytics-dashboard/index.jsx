import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import FilterControls from './components/FilterControls';
import AlertVolumeChart from './components/AlertVolumeChart';
import ChannelPerformanceLeaderboard from './components/ChannelPerformanceLeaderboard';
import AlertLifecycleFunnel from './components/AlertLifecycleFunnel';
import GeographicHeatMap from './components/GeographicHeatMap';

const AlertPerformanceAnalyticsDashboard = () => {
  // Filter states
  const [dateRange, setDateRange] = useState('24h');
  const [alertTypes, setAlertTypes] = useState(['cyclone', 'flood']);
  const [regions, setRegions] = useState(['north', 'central']);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedChartMetric, setSelectedChartMetric] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('north');

  // Mock data for metrics cards
  const metricsData = [
    {
      title: "Alert Delivery Success Rate",
      value: "94.2",
      unit: "%",
      change: "+2.1%",
      changeType: "positive",
      icon: "CheckCircle",
      description: "Across all communication channels"
    },
    {
      title: "Average Response Time",
      value: "3.4",
      unit: "min",
      change: "-0.8min",
      changeType: "positive",
      icon: "Clock",
      description: "From alert to acknowledgment"
    },
    {
      title: "False Alarm Rate",
      value: "2.8",
      unit: "%",
      change: "-0.5%",
      changeType: "positive",
      icon: "AlertTriangle",
      description: "Reduced through AI validation"
    },
    {
      title: "Population Reach",
      value: "1.2M",
      unit: "people",
      change: "+15K",
      changeType: "positive",
      icon: "Users",
      description: "Active alert recipients"
    }
  ];

  // Mock data for alert volume chart
  const chartData = [
    { time: '00:00', alerts: 45, responseTime: 2.8 },
    { time: '04:00', alerts: 32, responseTime: 3.1 },
    { time: '08:00', alerts: 78, responseTime: 2.9 },
    { time: '12:00', alerts: 124, responseTime: 3.5 },
    { time: '16:00', alerts: 89, responseTime: 3.2 },
    { time: '20:00', alerts: 67, responseTime: 2.7 }
  ];

  // Mock data for channel performance
  const channelData = [
    {
      name: "SMS",
      successRate: 98.5,
      totalAlerts: 2847,
      avgResponseTime: 2.1
    },
    {
      name: "Mobile App",
      successRate: 96.2,
      totalAlerts: 1923,
      avgResponseTime: 1.8
    },
    {
      name: "Radio",
      successRate: 94.7,
      totalAlerts: 1456,
      avgResponseTime: 4.2
    },
    {
      name: "Social Media",
      successRate: 89.3,
      totalAlerts: 3241,
      avgResponseTime: 5.7
    },
    {
      name: "Email",
      successRate: 87.1,
      totalAlerts: 892,
      avgResponseTime: 8.3
    },
    {
      name: "Emergency Broadcast",
      successRate: 99.1,
      totalAlerts: 234,
      avgResponseTime: 1.2
    }
  ];

  // Mock data for alert lifecycle funnel
  const funnelData = {
    generated: { count: 5420, avgTime: "0.2s", failureRate: 0 },
    validated: { count: 5284, avgTime: "1.8s", failureRate: 2.5 },
    distributed: { count: 5156, avgTime: "3.2s", failureRate: 2.4 },
    acknowledged: { count: 4923, avgTime: "2.1min", failureRate: 4.5 },
    resolved: { count: 4756, avgTime: "18.4min", failureRate: 3.4 },
    avgProcessingTime: "24.7min",
    bottleneckStage: "Acknowledgment"
  };

  // Mock data for geographic regions
  const regionData = [
    {
      id: 'north',
      name: 'Northern Region',
      alertIntensity: 85,
      activeAlerts: 23,
      responseRate: 94,
      population: '2.1M',
      coverage: 96,
      avgResponseTime: 3.2,
      falseAlarmRate: 2.1,
      activeChannels: 6,
      lastAlert: '2h ago'
    },
    {
      id: 'south',
      name: 'Southern Region',
      alertIntensity: 62,
      activeAlerts: 15,
      responseRate: 91,
      population: '1.8M',
      coverage: 93,
      avgResponseTime: 3.8,
      falseAlarmRate: 3.2,
      activeChannels: 5,
      lastAlert: '4h ago'
    },
    {
      id: 'east',
      name: 'Eastern Region',
      alertIntensity: 45,
      activeAlerts: 8,
      responseRate: 97,
      population: '1.4M',
      coverage: 98,
      avgResponseTime: 2.9,
      falseAlarmRate: 1.8,
      activeChannels: 6,
      lastAlert: '6h ago'
    },
    {
      id: 'west',
      name: 'Western Region',
      alertIntensity: 73,
      activeAlerts: 19,
      responseRate: 89,
      population: '2.3M',
      coverage: 91,
      avgResponseTime: 4.1,
      falseAlarmRate: 4.5,
      activeChannels: 4,
      lastAlert: '1h ago'
    },
    {
      id: 'central',
      name: 'Central Region',
      alertIntensity: 38,
      activeAlerts: 12,
      responseRate: 95,
      population: '1.6M',
      coverage: 94,
      avgResponseTime: 3.1,
      falseAlarmRate: 2.7,
      activeChannels: 5,
      lastAlert: '3h ago'
    },
    {
      id: 'coastal',
      name: 'Coastal Areas',
      alertIntensity: 91,
      activeAlerts: 31,
      responseRate: 92,
      population: '2.7M',
      coverage: 89,
      avgResponseTime: 3.6,
      falseAlarmRate: 3.8,
      activeChannels: 6,
      lastAlert: '30min ago'
    }
  ];

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
    // Mock export functionality
    const timestamp = new Date()?.toISOString()?.slice(0, 19)?.replace(/:/g, '-');
    const filename = `alert-performance-analytics-${timestamp}.${format}`;
    
    if (format === 'pdf') {
      console.log(`Generating PDF report: ${filename}`);
    } else if (format === 'csv') {
      console.log(`Generating CSV export: ${filename}`);
    }
  };

  // Auto-refresh data every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Refreshing dashboard data...');
      // In a real app, this would fetch fresh data
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Alert Performance Analytics - Disaster Alert Dashboard</title>
        <meta name="description" content="Comprehensive analytics for alert distribution effectiveness, response times, and communication channel performance" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Alert Performance Analytics
                </h1>
                <p className="text-muted-foreground">
                  Analyze alert distribution effectiveness, response times, and communication channel performance
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Live data • Last updated: {new Date()?.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls
            dateRange={dateRange}
            setDateRange={setDateRange}
            alertTypes={alertTypes}
            setAlertTypes={setAlertTypes}
            regions={regions}
            setRegions={setRegions}
            comparisonMode={comparisonMode}
            setComparisonMode={setComparisonMode}
            onExport={handleExport}
          />

          {/* Primary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard key={index} {...metric} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Alert Volume Chart - 8 columns */}
            <div className="lg:col-span-8">
              <AlertVolumeChart
                data={chartData}
                selectedMetric={selectedChartMetric}
                onMetricChange={setSelectedChartMetric}
              />
            </div>

            {/* Channel Performance - 4 columns */}
            <div className="lg:col-span-4">
              <ChannelPerformanceLeaderboard channels={channelData} />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alert Lifecycle Funnel */}
            <AlertLifecycleFunnel data={funnelData} />

            {/* Geographic Heat Map */}
            <GeographicHeatMap
              regions={regionData}
              selectedRegion={selectedRegion}
              onRegionSelect={setSelectedRegion}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlertPerformanceAnalyticsDashboard;