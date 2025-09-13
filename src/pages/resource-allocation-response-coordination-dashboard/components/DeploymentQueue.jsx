import React from 'react';
import Icon from '../../../components/AppIcon';

const DeploymentQueue = ({ className = "" }) => {
  const deploymentQueue = [
    {
      id: 1,
      priority: 'high',
      incident: 'Flood Response - Zone A',
      resourceType: 'Medical Team',
      requestedBy: 'Field Commander Alpha',
      estimatedArrival: '15 min',
      status: 'dispatching',
      matchScore: 95,
      requirements: ['Advanced Medical Training', 'Water Rescue Certified', 'Communication Equipment']
    },
    {
      id: 2,
      priority: 'critical',
      incident: 'Building Collapse - Downtown',
      resourceType: 'Heavy Rescue Equipment',
      requestedBy: 'Incident Commander',
      estimatedArrival: '8 min',
      status: 'en-route',
      matchScore: 100,
      requirements: ['Hydraulic Tools', 'Search Dogs', 'Structural Engineers']
    },
    {
      id: 3,
      priority: 'medium',
      incident: 'Evacuation Support - Residential',
      resourceType: 'Transport Vehicles',
      requestedBy: 'Evacuation Coordinator',
      estimatedArrival: '25 min',
      status: 'pending',
      matchScore: 87,
      requirements: ['Large Capacity Vehicles', 'Medical Support', 'Communication Hub']
    },
    {
      id: 4,
      priority: 'high',
      incident: 'Power Grid Restoration',
      resourceType: 'Technical Team',
      requestedBy: 'Infrastructure Manager',
      estimatedArrival: '12 min',
      status: 'assigned',
      matchScore: 92,
      requirements: ['Electrical Engineers', 'Safety Equipment', 'Backup Generators']
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'dispatching':
        return 'text-warning';
      case 'en-route':
        return 'text-primary';
      case 'assigned':
        return 'text-success';
      case 'pending':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'dispatching':
        return 'Clock';
      case 'en-route':
        return 'Truck';
      case 'assigned':
        return 'CheckCircle';
      case 'pending':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Deployment Queue</h3>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Auto-Assign
            </button>
            <button className="p-2 hover:bg-muted rounded-md transition-colors">
              <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {deploymentQueue?.map((deployment) => (
          <div key={deployment?.id} className="p-4 hover:bg-muted/20 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(deployment?.priority)}`}>
                    {deployment?.priority?.toUpperCase()}
                  </span>
                  <div className={`flex items-center space-x-1 ${getStatusColor(deployment?.status)}`}>
                    <Icon name={getStatusIcon(deployment?.status)} size={14} />
                    <span className="text-xs font-medium">{deployment?.status}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-card-foreground mb-1">{deployment?.incident}</h4>
                <p className="text-sm text-muted-foreground">{deployment?.resourceType}</p>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getMatchScoreColor(deployment?.matchScore)}`}>
                  {deployment?.matchScore}%
                </div>
                <p className="text-xs text-muted-foreground">Match Score</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-muted-foreground">Requested by:</span>
                <p className="font-medium text-card-foreground">{deployment?.requestedBy}</p>
              </div>
              <div>
                <span className="text-muted-foreground">ETA:</span>
                <p className="font-medium text-card-foreground">{deployment?.estimatedArrival}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Requirements:</p>
              <div className="flex flex-wrap gap-1">
                {deployment?.requirements?.map((req, index) => (
                  <span key={index} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                    {req}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                  View Details
                </button>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Modify Request
                </button>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
                  <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
                </button>
                <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
                  <Icon name="Phone" size={14} className="text-muted-foreground" />
                </button>
                <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
                  <Icon name="MapPin" size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {deploymentQueue?.length} pending deployments
          </span>
          <button className="text-primary hover:text-primary/80 transition-colors">
            View All Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeploymentQueue;