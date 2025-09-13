import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemAlertsFeed = () => {
  const [filter, setFilter] = useState('all');

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Weather Station WS-047 Offline',
      description: 'Station located in Sector 7 has lost connectivity. Last data received 23 minutes ago.',
      timestamp: new Date(Date.now() - 23 * 60 * 1000),
      component: 'Weather Station',
      location: 'Sector 7',
      estimatedResolution: '45 minutes',
      status: 'investigating',
      icon: 'AlertTriangle'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Satellite Signal Degradation',
      description: 'Signal strength dropped to 78% on SAT-03. Performance may be affected.',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      component: 'Satellite',
      location: 'SAT-03',
      estimatedResolution: '2 hours',
      status: 'monitoring',
      icon: 'Satellite'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance Complete',
      description: 'Network infrastructure maintenance in Zone A completed successfully.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      component: 'Network',
      location: 'Zone A',
      estimatedResolution: 'Completed',
      status: 'resolved',
      icon: 'CheckCircle'
    },
    {
      id: 4,
      type: 'warning',
      title: 'High CPU Usage Detected',
      description: 'Processing server CPU usage at 87%. Consider load balancing.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      component: 'Server',
      location: 'Data Center 1',
      estimatedResolution: '1 hour',
      status: 'acknowledged',
      icon: 'Cpu'
    },
    {
      id: 5,
      type: 'critical',
      title: 'Communication Device Failure',
      description: 'Emergency radio COM-15 not responding to health checks.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      component: 'Communication',
      location: 'Station 15',
      estimatedResolution: '3 hours',
      status: 'in-progress',
      icon: 'Radio'
    },
    {
      id: 6,
      type: 'info',
      title: 'System Backup Completed',
      description: 'Daily system backup completed successfully at 02:00 AM.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      component: 'System',
      location: 'All Locations',
      estimatedResolution: 'Completed',
      status: 'resolved',
      icon: 'Database'
    }
  ];

  const getAlertTypeColor = (type) => {
    switch (type) {
      case 'critical':
        return 'border-l-error bg-error/5 text-error';
      case 'warning':
        return 'border-l-warning bg-warning/5 text-warning';
      case 'info':
        return 'border-l-success bg-success/5 text-success';
      default:
        return 'border-l-muted bg-muted/5 text-muted-foreground';
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      investigating: { color: 'bg-error/10 text-error', label: 'Investigating' },
      monitoring: { color: 'bg-warning/10 text-warning', label: 'Monitoring' },
      acknowledged: { color: 'bg-secondary/10 text-secondary', label: 'Acknowledged' },
      'in-progress': { color: 'bg-primary/10 text-primary', label: 'In Progress' },
      resolved: { color: 'bg-success/10 text-success', label: 'Resolved' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.investigating;
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Alerts', count: alerts?.length },
    { value: 'critical', label: 'Critical', count: alerts?.filter(a => a?.type === 'critical')?.length },
    { value: 'warning', label: 'Warning', count: alerts?.filter(a => a?.type === 'warning')?.length },
    { value: 'info', label: 'Info', count: alerts?.filter(a => a?.type === 'info')?.length }
  ];

  const filteredAlerts = filter === 'all' ? alerts : alerts?.filter(alert => alert?.type === filter);

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">System Alerts</h3>
          <p className="text-sm text-muted-foreground">Real-time system notifications and status updates</p>
        </div>
        <Button variant="outline" size="sm" iconName="Settings">
          Configure
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-6 bg-muted/50 rounded-lg p-1">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setFilter(option?.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all flex-1 justify-center ${
              filter === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <span>{option?.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              filter === option?.value 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {option?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {filteredAlerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`border-l-4 rounded-lg p-4 ${getAlertTypeColor(alert?.type)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  alert?.type === 'critical' ? 'bg-error/10' :
                  alert?.type === 'warning' ? 'bg-warning/10' : 'bg-success/10'
                }`}>
                  <Icon 
                    name={alert?.icon} 
                    size={16} 
                    className={
                      alert?.type === 'critical' ? 'text-error' :
                      alert?.type === 'warning' ? 'text-warning' : 'text-success'
                    }
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-card-foreground mb-1">
                    {alert?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {alert?.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{alert?.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{formatTimeAgo(alert?.timestamp)}</span>
                    </span>
                  </div>
                </div>
              </div>
              {getStatusBadge(alert?.status)}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Timer" size={12} />
                <span>ETA: {alert?.estimatedResolution}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="xs" iconName="Eye">
                  View
                </Button>
                {alert?.status !== 'resolved' && (
                  <Button variant="ghost" size="xs" iconName="CheckCircle">
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {filteredAlerts?.length} alerts shown
        </span>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Archive">
            Archive All
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemAlertsFeed;