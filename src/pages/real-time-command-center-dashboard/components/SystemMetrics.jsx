import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemMetrics = () => {
  const [metrics, setMetrics] = useState({});
  const [refreshRate, setRefreshRate] = useState(5);

  const mockMetrics = {
    weatherStations: {
      title: 'Weather Stations',
      icon: 'CloudRain',
      total: 245,
      online: 238,
      offline: 7,
      percentage: 97.1,
      status: 'success',
      lastUpdate: new Date(),
      details: [
        { region: 'Northern Zone', online: 58, total: 62 },
        { region: 'Eastern Zone', online: 45, total: 47 },
        { region: 'Western Zone', online: 67, total: 68 },
        { region: 'Southern Zone', online: 68, total: 68 }
      ]
    },
    communicationDevices: {
      title: 'Communication Devices',
      icon: 'Radio',
      total: 1847,
      online: 1823,
      offline: 24,
      percentage: 98.7,
      status: 'success',
      lastUpdate: new Date(),
      details: [
        { type: 'Emergency Radios', online: 456, total: 462 },
        { type: 'Satellite Phones', online: 234, total: 238 },
        { type: 'Alert Sirens', online: 567, total: 572 },
        { type: 'Mobile Towers', online: 566, total: 575 }
      ]
    },
    alertDelivery: {
      title: 'Alert Delivery Success',
      icon: 'MessageSquare',
      total: 15847,
      delivered: 15234,
      failed: 613,
      percentage: 96.1,
      status: 'warning',
      lastUpdate: new Date(),
      details: [
        { channel: 'SMS', delivered: 4567, total: 4723 },
        { channel: 'Mobile App', delivered: 3456, total: 3567 },
        { channel: 'Email', delivered: 2345, total: 2456 },
        { channel: 'Voice Call', delivered: 4866, total: 5101 }
      ]
    },
    satelliteConnectivity: {
      title: 'Satellite Connectivity',
      icon: 'Satellite',
      total: 12,
      online: 11,
      offline: 1,
      percentage: 91.7,
      status: 'warning',
      lastUpdate: new Date(),
      details: [
        { satellite: 'INSAT-3D', status: 'online', signal: 98 },
        { satellite: 'INSAT-3DR', status: 'online', signal: 95 },
        { satellite: 'SCATSAT-1', status: 'online', signal: 92 },
        { satellite: 'RISAT-2B', status: 'offline', signal: 0 }
      ]
    }
  };

  useEffect(() => {
    setMetrics(mockMetrics);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prevMetrics => {
        const updatedMetrics = { ...prevMetrics };
        Object.keys(updatedMetrics)?.forEach(key => {
          updatedMetrics[key] = {
            ...updatedMetrics?.[key],
            lastUpdate: new Date(),
            percentage: Math.max(85, Math.min(100, updatedMetrics?.[key]?.percentage + (Math.random() - 0.5) * 2))
          };
        });
        return updatedMetrics;
      });
    }, refreshRate * 1000);

    return () => clearInterval(interval);
  }, [refreshRate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success border-success bg-success/5';
      case 'warning':
        return 'text-warning border-warning bg-warning/5';
      case 'error':
        return 'text-error border-error bg-error/5';
      default:
        return 'text-muted-foreground border-border bg-card';
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 95) return 'text-success';
    if (percentage >= 85) return 'text-warning';
    return 'text-error';
  };

  const formatLastUpdate = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    return timestamp?.toLocaleTimeString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-card-foreground flex items-center">
          <Icon name="Activity" size={20} className="mr-2 text-primary" />
          System Health Metrics
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Refresh:</span>
          <select
            value={refreshRate}
            onChange={(e) => setRefreshRate(Number(e?.target?.value))}
            className="px-2 py-1 text-sm bg-input border border-border rounded text-foreground"
          >
            <option value={5}>5s</option>
            <option value={15}>15s</option>
            <option value={30}>30s</option>
          </select>
        </div>
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(metrics)?.map(([key, metric]) => (
          <div
            key={key}
            className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-lg ${getStatusColor(metric?.status)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${metric?.status === 'success' ? 'bg-success/20' : metric?.status === 'warning' ? 'bg-warning/20' : 'bg-error/20'}`}>
                  <Icon name={metric?.icon} size={20} className="text-current" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-current">{metric?.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last updated: {formatLastUpdate(metric?.lastUpdate)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getPercentageColor(metric?.percentage)}`}>
                  {metric?.percentage?.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric?.online || metric?.delivered}/{metric?.total}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    metric?.status === 'success' ? 'bg-success' : 
                    metric?.status === 'warning' ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${metric?.percentage}%` }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              {metric?.details?.map((detail, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {detail?.region || detail?.type || detail?.channel || detail?.satellite}
                  </span>
                  <div className="flex items-center space-x-2">
                    {detail?.status ? (
                      <>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          detail?.status === 'online' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                        }`}>
                          {detail?.status}
                        </span>
                        {detail?.signal !== undefined && (
                          <span className="text-muted-foreground">{detail?.signal}%</span>
                        )}
                      </>
                    ) : (
                      <span className="text-card-foreground font-medium">
                        {detail?.online || detail?.delivered}/{detail?.total}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-current/10">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  metric?.status === 'success' ? 'bg-success animate-pulse' : 
                  metric?.status === 'warning' ? 'bg-warning animate-pulse' : 'bg-error animate-pulse'
                }`} />
                <span className="text-xs text-current font-medium capitalize">
                  {metric?.status} Status
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {metric?.offline || metric?.failed} {metric?.offline ? 'offline' : 'failed'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemMetrics;