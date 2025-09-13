import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const ControlBar = ({ onFiltersChange, className = "" }) => {
  const [selectedIncident, setSelectedIncident] = useState('all');
  const [selectedResourceType, setSelectedResourceType] = useState('all');
  const [deploymentStatus, setDeploymentStatus] = useState('all');
  const [timeRange, setTimeRange] = useState('realtime');

  const incidentOptions = [
    { value: 'all', label: 'All Incidents' },
    { value: 'flood-zone-a', label: 'Flood Response - Zone A' },
    { value: 'building-collapse', label: 'Building Collapse - Downtown' },
    { value: 'evacuation-residential', label: 'Evacuation Support - Residential' },
    { value: 'power-grid', label: 'Power Grid Restoration' }
  ];

  const resourceTypeOptions = [
    { value: 'all', label: 'All Resources' },
    { value: 'personnel', label: 'Personnel' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'vehicles', label: 'Vehicles' }
  ];

  const deploymentStatusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'deployed', label: 'Deployed' },
    { value: 'en-route', label: 'En-route' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const timeRangeOptions = [
    { value: 'realtime', label: 'Real-time' },
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' }
  ];

  const handleFilterChange = (filterType, value) => {
    const filters = {
      incident: selectedIncident,
      resourceType: selectedResourceType,
      deploymentStatus: deploymentStatus,
      timeRange: timeRange
    };

    filters[filterType] = value;

    switch (filterType) {
      case 'incident':
        setSelectedIncident(value);
        break;
      case 'resourceType':
        setSelectedResourceType(value);
        break;
      case 'deploymentStatus':
        setDeploymentStatus(value);
        break;
      case 'timeRange':
        setTimeRange(value);
        break;
    }

    onFiltersChange?.(filters);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Left Section - Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">Filters:</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
            <Select
              placeholder="Select incident"
              options={incidentOptions}
              value={selectedIncident}
              onChange={(value) => handleFilterChange('incident', value)}
              className="min-w-0"
            />
            
            <Select
              placeholder="Resource type"
              options={resourceTypeOptions}
              value={selectedResourceType}
              onChange={(value) => handleFilterChange('resourceType', value)}
              className="min-w-0"
            />
            
            <Select
              placeholder="Deployment status"
              options={deploymentStatusOptions}
              value={deploymentStatus}
              onChange={(value) => handleFilterChange('deploymentStatus', value)}
              className="min-w-0"
            />
            
            <Select
              placeholder="Time range"
              options={timeRangeOptions}
              value={timeRange}
              onChange={(value) => handleFilterChange('timeRange', value)}
              className="min-w-0"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${timeRange === 'realtime' ? 'bg-success animate-pulse' : 'bg-muted'}`} />
            <span className="text-xs text-muted-foreground">
              {timeRange === 'realtime' ? 'Live' : 'Historical'}
            </span>
          </div>
          
          <div className="h-4 w-px bg-border" />
          
          <button className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            <Icon name="Download" size={14} />
            <span>Export</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-1.5 text-xs border border-border text-card-foreground rounded-md hover:bg-muted/50 transition-colors">
            <Icon name="Settings" size={14} />
            <span>Configure</span>
          </button>
          
          <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
            <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Active Filters Display */}
      {(selectedIncident !== 'all' || selectedResourceType !== 'all' || deploymentStatus !== 'all') && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {selectedIncident !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                <span>{incidentOptions?.find(opt => opt?.value === selectedIncident)?.label}</span>
                <button onClick={() => handleFilterChange('incident', 'all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {selectedResourceType !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                <span>{resourceTypeOptions?.find(opt => opt?.value === selectedResourceType)?.label}</span>
                <button onClick={() => handleFilterChange('resourceType', 'all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {deploymentStatus !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                <span>{deploymentStatusOptions?.find(opt => opt?.value === deploymentStatus)?.label}</span>
                <button onClick={() => handleFilterChange('deploymentStatus', 'all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            <button 
              onClick={() => {
                setSelectedIncident('all');
                setSelectedResourceType('all');
                setDeploymentStatus('all');
                onFiltersChange?.({
                  incident: 'all',
                  resourceType: 'all',
                  deploymentStatus: 'all',
                  timeRange: timeRange
                });
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlBar;