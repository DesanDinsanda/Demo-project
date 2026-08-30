import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BuildingIcon,
  CompassIcon,
  LandmarkIcon,
  LeafIcon,
  MountainSnowIcon,
  PawPrintIcon,
  SparklesIcon,
  UmbrellaIcon,
  UtensilsIcon,
  ShoppingBagIcon,
  ScrollTextIcon } from
'lucide-react';
import { HUBS } from '../data/attractions';
import {
  CoreInterestKey,
  InterestLevel,
  OptionalInterestKey,
  TransportMode,
  TravelStyle } from
'../types/tourism';
import { usePlanner, MODULE_STEPS } from '../contexts/PlannerContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import {
  NumberField,
  RangeField,
  SegmentedControl,
  SelectField,
  ToggleChip } from
'../components/ui/Fields';
import { Button } from '../components/ui/Button';
import { formatRs } from '../utils/format';
import { Badge } from '../components/ui/Badge';

const CORE_INTERESTS: {key: CoreInterestKey;label: string;icon: React.ReactNode;}[] = [
{ key: 'nature', label: 'Nature', icon: <LeafIcon className="h-4 w-4" aria-hidden /> },
{ key: 'wildlife', label: 'Wildlife', icon: <PawPrintIcon className="h-4 w-4" aria-hidden /> },
{ key: 'culture', label: 'Culture', icon: <LandmarkIcon className="h-4 w-4" aria-hidden /> },
{
  key: 'adventure',
  label: 'Adventure',
  icon: <MountainSnowIcon className="h-4 w-4" aria-hidden />
}];


const OPTIONAL_INTERESTS: {
  key: OptionalInterestKey;
  label: string;
  icon: React.ReactNode;
}[] = [
{ key: 'beach', label: 'Beach', icon: <UmbrellaIcon className="h-3.5 w-3.5" aria-hidden /> },
{ key: 'food', label: 'Food', icon: <UtensilsIcon className="h-3.5 w-3.5" aria-hidden /> },
{
  key: 'shopping',
  label: 'Shopping',
  icon: <ShoppingBagIcon className="h-3.5 w-3.5" aria-hidden />
},
{ key: 'history', label: 'History', icon: <ScrollTextIcon className="h-3.5 w-3.5" aria-hidden /> },
{
  key: 'religious',
  label: 'Religious sites',
  icon: <BuildingIcon className="h-3.5 w-3.5" aria-hidden />
}];


const LEVELS: {value: InterestLevel;label: string;}[] = [
{ value: 'Low', label: 'Low' },
{ value: 'Medium', label: 'Medium' },
{ value: 'High', label: 'High' }];


