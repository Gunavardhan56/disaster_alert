import React from 'react';
import Icon from '../../../components/AppIcon';

const GeographicHeatMap = ({ regions, selectedRegion, onRegionSelect }) => {
  const getIntensityColor = (intensity) => {
    if (intensity >= 80) return 'bg-error';
    if (intensity >= 60) return 'bg-warning';
    if (intensity >= 40) return 'bg-accent';
    if (intensity >= 20) return 'bg-secondary';
    return 'bg-success';
  };

  const getIntensityLabel = (intensity) => {
    if (intensity >= 80) return 'Critical';
    if (intensity >= 60) return 'High';
    if (intensity >= 40) return 'Medium';
    if (intensity >= 20) return 'Low';
    return 'Minimal';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Geographic Alert Coverage</h3>
          <p className="text-sm text-muted-foreground">Regional alert distribution and response rates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Map" size={20} className="text-primary" />
        </div>
      </div>
      {/* Map Placeholder with Interactive Regions */}
      <div className="relative bg-muted rounded-lg h-64 mb-4 overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Alert Coverage Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=8&output=embed"
          className="rounded-lg"
        />
        
        {/* Overlay with region indicators */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-2">
            <div className="text-xs font-medium text-foreground mb-1">Alert Intensity</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Low</span>
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">High</span>
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-xs text-muted-foreground">Critical</span>
            </div>
          </div>
        </div>
      </div>
      {/* Regional Statistics */}
      <div className="grid grid-cols-2 gap-3">
        {regions?.map((region) => (
          <button
            key={region?.id}
            onClick={() => onRegionSelect(region?.id)}
            className={`p-3 rounded-lg border transition-all duration-200 text-left ${
              selectedRegion === region?.id
                ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground">{region?.name}</h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getIntensityColor(region?.alertIntensity)}`}>
                {getIntensityLabel(region?.alertIntensity)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-muted-foreground">Active Alerts</div>
                <div className="font-semibold text-foreground">{region?.activeAlerts}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Response Rate</div>
                <div className="font-semibold text-foreground">{region?.responseRate}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Population</div>
                <div className="font-semibold text-foreground">{region?.population}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Coverage</div>
                <div className="font-semibold text-foreground">{region?.coverage}%</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Selected Region Details */}
      {selectedRegion && (
        <div className="mt-4 pt-4 border-t border-border">
          {(() => {
            const region = regions?.find(r => r?.id === selectedRegion);
            return region ? (
              <div className="bg-muted/50 rounded-lg p-3">
                <h5 className="text-sm font-medium text-foreground mb-2">
                  {region?.name} - Detailed Metrics
                </h5>
                <div className="grid grid-cols-4 gap-3 text-xs">
                  <div className="text-center">
                    <div className="text-muted-foreground">Avg Response</div>
                    <div className="font-semibold text-foreground">{region?.avgResponseTime}min</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">False Alarms</div>
                    <div className="font-semibold text-foreground">{region?.falseAlarmRate}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Channels</div>
                    <div className="font-semibold text-foreground">{region?.activeChannels}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Last Alert</div>
                    <div className="font-semibold text-foreground">{region?.lastAlert}</div>
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default GeographicHeatMap;