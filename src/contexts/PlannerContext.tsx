import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { DEFAULT_PREFERENCES, DEFAULT_WEIGHTS } from '../data/defaultPreferences';
import { Module5Weights, PipelineResult, UserPreferences } from '../types/tourism';
import { rescore, runPipeline } from '../utils/pipeline';

export const MODULE_STEPS = [
{ key: 'decision', module: 'Module 4', title: 'Decision', path: '/decision' },
{ key: 'network', module: 'Module 3', title: 'Network', path: '/network' },
{ key: 'route', module: 'Module 1', title: 'Route', path: '/route' },
{ key: 'resources', module: 'Module 2', title: 'Resources', path: '/resources' },
{ key: 'optimization', module: 'Module 5', title: 'Optimization', path: '/optimization' }] as
const;

export type ModuleKey = (typeof MODULE_STEPS)[number]['key'];

interface PlannerState {
  preferences: UserPreferences;
  weights: Module5Weights;
  result: PipelineResult | null;
  isRunning: boolean;
  runStage: number;
  completed: ModuleKey[];
  activePlanId: string | null;
  setPreferences: (update: Partial<UserPreferences>) => void;
  setWeights: (weights: Module5Weights) => void;
  generate: (onDone?: () => void) => void;
  markCompleted: (key: ModuleKey) => void;
  setActivePlanId: (id: string) => void;
  reset: () => void;
}

const PlannerContext = createContext<PlannerState | null>(null);

export function PlannerProvider({ children }: {children: React.ReactNode;}) {
  const [preferences, setPreferencesState] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [weights, setWeightsState] = useState<Module5Weights>(DEFAULT_WEIGHTS);
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runStage, setRunStage] = useState(0);
  const [completed, setCompleted] = useState<ModuleKey[]>([]);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const setPreferences = useCallback((update: Partial<UserPreferences>) => {
    setPreferencesState((prev) => ({ ...prev, ...update }));
  }, []);

  const setWeights = useCallback((next: Module5Weights) => {
    setWeightsState(next);
    setResult((prev) => prev ? rescore(prev, next) : prev);
  }, []);

  const generate = useCallback(
    (onDone?: () => void) => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
      setIsRunning(true);
      setRunStage(1);
      setCompleted([]);

      const computed = runPipeline(preferences, weights);

      MODULE_STEPS.forEach((step, index) => {
        const timer = window.setTimeout(() => {
          setRunStage(index + 1);
        }, index * 380);
        timers.current.push(timer);
      });

      const finish = window.setTimeout(() => {
        setResult(computed);
        setActivePlanId(computed.recommendedPlanId ?? computed.plans[0]?.id ?? null);
        setCompleted(['decision']);
        setIsRunning(false);
        setRunStage(MODULE_STEPS.length);
        onDone?.();
      }, MODULE_STEPS.length * 380 + 220);
      timers.current.push(finish);
    },
    [preferences, weights]
  );

  const markCompleted = useCallback((key: ModuleKey) => {
    setCompleted((prev) => prev.includes(key) ? prev : [...prev, key]);
  }, []);

  const reset = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setResult(null);
    setCompleted([]);
    setActivePlanId(null);
    setRunStage(0);
    setIsRunning(false);
    setPreferencesState(DEFAULT_PREFERENCES);
    setWeightsState(DEFAULT_WEIGHTS);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      weights,
      result,
      isRunning,
      runStage,
      completed,
      activePlanId,
      setPreferences,
      setWeights,
      generate,
      markCompleted,
      setActivePlanId,
      reset
    }),
    [
    preferences,
    weights,
    result,
    isRunning,
    runStage,
    completed,
    activePlanId,
    setPreferences,
    setWeights,
    generate,
    markCompleted,
    reset]

  );

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner(): PlannerState {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error('usePlanner must be used inside PlannerProvider');
  return ctx;
}