export function Planner() {
  const { preferences, setPreferences, generate, isRunning, runStage } = usePlanner();
  const navigate = useNavigate();
  const [touched, setTouched] = useState(false);

  const hubOptions = HUBS.map((hub) => ({ value: hub.id, label: `${hub.name} — ${hub.city}` }));

  const onGenerate = () => {
    setTouched(true);
    generate(() => navigate('/decision'));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        <header className="mb-6">
          <Badge tone="forest" mono>
            STEP 0 · USER INPUT
          </Badge>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Trip Planner
          </h1>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            Everything the five modules consume comes from this form. Change any value and re-run the
            pipeline to see different candidate plans, routes, costs and the final recommendation.
          </p>
        </header>

        <div className="space-y-5">
          <Card as="section">
            <CardHeader
              eyebrow="SECTION A"
              title="Trip details"
              subtitle="Duration, budget and the fixed start / end points of the journey." />
            
            <CardBody className="grid gap-4 sm:grid-cols-2">
              <NumberField
                id="days"
                label="Trip duration"
                value={preferences.days}
                min={2}
                max={21}
                suffix="days"
                onChange={(days) => setPreferences({ days })} />
              
              <NumberField
                id="budget"
                label="Total budget"
                value={preferences.budget}
                min={30000}
                max={1000000}
                step={5000}
                prefix="Rs."
                onChange={(budget) => setPreferences({ budget })} />
              
              <SelectField
                id="start"
                label="Starting location"
                value={preferences.startHubId}
                options={hubOptions}
                onChange={(startHubId) => setPreferences({ startHubId })} />
              
              <SelectField
                id="end"
                label="Ending location"
                value={preferences.endHubId}
                options={hubOptions}
                onChange={(endHubId) => setPreferences({ endHubId })} />
              
              <SegmentedControl<TravelStyle>
                label="Travel style"
                hint="Drives accommodation and food rates in Module 2."
                value={preferences.travelStyle}
                options={[
                { value: 'Budget', label: 'Budget' },
                { value: 'Balanced', label: 'Balanced' },
                { value: 'Comfort', label: 'Comfort' }]
                }
                onChange={(travelStyle) => setPreferences({ travelStyle })} />
              
              <SelectField<TransportMode>
                id="transport"
                label="Preferred transportation"
                hint="Sets edge speed and cost per km in the tourism network."
                value={preferences.transport}
                options={[
                { value: 'Train + Bus', label: 'Train + Bus' },
                { value: 'Bus Only', label: 'Intercity Bus only' },
                { value: 'Train + Car', label: 'Train + Car' },
                { value: 'Private Car', label: 'Private Car' }]
                }
                onChange={(transport) => setPreferences({ transport })} />
              
            </CardBody>
          </Card>

          <Card as="section">
            <CardHeader
              eyebrow="SECTION B"
              title="Interests"
              subtitle="Core interests become the weights of the Module 4 weighted-sum scoring model." />
            
            <CardBody className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {CORE_INTERESTS.map((interest) =>
                <div key={interest.key} className="rounded-xl border border-line p-3">
                    <p className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
                      <span className="text-forest-600">{interest.icon}</span>
                      {interest.label}
                    </p>
                    <SegmentedControl<InterestLevel>
                    label={`${interest.label} level`}
                    value={preferences.interests[interest.key]}
                    options={LEVELS}
                    onChange={(level) =>
                    setPreferences({
                      interests: { ...preferences.interests, [interest.key]: level }
                    })
                    } />
                  
                  </div>
                )}
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-ink">Optional preferences</p>
                <div className="flex flex-wrap gap-2">
                  {OPTIONAL_INTERESTS.map((option) =>
                  <ToggleChip
                    key={option.key}
                    label={option.label}
                    icon={option.icon}
                    active={preferences.optionalInterests.includes(option.key)}
                    onClick={() =>
                    setPreferences({
                      optionalInterests: preferences.optionalInterests.includes(option.key) ?
                      preferences.optionalInterests.filter((k) => k !== option.key) :
                      [...preferences.optionalInterests, option.key]
                    })
                    } />

                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          <Card as="section">
            <CardHeader
              eyebrow="SECTION C"
              title="Constraints"
              subtitle="Hard limits checked by Module 2 before a plan can reach the final decision." />
            
            <CardBody className="grid gap-4 sm:grid-cols-2">
              <RangeField
                id="maxTravel"
                label="Maximum daily travel time"
                value={preferences.maxDailyTravelHours}
                min={2}
                max={10}
                step={0.5}
                display={`${preferences.maxDailyTravelHours}h / day`}
                onChange={(maxDailyTravelHours) => setPreferences({ maxDailyTravelHours })} />
              
              <RangeField
                id="maxDest"
                label="Maximum number of destinations"
                value={preferences.maxDestinations}
                min={3}
                max={8}
                display={`${preferences.maxDestinations} sites`}
                onChange={(maxDestinations) => setPreferences({ maxDestinations })} />
              
              <NumberField
                id="reserve"
                label="Minimum emergency reserve"
                hint="Held back from all spending."
                value={preferences.emergencyReserve}
                min={0}
                max={100000}
                step={1000}
                prefix="Rs."
                onChange={(emergencyReserve) => setPreferences({ emergencyReserve })} />
              
              <div className="rounded-xl border border-line bg-canvas p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                  Constraint summary
                </p>
                <ul className="mt-1.5 space-y-1 text-sm text-ink-muted">
                  <li className="tabular">
                    Total cost ≤ {formatRs(preferences.budget)} incl.{' '}
                    {formatRs(preferences.emergencyReserve)} reserve
                  </li>
                  <li className="tabular">Planned days ≤ {preferences.days}</li>
                  <li className="tabular">
                    Transfers ≤ {preferences.maxDailyTravelHours}h per day
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Card>
          <CardHeader
            eyebrow="TOURIST PROFILE"
            title={`${preferences.name} · ${preferences.country}`}
            subtitle="Preferences currently loaded into the pipeline." />
          
          <CardBody className="space-y-4">
            <dl className="space-y-2 text-sm">
              {[
              ['Duration', `${preferences.days} days`],
              ['Budget', formatRs(preferences.budget)],
              ['Style', preferences.travelStyle],
              ['Transport', preferences.transport],
              [
              'Interests',
              CORE_INTERESTS.filter((i) => preferences.interests[i.key] !== 'Low').
              map((i) => `${i.label} ${preferences.interests[i.key]}`).
              join(', ') || 'None selected']].

              map(([label, value]) =>
              <div key={label} className="flex justify-between gap-3">
                  <dt className="text-ink-muted">{label}</dt>
                  <dd className="text-right font-medium text-ink">{value}</dd>
                </div>
              )}
            </dl>

            <Button onClick={onGenerate} size="lg" className="w-full" disabled={isRunning}>
              <SparklesIcon className="h-4 w-4" aria-hidden />
              {isRunning ? 'Running pipeline…' : 'Generate Smart Travel Plans'}
            </Button>

            <ol className="space-y-2" aria-live="polite">
              {MODULE_STEPS.map((step, index) => {
                const stepNumber = index + 1;
                const active = isRunning && runStage === stepNumber;
                const done = touched && (!isRunning || runStage > stepNumber);
                return (
                  <li
                    key={step.key}
                    className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors duration-200 ease-out ${
                    active ?
                    'border-forest-300 bg-forest-50 text-forest-700' :
                    done ?
                    'border-line bg-surface text-ink' :
                    'border-line bg-surface text-ink-soft'}`
                    }>
                    
                    <span className="font-mono text-[10px]">
                      Step {stepNumber}/{MODULE_STEPS.length}
                    </span>
                    <span className="font-medium">{step.title}</span>
                    <span className="ml-auto font-mono text-[10px] text-ink-soft">
                      {step.module}
                    </span>
                  </li>);

              })}
            </ol>

            <p className="flex items-start gap-1.5 text-xs text-ink-muted">
              <CompassIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-500" aria-hidden />
              Execution order is fixed: Module 4 → Module 3 → Module 1 → Module 2 → Module 5.
            </p>
          </CardBody>
        </Card>
      </aside>
    </div>);

}