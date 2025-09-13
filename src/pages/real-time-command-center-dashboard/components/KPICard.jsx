import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, trend, trendValue, severity, icon, description }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-error bg-error/5 text-error';
      case 'warning':
        return 'border-warning bg-warning/5 text-warning';
      case 'success':
        return 'border-success bg-success/5 text-success';
      default:
        return 'border-border bg-card text-card-foreground';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-error';
      case 'down':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className={`p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${getSeverityColor(severity)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${severity === 'critical' ? 'bg-error/20' : severity === 'warning' ? 'bg-warning/20' : severity === 'success' ? 'bg-success/20' : 'bg-muted/20'}`}>
            <Icon name={icon} size={20} className="text-current" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground/80 mt-1">{description}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
            <Icon name={getTrendIcon(trend)} size={14} />
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-current">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      
      <div className="mt-3 h-1 bg-muted/20 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${
            severity === 'critical' ? 'bg-error' : 
            severity === 'warning' ? 'bg-warning' : 
            severity === 'success' ? 'bg-success' : 'bg-primary'
          }`}
          style={{ width: `${Math.min(100, (value / 100) * 100)}%` }}
        />
      </div>
    </div>
  );
};

export default KPICard;