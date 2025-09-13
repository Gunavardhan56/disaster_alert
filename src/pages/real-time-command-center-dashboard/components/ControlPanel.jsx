import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ControlPanel = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    disasterType: 'all',
    region: 'all',
    severity: 'all',
    autoRefresh: 15
  });

  const disasterTypes = [
    { value: 'all', label: 'All Disasters' },
    { value: 'cyclone', label: 'Cyclone' },
    { value: 'flood', label: 'Flood' },
    { value: 'earthquake', label: 'Earthquake' },
    { value: 'wildfire', label: 'Wildfire' },
    { value: 'landslide', label: 'Landslide' }
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'northern', label: 'Northern Zone' },
    { value: 'eastern', label: 'Eastern Zone' },
    { value: 'western', label: 'Western Zone' },
    { value: 'southern', label: 'Southern Zone' },
    { value: 'central', label: 'Central Zone' }
  ];

  const severityLevels = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Information' }
  ];

  const refreshIntervals = [
    { value: 5, label: '5 seconds' },
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      disasterType: 'all',
      region: 'all',
      severity: 'all',
      autoRefresh: 15
    };
    setFilters(defaultFilters);
    if (onFiltersChange) {
      onFiltersChange(defaultFilters);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-primary" />
          Command Center Controls
        </h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 border border-success rounded-md">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs font-medium text-success">System Online</span>
          </div>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            <Icon name="RotateCcw" size={14} className="mr-1" />
            Reset
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Disaster Type Filter */}
        <div>
          <Select
            label="Disaster Type"
            options={disasterTypes}
            value={filters?.disasterType}
            onChange={(value) => handleFilterChange('disasterType', value)}
            className="w-full"
          />
        </div>

        {/* Region Filter */}
        <div>
          <Select
            label="Geographic Region"
            options={regions}
            value={filters?.region}
            onChange={(value) => handleFilterChange('region', value)}
            className="w-full"
          />
        </div>

        {/* Severity Filter */}
        <div>
          <Select
            label="Alert Severity"
            options={severityLevels}
            value={filters?.severity}
            onChange={(value) => handleFilterChange('severity', value)}
            className="w-full"
          />
        </div>

        {/* Auto Refresh */}
        <div>
          <Select
            label="Auto Refresh"
            options={refreshIntervals}
            value={filters?.autoRefresh}
            onChange={(value) => handleFilterChange('autoRefresh', value)}
            className="w-full"
          />
        </div>
      </div>
      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm">
          <Icon name="Download" size={14} className="mr-1" />
          Export Data
        </Button>
        <Button variant="outline" size="sm">
          <Icon name="Printer" size={14} className="mr-1" />
          Print Report
        </Button>
        <Button variant="outline" size="sm">
          <Icon name="Share2" size={14} className="mr-1" />
          Share Dashboard
        </Button>
        <Button variant="outline" size="sm">
          <Icon name="Bell" size={14} className="mr-1" />
          Alert Settings
        </Button>
        <Button variant="default" size="sm">
          <Icon name="AlertTriangle" size={14} className="mr-1" />
          Emergency Broadcast
        </Button>
      </div>
      {/* Active Filters Display */}
      {(filters?.disasterType !== 'all' || filters?.region !== 'all' || filters?.severity !== 'all') && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Filter" size={14} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters?.disasterType !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                Type: {disasterTypes?.find(t => t?.value === filters?.disasterType)?.label}
              </span>
            )}
            {filters?.region !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                Region: {regions?.find(r => r?.value === filters?.region)?.label}
              </span>
            )}
            {filters?.severity !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                Severity: {severityLevels?.find(s => s?.value === filters?.severity)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;