import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AlertPerformanceAnalyticsDashboard from './pages/alert-performance-analytics-dashboard';
import RealTimeCommandCenterDashboard from './pages/real-time-command-center-dashboard';
import SystemHealthInfrastructureMonitoringDashboard from './pages/system-health-infrastructure-monitoring-dashboard';
import ResourceAllocationResponseCoordinationDashboard from './pages/resource-allocation-response-coordination-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AlertPerformanceAnalyticsDashboard />} />
        <Route path="/alert-performance-analytics-dashboard" element={<AlertPerformanceAnalyticsDashboard />} />
        <Route path="/real-time-command-center-dashboard" element={<RealTimeCommandCenterDashboard />} />
        <Route path="/system-health-infrastructure-monitoring-dashboard" element={<SystemHealthInfrastructureMonitoringDashboard />} />
        <Route path="/resource-allocation-response-coordination-dashboard" element={<ResourceAllocationResponseCoordinationDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
