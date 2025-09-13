import React from 'react';
import Icon from '../../../components/AppIcon';

const ResourceKPICard = ({ title, value, subtitle, icon, status, trend, trendValue, className = "" }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical':
        return 'text-error border-error/20 bg-error/5';
      case 'warning':
        return 'text-warning border-warning/20 bg-warning/5';
      case 'success':
        return 'text-success border-success/20 bg-success/5';
      default:
        return 'text-foreground border-border bg-card';
    }
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className={`p-6 rounded-lg border ${getStatusColor()} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={icon} size={20} className="text-current" />
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-current">{value}</p>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceKPICard;