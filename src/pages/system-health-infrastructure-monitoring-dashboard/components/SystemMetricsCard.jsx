import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemMetricsCard = ({ title, value, unit, status, trend, trendValue, icon, description }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'text-success border-success bg-success/10';
      case 'good':
        return 'text-success border-success bg-success/10';
      case 'warning':
        return 'text-warning border-warning bg-warning/10';
      case 'critical':
        return 'text-error border-error bg-error/10';
      default:
        return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      case 'stable':
        return 'text-muted-foreground';
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
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  return (
    <div className={`bg-card border rounded-lg p-6 ${getStatusColor(status)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(status)?.replace('text-', 'bg-')?.replace('border-', 'bg-')?.replace('bg-', 'bg-')?.split(' ')?.[0]}`}>
            <Icon name={icon} size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-card-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(status)}`}>
          <Icon name={getTrendIcon(trend)} size={12} className={getTrendColor(trend)} />
          <span className={getTrendColor(trend)}>{trendValue}</span>
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-card-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      {/* Mini Sparkline Placeholder */}
      <div className="mt-4 h-8 flex items-end space-x-1">
        {[...Array(12)]?.map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-sm ${getStatusColor(status)?.split(' ')?.[0]?.replace('text-', 'bg-')}`}
            style={{ height: `${Math.random() * 100 + 20}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default SystemMetricsCard;