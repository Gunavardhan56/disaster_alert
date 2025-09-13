import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const GlobalControlPanel = () => {
  const [selectedComponents, setSelectedComponents] = useState('all');
  const [healthThreshold, setHealthThreshold] = useState('70');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState('real-time');
  const [alertLevel, setAlertLevel] = useState('all');

  const componentOptions = [
    { value: 'all', label: 'All Components' },
    { value: 'weather', label: 'Weather Stations' },
    { value: 'satellite', label: 'Satellite Systems' },
    { value: 'communication', label: 'Communication Devices' },
    { value: 'network', label: 'Network Infrastructure' },
    { value: 'servers', label: 'Processing Servers' }
  ];

  const thresholdOptions = [
    { value: '90', label: '90% - Excellent Only' },
    { value: '80', label: '80% - Good and Above' },
    { value: '70', label: '70% - Acceptable and Above' },
    { value: '60', label: '60% - Warning and Above' },
    { value: '50', label: '50% - All Levels' }
  ];

  const refreshOptions = [
    { value: 'real-time', label: 'Real-time' },
    { value: '30s', label: '30 seconds' },
    { value: '1min', label: '1 minute' },
    { value: '5min', label: '5 minutes' },
    { value: '15min', label: '15 minutes' }
  ];

  const alertLevelOptions = [
    { value: 'all', label: 'All Alerts' },
    { value: 'critical', label: 'Critical Only' },
    { value: 'warning', label: 'Warning & Critical' },
    { value: 'info', label: 'Info & Above' }
  ];

  const handleMaintenanceModeToggle = () => {
    setMaintenanceMode(!maintenanceMode);
  };

  const handleEmergencyStop = () => {
    // Emergency stop functionality
    console.log('Emergency stop activated');
  };

  const handleSystemReset = () => {
    // System reset functionality
    console.log('System reset initiated');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-card-foreground">System Health & Infrastructure Monitoring</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive monitoring dashboard for satellite connectivity, weather stations, and communication networks
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">System Operational</span>
          </div>
          
          <Button
            variant={maintenanceMode ? "warning" : "outline"}
            size="sm"
            iconName="Settings"
            onClick={handleMaintenanceModeToggle}
          >
            {maintenanceMode ? 'Exit Maintenance' : 'Maintenance Mode'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section - Filters and Controls */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Select
              label="Component Filter"
              options={componentOptions}
              value={selectedComponents}
              onChange={setSelectedComponents}
              className="w-full"
            />
          </div>
          
          <div>
            <Select
              label="Health Threshold"
              options={thresholdOptions}
              value={healthThreshold}
              onChange={setHealthThreshold}
              className="w-full"
            />
          </div>
          
          <div>
            <Select
              label="Refresh Interval"
              options={refreshOptions}
              value={refreshInterval}
              onChange={setRefreshInterval}
              className="w-full"
            />
          </div>
          
          <div>
            <Select
              label="Alert Level"
              options={alertLevelOptions}
              value={alertLevel}
              onChange={setAlertLevel}
              className="w-full"
            />
          </div>
        </div>

        {/* Right Section - Action Controls */}
        <div className="lg:col-span-4 flex items-end space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            className="flex-1"
          >
            Refresh Data
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            className="flex-1"
          >
            Export Report
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            iconName="AlertTriangle"
            onClick={handleEmergencyStop}
            className="flex-1"
          >
            Emergency Stop
          </Button>
        </div>
      </div>

      {/* Status Indicators Row */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Wifi" size={16} className="text-success" />
            </div>
            <div>
              <div className="text-sm font-medium text-card-foreground">Network</div>
              <div className="text-xs text-success">98.5% Uptime</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Satellite" size={16} className="text-success" />
            </div>
            <div>
              <div className="text-sm font-medium text-card-foreground">Satellites</div>
              <div className="text-xs text-success">87% Signal</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="CloudRain" size={16} className="text-warning" />
            </div>
            <div>
              <div className="text-sm font-medium text-card-foreground">Weather</div>
              <div className="text-xs text-warning">92% Online</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Radio" size={16} className="text-error" />
            </div>
            <div>
              <div className="text-sm font-medium text-card-foreground">Comms</div>
              <div className="text-xs text-error">78% Active</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Server" size={16} className="text-success" />
            </div>
            <div>
              <div className="text-sm font-medium text-card-foreground">Servers</div>
              <div className="text-xs text-success">96% Health</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Database" size={16} className="text-success" />
            </div>
            <div>
              <div className="text-sm font-medium text-card-foreground">Storage</div>
              <div className="text-xs text-success">82% Used</div>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Mode Banner */}
      {maintenanceMode && (
        <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <div>
              <h4 className="text-sm font-semibold text-warning">Maintenance Mode Active</h4>
              <p className="text-xs text-muted-foreground">
                System is in maintenance mode. Some monitoring features may be limited. 
                Non-critical alerts are suppressed.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleMaintenanceModeToggle}
              className="ml-auto"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalControlPanel;