import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComponentStatusGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const components = [
    {
      id: 'ws-001',
      name: 'Weather Station Alpha',
      type: 'weather',
      location: 'Sector 1',
      status: 'online',
      health: 98,
      lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
      metrics: {
        temperature: '24.5°C',
        humidity: '67%',
        windSpeed: '12 km/h',
        pressure: '1013 hPa'
      },
      issues: [],
      nextMaintenance: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'ws-002',
      name: 'Weather Station Beta',
      type: 'weather',
      location: 'Sector 2',
      status: 'warning',
      health: 85,
      lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
      metrics: {
        temperature: '26.1°C',
        humidity: '72%',
        windSpeed: '8 km/h',
        pressure: '1011 hPa'
      },
      issues: ['Low battery warning'],
      nextMaintenance: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'sat-001',
      name: 'Satellite Link Primary',
      type: 'satellite',
      location: 'Orbital Position A',
      status: 'online',
      health: 94,
      lastUpdate: new Date(Date.now() - 1 * 60 * 1000),
      metrics: {
        signalStrength: '87%',
        dataRate: '2.4 Mbps',
        latency: '245ms',
        uptime: '99.8%'
      },
      issues: [],
      nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'com-001',
      name: 'Emergency Radio Tower 1',
      type: 'communication',
      location: 'Central Hub',
      status: 'critical',
      health: 45,
      lastUpdate: new Date(Date.now() - 45 * 60 * 1000),
      metrics: {
        signalStrength: '45%',
        coverage: '60%',
        activeChannels: '3/8',
        interference: 'High'
      },
      issues: ['Antenna alignment issue', 'Power fluctuation'],
      nextMaintenance: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'net-001',
      name: 'Network Node Alpha',
      type: 'network',
      location: 'Data Center 1',
      status: 'online',
      health: 96,
      lastUpdate: new Date(Date.now() - 30 * 1000),
      metrics: {
        bandwidth: '850 Mbps',
        latency: '12ms',
        packetLoss: '0.01%',
        connections: '1,247'
      },
      issues: [],
      nextMaintenance: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'srv-001',
      name: 'Processing Server Cluster',
      type: 'server',
      location: 'Data Center 1',
      status: 'warning',
      health: 78,
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
      metrics: {
        cpuUsage: '87%',
        memoryUsage: '74%',
        diskSpace: '82%',
        temperature: '68°C'
      },
      issues: ['High CPU usage', 'Memory optimization needed'],
      nextMaintenance: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    }
  ];

  const categories = [
    { value: 'all', label: 'All Components', icon: 'Grid3X3', count: components?.length },
    { value: 'weather', label: 'Weather Stations', icon: 'CloudRain', count: components?.filter(c => c?.type === 'weather')?.length },
    { value: 'satellite', label: 'Satellites', icon: 'Satellite', count: components?.filter(c => c?.type === 'satellite')?.length },
    { value: 'communication', label: 'Communication', icon: 'Radio', count: components?.filter(c => c?.type === 'communication')?.length },
    { value: 'network', label: 'Network', icon: 'Wifi', count: components?.filter(c => c?.type === 'network')?.length },
    { value: 'server', label: 'Servers', icon: 'Server', count: components?.filter(c => c?.type === 'server')?.length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-success border-success bg-success/10';
      case 'warning':
        return 'text-warning border-warning bg-warning/10';
      case 'critical':
        return 'text-error border-error bg-error/10';
      case 'offline':
        return 'text-muted-foreground border-muted bg-muted/10';
      default:
        return 'text-muted-foreground border-muted bg-muted/10';
    }
  };

  const getHealthColor = (health) => {
    if (health >= 90) return 'text-success';
    if (health >= 70) return 'text-warning';
    return 'text-error';
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

  const filteredComponents = selectedCategory === 'all' 
    ? components 
    : components?.filter(component => component?.type === selectedCategory);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Component Status Overview</h3>
          <p className="text-sm text-muted-foreground">Monitor individual system components and infrastructure health</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              iconName="Grid3X3"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              iconName="List"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </div>
          <Button variant="outline" size="sm" iconName="Plus">
            Add Component
          </Button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto">
        {categories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => setSelectedCategory(category?.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === category?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              selectedCategory === category?.value 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Components Grid/List */}
      <div className={viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
      }>
        {filteredComponents?.map((component) => (
          <div
            key={component?.id}
            className={`border rounded-lg p-4 transition-all hover:shadow-md ${getStatusColor(component?.status)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  component?.status === 'online' ? 'bg-success/10' :
                  component?.status === 'warning' ? 'bg-warning/10' : 'bg-error/10'
                }`}>
                  <Icon 
                    name={
                      component?.type === 'weather' ? 'CloudRain' :
                      component?.type === 'satellite' ? 'Satellite' :
                      component?.type === 'communication' ? 'Radio' :
                      component?.type === 'network' ? 'Wifi' : 'Server'
                    } 
                    size={20} 
                    className={
                      component?.status === 'online' ? 'text-success' :
                      component?.status === 'warning' ? 'text-warning' : 'text-error'
                    }
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-card-foreground mb-1">
                    {component?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{component?.location}</span>
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-lg font-bold ${getHealthColor(component?.health)}`}>
                  {component?.health}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatTimeAgo(component?.lastUpdate)}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.entries(component?.metrics)?.map(([key, value]) => (
                <div key={key} className="text-xs">
                  <span className="text-muted-foreground capitalize">{key?.replace(/([A-Z])/g, ' $1')?.trim()}:</span>
                  <span className="text-card-foreground font-medium ml-1">{value}</span>
                </div>
              ))}
            </div>

            {/* Issues */}
            {component?.issues?.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-muted-foreground mb-1">Issues:</div>
                <div className="space-y-1">
                  {component?.issues?.map((issue, index) => (
                    <div key={index} className="flex items-center space-x-1 text-xs text-warning">
                      <Icon name="AlertCircle" size={12} />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="text-xs text-muted-foreground">
                Next maintenance: {component?.nextMaintenance?.toLocaleDateString()}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="xs" iconName="Settings">
                  Configure
                </Button>
                <Button variant="ghost" size="xs" iconName="Activity">
                  Logs
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Online: {components?.filter(c => c?.status === 'online')?.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Warning: {components?.filter(c => c?.status === 'warning')?.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Critical: {components?.filter(c => c?.status === 'critical')?.length}</span>
          </div>
        </div>
        
        <Button variant="outline" size="sm" iconName="RefreshCw">
          Refresh All
        </Button>
      </div>
    </div>
  );
};

export default ComponentStatusGrid;