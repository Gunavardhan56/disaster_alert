import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  dateRange, 
  setDateRange, 
  alertTypes, 
  setAlertTypes, 
  regions, 
  setRegions,
  comparisonMode,
  setComparisonMode,
  onExport
}) => {
  const dateRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const alertTypeOptions = [
    { value: 'cyclone', label: 'Cyclone' },
    { value: 'flood', label: 'Flood' },
    { value: 'earthquake', label: 'Earthquake' },
    { value: 'wildfire', label: 'Wildfire' },
    { value: 'tsunami', label: 'Tsunami' },
    { value: 'landslide', label: 'Landslide' }
  ];

  const regionOptions = [
    { value: 'north', label: 'Northern Region' },
    { value: 'south', label: 'Southern Region' },
    { value: 'east', label: 'Eastern Region' },
    { value: 'west', label: 'Western Region' },
    { value: 'central', label: 'Central Region' },
    { value: 'coastal', label: 'Coastal Areas' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Select date range"
            className="min-w-[160px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-muted-foreground" />
          <Select
            options={alertTypeOptions}
            value={alertTypes}
            onChange={setAlertTypes}
            placeholder="Alert types"
            multiple
            searchable
            className="min-w-[180px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <Select
            options={regionOptions}
            value={regions}
            onChange={setRegions}
            placeholder="Regions"
            multiple
            searchable
            className="min-w-[160px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={comparisonMode ? "default" : "outline"}
            size="sm"
            onClick={() => setComparisonMode(!comparisonMode)}
            iconName="GitCompare"
            iconPosition="left"
          >
            Compare Periods
          </Button>
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport('pdf')}
            iconName="FileText"
            iconPosition="left"
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport('csv')}
            iconName="Download"
            iconPosition="left"
          >
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;