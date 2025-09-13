import React from 'react';
import Icon from '../../../components/AppIcon';

const ChannelPerformanceLeaderboard = ({ channels }) => {
  const getChannelIcon = (channel) => {
    const iconMap = {
      'SMS': 'MessageSquare',
      'Radio': 'Radio',
      'Mobile App': 'Smartphone',
      'Social Media': 'Share2',
      'Email': 'Mail',
      'Emergency Broadcast': 'Megaphone'
    };
    return iconMap?.[channel] || 'Bell';
  };

  const getPerformanceColor = (rate) => {
    if (rate >= 95) return 'text-success';
    if (rate >= 85) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceBg = (rate) => {
    if (rate >= 95) return 'bg-success';
    if (rate >= 85) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Channel Performance</h3>
          <p className="text-sm text-muted-foreground">Delivery success rates by channel</p>
        </div>
        <Icon name="Award" size={20} className="text-primary" />
      </div>
      <div className="space-y-4">
        {channels?.map((channel, index) => (
          <div key={channel?.name} className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
              <span className="text-sm font-bold text-muted-foreground">
                {index + 1}
              </span>
            </div>

            <div className="flex items-center space-x-3 flex-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Icon 
                  name={getChannelIcon(channel?.name)} 
                  size={18} 
                  className="text-primary" 
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{channel?.name}</h4>
                  <span className={`text-sm font-semibold ${getPerformanceColor(channel?.successRate)}`}>
                    {channel?.successRate}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getPerformanceBg(channel?.successRate)}`}
                      style={{ width: `${channel?.successRate}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {channel?.totalAlerts} alerts
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-muted-foreground">Avg Response</div>
              <div className="text-sm font-medium text-foreground">
                {channel?.avgResponseTime}min
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Performance</span>
          <div className="flex items-center space-x-2">
            <span className="text-success font-medium">92.4%</span>
            <Icon name="TrendingUp" size={14} className="text-success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelPerformanceLeaderboard;