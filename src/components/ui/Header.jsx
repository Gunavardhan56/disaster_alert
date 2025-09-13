import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected'); // connected, reconnecting, disconnected

  const navigationItems = [
    {
      label: 'Command Center',
      path: '/real-time-command-center-dashboard',
      icon: 'Activity',
      tooltip: 'Real-time operational hub for situational awareness'
    },
    {
      label: 'Alert Analytics',
      path: '/alert-performance-analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'Performance analysis and response optimization'
    },
    {
      label: 'Resource Coordination',
      path: '/resource-allocation-response-coordination-dashboard',
      icon: 'Users',
      tooltip: 'Team deployment and resource allocation'
    },
    {
      label: 'System Health',
      path: '/system-health-infrastructure-monitoring-dashboard',
      icon: 'Shield',
      tooltip: 'Infrastructure and connectivity monitoring'
    }
  ];

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success border-success';
      case 'reconnecting':
        return 'text-warning border-warning animate-connection-pulse';
      case 'disconnected':
        return 'text-error border-error';
      default:
        return 'text-success border-success';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'reconnecting':
        return 'Reconnecting...';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Connected';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border">
      <div className="flex items-center h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground leading-none">
                Disaster Alert
              </h1>
              <span className="text-xs text-muted-foreground font-medium">
                Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center ml-12 space-x-8">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-emergency group relative ${
                  isActive
                    ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                title={item?.tooltip}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-current'
                  }`}
                />
                <span>{item?.label}</span>
                {isActive && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center ml-auto space-x-4">
          {/* Connection Status */}
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-md border ${getConnectionStatusColor()}`}>
            <div className={`w-2 h-2 rounded-full ${getConnectionStatusColor()?.replace('border-', 'bg-')}`} />
            <span className="text-xs font-medium">
              {getConnectionStatusText()}
            </span>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-secondary-foreground">
                  EM
                </span>
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs text-foreground font-medium">
                  Emergency Manager
                </span>
                <span className="text-xs text-muted-foreground">
                  Operations Center
                </span>
              </div>
              <Icon 
                name="ChevronDown" 
                size={14} 
                className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-elevation-lg z-[1010]">
                <div className="p-3 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-secondary-foreground">
                        EM
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-popover-foreground">
                        Emergency Manager
                      </p>
                      <p className="text-xs text-muted-foreground">
                        operations@emergency.gov
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors">
                    <Icon name="User" size={16} className="mr-3" />
                    Profile Settings
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors">
                    <Icon name="Settings" size={16} className="mr-3" />
                    System Preferences
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors">
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help & Support
                  </button>
                  <div className="border-t border-border mt-2 pt-2">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors">
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;