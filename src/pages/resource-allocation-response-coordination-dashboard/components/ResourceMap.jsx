import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ResourceMap = ({ className = "" }) => {
  const [selectedResource, setSelectedResource] = useState(null);

  const resourceLocations = [
    {
      id: 1,
      type: 'team',
      name: 'Alpha Response Team',
      location: 'Downtown District',
      status: 'deployed',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      personnel: 12,
      equipment: ['Medical Kit', 'Communication Radio', 'Rescue Tools']
    },
    {
      id: 2,
      type: 'equipment',
      name: 'Mobile Command Unit',
      location: 'Central Park Area',
      status: 'available',
      coordinates: { lat: 40.7829, lng: -73.9654 },
      capacity: '50 personnel',
      equipment: ['Satellite Communication', 'Power Generator', 'Medical Station']
    },
    {
      id: 3,
      type: 'shelter',
      name: 'Emergency Shelter #1',
      location: 'Community Center',
      status: 'active',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      capacity: '200 people',
      current: 145,
      equipment: ['Food Supplies', 'Medical Station', 'Communication Hub']
    },
    {
      id: 4,
      type: 'team',
      name: 'Bravo Medical Team',
      location: 'Hospital District',
      status: 'en-route',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      personnel: 8,
      equipment: ['Advanced Medical Kit', 'Ambulance', 'Defibrillator']
    }
  ];

  const getResourceIcon = (type) => {
    switch (type) {
      case 'team':
        return 'Users';
      case 'equipment':
        return 'Truck';
      case 'shelter':
        return 'Home';
      default:
        return 'MapPin';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed':
        return 'bg-primary text-primary-foreground';
      case 'available':
        return 'bg-success text-success-foreground';
      case 'active':
        return 'bg-warning text-warning-foreground';
      case 'en-route':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Resource Distribution Map</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-muted rounded-md transition-colors">
              <Icon name="ZoomIn" size={16} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-md transition-colors">
              <Icon name="ZoomOut" size={16} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-md transition-colors">
              <Icon name="Maximize" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-96 bg-muted/20">
        {/* Map Container */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Resource Distribution Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
          className="w-full h-full"
        />
        
        {/* Resource Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {resourceLocations?.map((resource, index) => (
            <div
              key={resource?.id}
              className={`absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(resource?.status)} rounded-full p-2 shadow-lg border-2 border-background`}
              style={{
                left: `${20 + (index * 20)}%`,
                top: `${30 + (index * 15)}%`
              }}
              onClick={() => setSelectedResource(resource)}
            >
              <Icon name={getResourceIcon(resource?.type)} size={16} />
            </div>
          ))}
        </div>
        
        {/* Resource Details Popup */}
        {selectedResource && (
          <div className="absolute top-4 right-4 bg-popover border border-border rounded-lg p-4 shadow-lg max-w-xs">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-popover-foreground">{selectedResource?.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedResource?.location}</p>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedResource?.status)}`}>
                  {selectedResource?.status}
                </span>
              </div>
              
              {selectedResource?.personnel && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Personnel:</span>
                  <span className="text-sm font-medium text-popover-foreground">{selectedResource?.personnel}</span>
                </div>
              )}
              
              {selectedResource?.capacity && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Capacity:</span>
                  <span className="text-sm font-medium text-popover-foreground">{selectedResource?.capacity}</span>
                </div>
              )}
              
              {selectedResource?.current && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current:</span>
                  <span className="text-sm font-medium text-popover-foreground">{selectedResource?.current}</span>
                </div>
              )}
              
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Equipment:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedResource?.equipment?.map((item, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-xs text-muted-foreground">Deployed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-xs text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span className="text-xs text-muted-foreground">En-route</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourceMap;