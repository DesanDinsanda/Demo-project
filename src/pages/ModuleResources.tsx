import React, { useEffect, useMemo } from 'react';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { usePlanner } from '../contexts/PlannerContext';
import { EmptyPipelineState } from '../components/EmptyPipelineState';
import { IOPanel, ModuleHeader, StepNav } from '../components/ModuleShell';
import { PlanSelector } from '../components/PlanSelector';
import { PipelineIssueNotice } from '../components/PipelineIssueNotice';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { TableWrap, TD, TH } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { ProgressBar, StatTile } from '../components/ui/Metrics';
import { formatHours, formatRs, formatRsShort } from '../utils/format';

const COST_KEYS = [
{ key: 'transportCost', label: 'Transport', tone: 'bg-forest-700' },
{ key: 'accommodationCost', label: 'Accommodation', tone: 'bg-forest-500' },
{ key: 'foodCost', label: 'Food', tone: 'bg-forest-300' },
{ key: 'activityCost', label: 'Activities', tone: 'bg-clay-500' },
{ key: 'emergencyReserve', label: 'Emergency reserve', tone: 'bg-ink-soft' }] as
const;

export function ModuleResources() {
  const { result, activePlanId, setActivePlanId, markCompleted, preferences } = usePlanner();

  useEffect(() => {
    if (result) {
      ;(['decision', 'network', 'route', 'resources'] as const).forEach(markCompleted);
    }
  }, [result, markCompleted]);

  const plan = useMemo(
    () => result?.plans.find((p) => p.id === activePlanId) ?? result?.plans[0] ?? null,
    [result, activePlanId]
  );

  if (!result || !plan) return <EmptyPipelineState moduleName="Module 2 — Resource Allocation" />;

  const r = plan.resources;
  const feasibleCount = result.plans.filter((p) => p.resources.feasible).length;

  return (
    <div>
      <ModuleHeader
        moduleTag="MODULE 2"
        pipelinePosition="Stage 4 of 5 · after Module 1"
        title="Intelligent Resource Allocation"
        purpose="Can each candidate trip be completed within the tourist’s available resources, and how should those resources be allocated? Costs are built from the optimised route, the itinerary day plan and the real activity prices of each attraction."
        algorithms={[
        'Constraint checking',
        'Day-packing under travel-time cap',
        'Dynamic Programming / 0-1 Knapsack']
        } />
      

      {result.issue && result.issue.kind !== 'interest' ?
      <PipelineIssueNotice issue={result.issue} /> :
      null}

      <IOPanel
        input={[
        { label: 'Budget', value: formatRs(preferences.budget) },
        { label: 'Trip duration', value: `${preferences.days} days` },
        { label: 'Emergency reserve', value: formatRs(preferences.emergencyReserve) },
        { label: 'Travel style', value: preferences.travelStyle },
        { label: 'Route transport cost', value: formatRs(r.transportCost) }]
        }
        processing={[
        'Pack the optimised route into calendar days, respecting the daily travel-time cap.',
        'Price lodging per night by district and travel style; price food per travelling day.',
        'Sum the real activity cost of every attraction in the plan (they are not identical).',
        'Spend leftover budget on optional experiences using a 0-1 knapsack DP table.',
        'Check Total Cost ≤ Budget and Planned days ≤ Trip duration.']
        }
        output={[
        { label: 'Feasible plans', value: `${feasibleCount} of ${result.plans.length}` },
        { label: 'This plan total', value: formatRs(r.totalCost) },
        { label: 'Remaining', value: formatRs(r.remainingBudget) },
        { label: 'Days required', value: `${r.daysRequired} of ${preferences.days}` }]
        }
        handoff="Complete costed plans with feasibility flags are passed to Module 5 for multi-criteria comparison." />
      

      <Card className="mt-6">
        <CardHeader
          eyebrow="COMPARISON"
          title="Resource allocation across all candidate plans"
          subtitle="Different destinations, routes and stop counts produce genuinely different cost profiles." />
        
        <CardBody className="px-0 py-0">
          <TableWrap>
            <thead>
              <tr>
                <TH>Plan</TH>
                <TH align="right">Transport</TH>
                <TH align="right">Activities</TH>
                <TH align="right">Accommodation</TH>
                <TH align="right">Food</TH>
                <TH align="right">Emergency</TH>
                <TH align="right">Total</TH>
                <TH align="right">Remaining</TH>
                <TH align="center">Feasible</TH>
              </tr>
            </thead>
            <tbody>
              {result.plans.map((row) => {
                const res = row.resources;
                return (
                  <tr
                    key={row.id}
                    className={`cursor-pointer hover:bg-canvas ${
                    row.id === plan.id ? 'bg-forest-50/60' : ''}`
                    }
                    onClick={() => setActivePlanId(row.id)}>
                    
                    <TD>
                      <span className="font-semibold text-ink">{row.label}</span>
                      <span className="block text-xs text-ink-muted">
                        {res.daysRequired} days · {res.accommodationNights} nights
                      </span>
                    </TD>
                    <TD align="right" mono>
                      {formatRsShort(res.transportCost)}
                    </TD>
                    <TD align="right" mono>
                      {formatRsShort(res.activityCost)}
                    </TD>
                    <TD align="right" mono>
                      {formatRsShort(res.accommodationCost)}
                    </TD>
                    <TD align="right" mono>
                      {formatRsShort(res.foodCost)}
                    </TD>
                    <TD align="right" mono>
                      {formatRsShort(res.emergencyReserve)}
                    </TD>
                    <TD align="right" mono className="font-semibold">
                      {formatRs(res.totalCost)}
                    </TD>
                    <TD
                      align="right"
                      mono
                      className={res.remainingBudget >= 0 ? 'text-forest-700' : 'text-alert-600'}>
                      
                      {formatRs(res.remainingBudget)}
                    </TD>
                    <TD align="center">
                      {res.feasible ?
                      <Badge tone="forest">
                          <CheckCircle2Icon className="h-3 w-3" aria-hidden /> Yes
                        </Badge> :

                      <Badge tone="alert">
                          <XCircleIcon className="h-3 w-3" aria-hidden /> No
                        </Badge>
                      }
                    </TD>
                  </tr>);

              })}
            </tbody>
          </TableWrap>
        </CardBody>
      </Card>

      <div className="mt-6">
        <PlanSelector
          plans={result.plans}
          activePlanId={plan.id}
          onSelect={setActivePlanId}
          label="Inspect resource allocation for a plan" />
        
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader
            eyebrow={`${plan.label} ALLOCATION`}
            title="ResourceAllocation object"
            right={
            r.feasible ?
            <Badge tone="forest">FEASIBLE</Badge> :

            <Badge tone="alert">NOT FEASIBLE</Badge>

            } />
          
          <CardBody className="space-y-4">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-canvas">
              {COST_KEYS.map((item) =>
              <span
                key={item.key}
                className={item.tone}
                style={{ width: `${(r[item.key] as number) / Math.max(r.totalCost, 1) * 100}%` }}
                title={`${item.label}: ${formatRs(r[item.key] as number)}`} />

              )}
            </div>
            <dl className="space-y-2 text-sm">
              {COST_KEYS.map((item) =>
              <div key={item.key} className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-ink-muted">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} aria-hidden />
                    {item.label}
                    {item.key === 'accommodationCost' ?
                  <span className="text-xs text-ink-soft">
                        ({r.accommodationNights} nights)
                      </span> :
                  null}
                    {item.key === 'activityCost' && r.optionalActivityCost > 0 ?
                  <span className="text-xs text-ink-soft">
                        (incl. {formatRs(r.optionalActivityCost)} optional)
                      </span> :
                  null}
                  </dt>
                  <dd className="tabular font-semibold text-ink">
                    {formatRs(r[item.key] as number)}
                  </dd>
                </div>
              )}
              <div className="flex items-center justify-between gap-3 border-t border-line pt-2">
                <dt className="font-semibold text-ink">Total trip cost</dt>
                <dd className="tabular text-lg font-semibold text-ink">{formatRs(r.totalCost)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-muted">Budget</dt>
                <dd className="tabular font-medium text-ink">{formatRs(preferences.budget)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-muted">Remaining budget</dt>
                <dd
                  className={`tabular font-semibold ${
                  r.remainingBudget >= 0 ? 'text-forest-700' : 'text-alert-600'}`
                  }>
                  
                  {formatRs(r.remainingBudget)}
                </dd>
              </div>
            </dl>

            <div className="space-y-2">
              <ConstraintRow
                label={`Total cost ≤ ${formatRs(preferences.budget)}`}
                ok={r.budgetFeasible}
                value={`${Math.round(r.totalCost / preferences.budget * 100)}% of budget used`}
                ratio={r.totalCost / preferences.budget * 100} />
              
              <ConstraintRow
                label={`Planned days ≤ ${preferences.days}`}
                ok={r.timeFeasible}
                value={`${r.daysRequired} days required`}
                ratio={r.daysRequired / preferences.days * 100} />
              
              <ConstraintRow
                label={`Daily transfers ≤ ${preferences.maxDailyTravelHours}h`}
                ok={r.dailyTravelFeasible}
                value={`peak ${formatHours(r.peakDailyTravelHours)}`}
                ratio={r.peakDailyTravelHours / preferences.maxDailyTravelHours * 100} />
              
            </div>

            <ul className="space-y-1.5">
              {r.notes.map((note) =>
              <li key={note} className="text-xs text-ink-muted">
                  • {note}
                </li>
              )}
            </ul>
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader
              eyebrow="DYNAMIC PROGRAMMING"
              title="Optional activity allocation (0-1 knapsack)"
              subtitle={`Capacity = unused budget after committed costs: ${formatRs(
                r.knapsack.capacity
              )}`} />
            
            <CardBody className="px-0 py-0">
              <TableWrap>
                <thead>
                  <tr>
                    <TH>Optional experience</TH>
                    <TH>City</TH>
                    <TH align="right">Cost</TH>
                    <TH align="right">Value</TH>
                    <TH align="center">Selected</TH>
                  </tr>
                </thead>
                <tbody>
                  {r.knapsack.considered.length === 0 ?
                  <tr>
                      <TD className="text-ink-muted">
                        No optional experiences available for these destinations.
                      </TD>
                      <TD>—</TD>
                      <TD align="right">—</TD>
                      <TD align="right">—</TD>
                      <TD align="center">—</TD>
                    </tr> :

                  r.knapsack.considered.map((item) => {
                    const selected = r.knapsack.selected.some((s) => s.id === item.id);
                    return (
                      <tr key={item.id} className={selected ? 'bg-forest-50/60' : ''}>
                          <TD>{item.name}</TD>
                          <TD className="text-ink-muted">{item.city}</TD>
                          <TD align="right" mono>
                            {formatRs(item.cost)}
                          </TD>
                          <TD align="right" mono>
                            {item.value.toFixed(1)}
                          </TD>
                          <TD align="center">
                            {selected ?
                          <Badge tone="forest">In plan</Badge> :

                          <span className="text-xs text-ink-soft">Skipped</span>
                          }
                          </TD>
                        </tr>);

                  })
                  }
                </tbody>
              </TableWrap>
            </CardBody>
          </Card>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile label="DP value" value={r.knapsack.totalValue.toFixed(1)} hint="Selected optional value" />
            <StatTile label="DP spend" value={formatRsShort(r.knapsack.totalCost)} />
            <StatTile label="Nights" value={r.accommodationNights} />
            <StatTile
              label="Days used"
              value={`${r.daysRequired}/${preferences.days}`}
              tone={r.timeFeasible ? 'default' : 'alert'} />
            
          </div>
        </div>
      </div>

      <StepNav
        backTo="/route"
        backLabel="Back to Module 1"
        nextTo="/optimization"
        nextLabel="Continue to Overall Optimization"
        note="Next: Module 5 excludes infeasible plans and ranks the rest." />
      
    </div>);

}

function ConstraintRow({
  label,
  ok,
  value,
  ratio





}: {label: string;ok: boolean;value: string;ratio: number;}) {
  return (
    <div className="rounded-xl border border-line p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
          {ok ?
          <CheckCircle2Icon className="h-4 w-4 text-forest-600" aria-hidden /> :

          <XCircleIcon className="h-4 w-4 text-alert-500" aria-hidden />
          }
          {label}
        </p>
        <p className="tabular text-xs text-ink-muted">{value}</p>
      </div>
      <div className="mt-2">
        <ProgressBar
          value={Math.min(ratio, 100)}
          tone={ok ? 'forest' : 'alert'}
          height={6}
          label={label} />
        
      </div>
    </div>);

}