import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PlannerProvider } from './contexts/PlannerContext';
import { AppShell } from './components/AppShell';
import { Home } from './pages/Home';
import { Planner } from './pages/Planner';
import { ModuleDecision } from './pages/ModuleDecision';
import { ModuleNetwork } from './pages/ModuleNetwork';
import { ModuleRoute } from './pages/ModuleRoute';
import { ModuleResources } from './pages/ModuleResources';
import { ModuleOptimization } from './pages/ModuleOptimization';
import { FinalItinerary } from './pages/FinalItinerary';
import { ComparePlans } from './pages/ComparePlans';
import { Dashboard } from './pages/Dashboard';
import { SystemInfo } from './pages/SystemInfo';

export function App() {
  return (
    <BrowserRouter>
      <PlannerProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/decision" element={<ModuleDecision />} />
            <Route path="/network" element={<ModuleNetwork />} />
            <Route path="/route" element={<ModuleRoute />} />
            <Route path="/resources" element={<ModuleResources />} />
            <Route path="/optimization" element={<ModuleOptimization />} />
            <Route path="/itinerary" element={<FinalItinerary />} />
            <Route path="/compare" element={<ComparePlans />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/system" element={<SystemInfo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </PlannerProvider>
    </BrowserRouter>);

}