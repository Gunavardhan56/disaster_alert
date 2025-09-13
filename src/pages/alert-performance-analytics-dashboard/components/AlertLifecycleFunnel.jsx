import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertLifecycleFunnel = ({ data }) => {
  const stages = [
    { key: 'generated', label: 'Generated', icon: 'AlertTriangle', color: 'bg-primary' },
    { key: 'validated', label: 'Validated', icon: 'CheckCircle', color: 'bg-secondary' },
    { key: 'distributed', label: 'Distributed', icon: 'Send', color: 'bg-accent' },
    { key: 'acknowledged', label: 'Acknowledged', icon: 'Eye', color: 'bg-success' },
    { key: 'resolved', label: 'Resolved', icon: 'Check', color: 'bg-muted' }
  ];

  const getStageWidth = (current, total) => {
    return Math.max((current / total) * 100, 10);
  };

  const getConversionRate = (current, previous) => {
    if (!previous) return 100;
    return ((current / previous) * 100)?.toFixed(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Alert Lifecycle Funnel</h3>
          <p className="text-sm text-muted-foreground">End-to-end alert processing flow</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last 24 hours</span>
        </div>
      </div>
      <div className="space-y-4">
        {stages?.map((stage, index) => {
          const stageData = data?.[stage?.key];
          const previousStageData = index > 0 ? data?.[stages?.[index - 1]?.key] : null;
          const width = getStageWidth(stageData?.count, data?.generated?.count);
          const conversionRate = getConversionRate(stageData?.count, previousStageData?.count);

          return (
            <div key={stage?.key} className="relative">
              <div className="flex items-center space-x-4 mb-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${stage?.color}`}>
                  <Icon name={stage?.icon} size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">{stage?.label}</h4>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-semibold text-foreground">
                        {stageData?.count?.toLocaleString()}
                      </span>
                      {index > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {conversionRate}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-12">
                <div className="bg-muted rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${stage?.color}`}
                    style={{ width: `${width}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Avg time: {stageData?.avgTime}</span>
                  <span>{stageData?.failureRate}% failure rate</span>
                </div>
              </div>
              {index < stages?.length - 1 && (
                <div className="flex justify-center my-2">
                  <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">
              {((data?.resolved?.count / data?.generated?.count) * 100)?.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">Overall Success Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {data?.avgProcessingTime}
            </div>
            <div className="text-xs text-muted-foreground">Avg Processing Time</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {data?.bottleneckStage}
            </div>
            <div className="text-xs text-muted-foreground">Primary Bottleneck</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertLifecycleFunnel;