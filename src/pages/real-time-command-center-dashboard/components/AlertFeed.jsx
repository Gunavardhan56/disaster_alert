import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertFeed = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  const mockAlerts = [
    {
      id: 'ALT-001',
      type: 'Cyclone',
      severity: 'critical',
      location: 'Bay of Bengal - Eastern Coast',
      message: 'Category 4 cyclone approaching coastal areas. Wind speeds 185 km/h. Immediate evacuation required for zones A1-A5.',
      timestamp: new Date(Date.now() - 300000),
      status: 'active',
      affectedPopulation: 2500000,
      responseTeams: 12
    },
    {
      id: 'ALT-002',
      type: 'Flood',
      severity: 'warning',
      location: 'Ganges River Basin - Northern Region',
      message: 'River levels rising rapidly due to heavy monsoon. Water level 2.3m above danger mark. Prepare for potential evacuation.',
      timestamp: new Date(Date.now() - 900000),
      status: 'monitoring',
      affectedPopulation: 850000,
      responseTeams: 8
    },
    {
      id: 'ALT-003',
      type: 'Earthquake',
      severity: 'critical',
      location: 'Himalayan Fault Line - Central Region',
      message: 'Magnitude 6.8 earthquake detected. Aftershocks expected. Emergency response teams deployed to affected areas.',
      timestamp: new Date(Date.now() - 1800000),
      status: 'responding',
      affectedPopulation: 1200000,
      responseTeams: 15
    },
    {
      id: 'ALT-004',
      type: 'Wildfire',
      severity: 'warning',
      location: 'Western Ghats - Forest Region',
      message: 'Forest fire spreading rapidly. Wind conditions unfavorable. Firefighting aircraft deployed. Nearby villages on alert.',
      timestamp: new Date(Date.now() - 2700000),
      status: 'active',
      affectedPopulation: 45000,
      responseTeams: 6
    },
    {
      id: 'ALT-005',
      type: 'Landslide',
      severity: 'warning',
      location: 'Hill Station - Mountain Region',
      message: 'Heavy rainfall triggering landslide risk. Road closures in effect. Monitoring stations report unstable soil conditions.',
      timestamp: new Date(Date.now() - 3600000),
      status: 'monitoring',
      affectedPopulation: 25000,
      responseTeams: 4
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAlerts(prevAlerts => 
        prevAlerts?.map(alert => ({
          ...alert,
          timestamp: new Date(alert.timestamp.getTime() + Math.random() * 60000)
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error/10 border-error text-error';
      case 'warning':
        return 'bg-warning/10 border-warning text-warning';
      case 'info':
        return 'bg-primary/10 border-primary text-primary';
      default:
        return 'bg-muted/10 border-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-error text-error-foreground';
      case 'responding':
        return 'bg-warning text-warning-foreground';
      case 'monitoring':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Cyclone':
        return 'Zap';
      case 'Flood':
        return 'Waves';
      case 'Earthquake':
        return 'Mountain';
      case 'Wildfire':
        return 'Flame';
      case 'Landslide':
        return 'Triangle';
      default:
        return 'AlertTriangle';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts?.filter(alert => alert?.severity === filter);

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground flex items-center">
            <Icon name="Bell" size={20} className="mr-2 text-primary" />
            Live Alert Feed
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {['all', 'critical', 'warning']?.map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3 p-4">
          {filteredAlerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getSeverityColor(alert?.severity)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={getTypeIcon(alert?.type)} size={16} className="text-current" />
                  <span className="text-sm font-medium">{alert?.type}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert?.status)}`}>
                    {alert?.status}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(alert?.timestamp)}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-sm font-medium text-card-foreground mb-1">{alert?.location}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{alert?.message}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Icon name="Users" size={12} className="mr-1" />
                    {alert?.affectedPopulation?.toLocaleString()} affected
                  </span>
                  <span className="flex items-center">
                    <Icon name="Shield" size={12} className="mr-1" />
                    {alert?.responseTeams} teams
                  </span>
                </div>
                <span className="font-mono">{alert?.id}</span>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="Eye" size={14} className="mr-1" />
                  View Details
                </Button>
                <Button variant="default" size="sm" className="flex-1">
                  <Icon name="CheckCircle" size={14} className="mr-1" />
                  Acknowledge
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertFeed;