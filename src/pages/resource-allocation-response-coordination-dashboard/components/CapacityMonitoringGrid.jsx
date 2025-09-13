import React from 'react';
import Icon from '../../../components/AppIcon';

const CapacityMonitoringGrid = ({ className = "" }) => {
  const capacityData = [
    {
      id: 1,
      category: 'Medical Facilities',
      facilities: [
        {
          name: 'Central Hospital',
          type: 'hospital',
          capacity: 500,
          current: 420,
          available: 80,
          status: 'warning',
          contact: '+1-555-0101',
          specialties: ['Emergency', 'Trauma', 'ICU']
        },
        {
          name: 'Community Health Center',
          type: 'clinic',
          capacity: 150,
          current: 95,
          available: 55,
          status: 'normal',
          contact: '+1-555-0102',
          specialties: ['General', 'Pediatrics']
        },
        {
          name: 'Field Medical Station',
          type: 'field',
          capacity: 50,
          current: 48,
          available: 2,
          status: 'critical',
          contact: '+1-555-0103',
          specialties: ['Emergency', 'Triage']
        }
      ]
    },
    {
      id: 2,
      category: 'Emergency Shelters',
      facilities: [
        {
          name: 'Main Community Center',
          type: 'shelter',
          capacity: 300,
          current: 245,
          available: 55,
          status: 'warning',
          contact: '+1-555-0201',
          specialties: ['Family Housing', 'Pet Friendly']
        },
        {
          name: 'School Gymnasium',
          type: 'shelter',
          capacity: 200,
          current: 120,
          available: 80,
          status: 'normal',
          contact: '+1-555-0202',
          specialties: ['General Housing', 'Meals']
        },
        {
          name: 'Emergency Tent City',
          type: 'temporary',
          capacity: 400,
          current: 380,
          available: 20,
          status: 'critical',
          contact: '+1-555-0203',
          specialties: ['Temporary Housing', 'Basic Services']
        }
      ]
    },
    {
      id: 3,
      category: 'Communication Networks',
      facilities: [
        {
          name: 'Primary Radio Tower',
          type: 'communication',
          capacity: 100,
          current: 75,
          available: 25,
          status: 'normal',
          contact: 'Tower-Alpha',
          specialties: ['Emergency Radio', 'Satellite Uplink']
        },
        {
          name: 'Mobile Command Unit',
          type: 'mobile',
          capacity: 50,
          current: 45,
          available: 5,
          status: 'warning',
          contact: 'MCU-01',
          specialties: ['Field Communications', 'Data Relay']
        },
        {
          name: 'Backup Communication Hub',
          type: 'backup',
          capacity: 75,
          current: 15,
          available: 60,
          status: 'normal',
          contact: 'Hub-Backup',
          specialties: ['Redundant Systems', 'Emergency Backup']
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'text-error border-error/20 bg-error/5';
      case 'warning':
        return 'text-warning border-warning/20 bg-warning/5';
      case 'normal':
        return 'text-success border-success/20 bg-success/5';
      default:
        return 'text-muted-foreground border-border bg-card';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'normal':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const getFacilityIcon = (type) => {
    switch (type) {
      case 'hospital':
        return 'Building2';
      case 'clinic':
        return 'Heart';
      case 'field':
        return 'Tent';
      case 'shelter':
        return 'Home';
      case 'temporary':
        return 'MapPin';
      case 'communication':
        return 'Radio';
      case 'mobile':
        return 'Truck';
      case 'backup':
        return 'Shield';
      default:
        return 'Building';
    }
  };

  const getUtilizationPercentage = (current, capacity) => {
    return Math.round((current / capacity) * 100);
  };

  const getUtilizationColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Capacity Monitoring</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-muted-foreground">Normal</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <span className="text-muted-foreground">Warning</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-error rounded-full" />
                <span className="text-muted-foreground">Critical</span>
              </div>
            </div>
            <button className="p-2 hover:bg-muted rounded-md transition-colors">
              <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {capacityData?.map((category) => (
          <div key={category?.id}>
            <h4 className="text-sm font-semibold text-card-foreground mb-4">{category?.category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category?.facilities?.map((facility, index) => {
                const utilizationPercentage = getUtilizationPercentage(facility?.current, facility?.capacity);
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getStatusColor(facility?.status)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name={getFacilityIcon(facility?.type)} size={16} className="text-current" />
                        <h5 className="font-medium text-current">{facility?.name}</h5>
                      </div>
                      <Icon name={getStatusIcon(facility?.status)} size={16} className="text-current" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Utilization</span>
                          <span className="font-medium text-current">{utilizationPercentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getUtilizationColor(utilizationPercentage)}`}
                            style={{ width: `${utilizationPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Capacity</span>
                          <p className="font-medium text-current">{facility?.capacity}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Current</span>
                          <p className="font-medium text-current">{facility?.current}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Available</span>
                          <p className="font-medium text-current">{facility?.available}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Contact:</p>
                        <p className="text-xs font-medium text-current">{facility?.contact}</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {facility?.specialties?.map((specialty, idx) => (
                            <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString()}
          </span>
          <button className="text-primary hover:text-primary/80 transition-colors">
            Generate Capacity Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapacityMonitoringGrid;