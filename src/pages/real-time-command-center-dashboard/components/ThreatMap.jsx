import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapView, setMapView] = useState('satellite');
  const [threatLayers, setThreatLayers] = useState({
    cyclone: true,
    flood: true,
    earthquake: true,
    wildfire: false
  });

  const threatZones = [
    {
      id: 'zone-1',
      name: 'Bay of Bengal Cyclone Zone',
      type: 'cyclone',
      severity: 'critical',
      coordinates: { lat: 20.5937, lng: 78.9629 },
      radius: 150,
      affectedPopulation: 2500000,
      windSpeed: '185 km/h',
      status: 'active'
    },
    {
      id: 'zone-2',
      name: 'Ganges Flood Basin',
      type: 'flood',
      severity: 'warning',
      coordinates: { lat: 25.3176, lng: 82.9739 },
      radius: 200,
      affectedPopulation: 850000,
      waterLevel: '2.3m above danger',
      status: 'monitoring'
    },
    {
      id: 'zone-3',
      name: 'Himalayan Seismic Zone',
      type: 'earthquake',
      severity: 'critical',
      coordinates: { lat: 28.7041, lng: 77.1025 },
      radius: 100,
      affectedPopulation: 1200000,
      magnitude: '6.8',
      status: 'responding'
    },
    {
      id: 'zone-4',
      name: 'Western Ghats Fire Zone',
      type: 'wildfire',
      severity: 'warning',
      coordinates: { lat: 15.2993, lng: 74.1240 },
      radius: 75,
      affectedPopulation: 45000,
      burnArea: '2,500 hectares',
      status: 'active'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return '#DC2626';
      case 'warning':
        return '#D97706';
      case 'info':
        return '#2563EB';
      default:
        return '#6B7280';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'cyclone':
        return 'Zap';
      case 'flood':
        return 'Waves';
      case 'earthquake':
        return 'Mountain';
      case 'wildfire':
        return 'Flame';
      default:
        return 'AlertTriangle';
    }
  };

  const toggleThreatLayer = (type) => {
    setThreatLayers(prev => ({
      ...prev,
      [type]: !prev?.[type]
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground flex items-center">
            <Icon name="Map" size={20} className="mr-2 text-primary" />
            Real-Time Threat Map
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              <Icon name="Satellite" size={14} className="mr-1" />
              Satellite
            </Button>
            <Button
              variant={mapView === 'terrain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('terrain')}
            >
              <Icon name="Mountain" size={14} className="mr-1" />
              Terrain
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(threatLayers)?.map(([type, enabled]) => (
            <Button
              key={type}
              variant={enabled ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleThreatLayer(type)}
              className="capitalize"
            >
              <Icon name={getTypeIcon(type)} size={14} className="mr-1" />
              {type}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        {/* Map Container */}
        <div className="absolute inset-0 bg-slate-800 rounded-b-lg">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Disaster Threat Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=20.5937,78.9629&z=6&output=embed"
            className="rounded-b-lg"
          />
          
          {/* Threat Zone Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {threatZones?.map((zone) => {
              if (!threatLayers?.[zone?.type]) return null;
              
              return (
                <div
                  key={zone?.id}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{
                    top: `${Math.random() * 60 + 20}%`,
                    left: `${Math.random() * 60 + 20}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedRegion(zone)}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse"
                    style={{ backgroundColor: getSeverityColor(zone?.severity) }}
                  >
                    <Icon name={getTypeIcon(zone?.type)} size={16} color="white" />
                  </div>
                  <div
                    className="absolute inset-0 rounded-full opacity-30 animate-ping"
                    style={{
                      backgroundColor: getSeverityColor(zone?.severity),
                      width: `${zone?.radius / 10}px`,
                      height: `${zone?.radius / 10}px`,
                      transform: 'translate(-50%, -50%)',
                      top: '50%',
                      left: '50%'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
              <Icon name="ZoomIn" size={16} />
            </Button>
            <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
              <Icon name="ZoomOut" size={16} />
            </Button>
            <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
              <Icon name="RotateCcw" size={16} />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">Threat Levels</h3>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <span className="text-xs text-slate-700">Critical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-xs text-slate-700">Warning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-slate-700">Info</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Region Details */}
        {selectedRegion && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 max-w-sm shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getSeverityColor(selectedRegion?.severity) }}
                >
                  <Icon name={getTypeIcon(selectedRegion?.type)} size={14} color="white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{selectedRegion?.name}</h3>
                  <p className="text-xs text-slate-600 capitalize">{selectedRegion?.type} - {selectedRegion?.severity}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRegion(null)}
              >
                <Icon name="X" size={14} />
              </Button>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Population at Risk:</span>
                <span className="font-medium">{selectedRegion?.affectedPopulation?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium capitalize">{selectedRegion?.status}</span>
              </div>
              {selectedRegion?.windSpeed && (
                <div className="flex justify-between">
                  <span>Wind Speed:</span>
                  <span className="font-medium">{selectedRegion?.windSpeed}</span>
                </div>
              )}
              {selectedRegion?.waterLevel && (
                <div className="flex justify-between">
                  <span>Water Level:</span>
                  <span className="font-medium">{selectedRegion?.waterLevel}</span>
                </div>
              )}
              {selectedRegion?.magnitude && (
                <div className="flex justify-between">
                  <span>Magnitude:</span>
                  <span className="font-medium">{selectedRegion?.magnitude}</span>
                </div>
              )}
              {selectedRegion?.burnArea && (
                <div className="flex justify-between">
                  <span>Burn Area:</span>
                  <span className="font-medium">{selectedRegion?.burnArea}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1 text-slate-900">
                <Icon name="Eye" size={12} className="mr-1" />
                Details
              </Button>
              <Button variant="default" size="sm" className="flex-1">
                <Icon name="AlertTriangle" size={12} className="mr-1" />
                Alert
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatMap;