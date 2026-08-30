import React, { useEffect } from 'react';
import {
  BedIcon,
  CheckCircle2Icon,
  ClockIcon,
  CoinsIcon,
  MapIcon,
  SparklesIcon,
  WalletIcon } from
'lucide-react';
import { usePlanner } from '../contexts/PlannerContext';
import { EmptyPipelineState } from '../components/EmptyPipelineState';
import { PipelineIssueNotice } from '../components/PipelineIssueNotice';
import { RouteTimeline } from '../components/RouteTimeline';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ScoreRing } from '../components/ui/ScoreRing';
import { ProgressBar, StatTile } from '../components/ui/Metrics';
import { ButtonLink } from '../components/ui/Button';
import { getPoint } from '../data/attractions';
import { formatHours, formatPct, formatRs } from '../utils/format';

export function FinalItinerary() {
  const { result, preferences, markCompleted } = usePlanner();

  useEffect(() => {
    if (result) {
      ;(['decision', 'network', 'route', 'resources', 'optimization'] as const).forEach(
        markCompleted
      );
    }
  }, [result, markCompleted]);

  if (!result) return <EmptyPipelineState moduleName="Final itinerary" />;

  const plan = result.plans.find((p) => p.id === result.recommendedPlanId) ?? null;

  if (!plan) {
    return (
      <div>
        {result.issue ? <PipelineIssueNotice issue={result.issue} /> : null}
        <Card>
          <CardBody className="text-sm text-ink-muted">
            No feasible plan can be recommended, so no final itinerary is shown. Adjust the budget,
            duration or destination limit and re-run the pipeline.
          </CardBody>
        </Card>
      </div>);

  }

  const r = plan.resources;
  const overall = plan.score ? plan.score.overallScore * 100 : 0;

  const whyReasons = [
  'Highest overall score among all feasible plans',
  ...plan.matchReasons.slice(0, 3),
  `Within the ${formatRs(preferences.budget)} budget with ${formatRs(r.remainingBudget)} unspent`,
  `Fits the ${preferences.days}-day trip (needs ${r.daysRequired} days)`,
  `Efficient ${plan.route.method.toLowerCase()} route of ${Math.round(
    plan.route.totalDistanceKm
  )} km`,
  `Peak transfer of ${formatHours(r.peakDailyTravelHours)} stays under the ${
  preferences.maxDailyTravelHours}h daily limit`];



  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-forest-200 bg-surface p-6 shadow-card sm:p-8">
        <Badge tone="forest" mono>
          FINAL PERSONALISED TRAVEL PLAN · {plan.label}
        </Badge>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Your Optimized Sri Lanka Journey
            </h1>
            <p className="mt-2 text-base text-ink-muted">
              {preferences.name} from {preferences.country} · {preferences.days} days ·{' '}
              {plan.attractionIds.length} attractions · {preferences.transport} ·{' '}
              {preferences.travelStyle} style
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="forest">
                <CheckCircle2Icon className="h-3 w-3" aria-hidden /> Within budget
              </Badge>
              <Badge tone="forest">
                <CheckCircle2Icon className="h-3 w-3" aria-hidden /> Fits trip duration
              </Badge>
              <Badge tone="forest">
                <CheckCircle2Icon className="h-3 w-3" aria-hidden />
                {plan.interestScore >= 85 ?
                'Excellent interest match' :
                plan.interestScore >= 70 ?
                'Strong interest match' :
                'Acceptable interest match'}
              </Badge>
            </div>
          </div>
          <div className="flex gap-6">
            <ScoreRing value={overall} size={104} label="Overall match" />
            <ScoreRing
              value={plan.interestScore}
              size={104}
              tone="clay"
              label="Interest match" />
            
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label="Budget"
            value={formatRs(preferences.budget)}
            icon={<WalletIcon className="h-3.5 w-3.5" aria-hidden />} />
          
          <StatTile
            label="Estimated trip cost"
            value={formatRs(r.totalCost)}
            hint={`${Math.round(r.totalCost / preferences.budget * 100)}% of budget`}
            icon={<CoinsIcon className="h-3.5 w-3.5" aria-hidden />}
            tone="accent" />
          
          <StatTile
            label="Remaining budget"
            value={formatRs(r.remainingBudget)}
            hint={`incl. ${formatRs(r.emergencyReserve)} reserve held`} />
          
          <StatTile
            label="Total travel time"
            value={formatHours(plan.route.totalTravelHours)}
            hint={`${Math.round(plan.route.totalDistanceKm)} km across ${plan.route.legs.length} transfers`}
            icon={<ClockIcon className="h-3.5 w-3.5" aria-hidden />} />
          
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="space-y-4">
          <Card>
            <CardHeader
              eyebrow="FINAL ROUTE"
              title="Visiting order"
              right={
              <Badge tone="neutral" mono>
                  <MapIcon className="h-3 w-3" aria-hidden /> {plan.route.legs.length} legs
                </Badge>
              } />
            
            <CardBody>
              <RouteTimeline order={plan.route.order} legs={plan.route.legs} compact />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              eyebrow="WHY THIS PLAN?"
              title="Decision rationale"
              subtitle="Produced by Module 5 from the outputs of every previous module." />
            
            <CardBody>
              <ul className="space-y-2">
                {whyReasons.map((reason) =>
                <li key={reason} className="flex gap-2 text-sm text-ink-muted">
                    <CheckCircle2Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
                    aria-hidden />
                  
                    <span>{reason}</span>
                  </li>
                )}
              </ul>
              {plan.score ?
              <dl className="mt-4 space-y-2.5 border-t border-line pt-4">
                  {[
                ['Interest satisfaction', plan.score.interestSatisfaction],
                ['Budget efficiency', plan.score.budgetEfficiency],
                ['Travel efficiency', plan.score.travelEfficiency],
                ['Time suitability', plan.score.timeSuitability]].
                map(([label, value]) =>
                <div key={label as string}>
                      <div className="mb-1 flex items-baseline justify-between gap-3">
                        <dt className="text-xs font-medium text-ink-muted">{label}</dt>
                        <dd className="tabular text-xs font-semibold text-ink">
                          {formatPct(value as number)}
                        </dd>
                      </div>
                      <ProgressBar value={(value as number) * 100} height={6} label={label as string} />
                    </div>
                )}
                </dl> :
              null}
            </CardBody>
          </Card>

          {r.knapsack.selected.length ?
          <Card>
              <CardHeader
              eyebrow="OPTIONAL EXTRAS"
              title="Added from unused budget"
              subtitle="Selected by the Module 2 knapsack allocation." />
            
              <CardBody>
                <ul className="space-y-2">
                  {r.knapsack.selected.map((item) =>
                <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
                      <span>
                        <span className="block font-medium text-ink">{item.name}</span>
                        <span className="block text-xs text-ink-muted">{item.city}</span>
                      </span>
                      <span className="tabular shrink-0 font-medium text-ink-muted">
                        {formatRs(item.cost)}
                      </span>
                    </li>
                )}
                </ul>
              </CardBody>
            </Card> :
          null}
        </div>

        <Card>
          <CardHeader
            eyebrow="DAY BY DAY"
            title="Daily itinerary"
            subtitle="Costs, travel time, accommodation and the running budget for each day."
            right={
            <Badge tone="neutral" mono>
                {plan.days.length} days planned
              </Badge>
            } />
          
          <CardBody className="space-y-3">
            {plan.days.map((day) =>
            <article key={day.day} className="rounded-xl border border-line p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] text-forest-500">DAY {day.day}</p>
                    <h3 className="mt-0.5 text-sm font-semibold text-ink">
                      {day.fromId && day.fromId !== day.toId ?
                    `${getPoint(day.fromId).city} → ${getPoint(day.toId).city}` :
                    getPoint(day.toId).city}
                    </h3>
                    <p className="text-xs text-ink-muted">{day.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="tabular text-sm font-semibold text-ink">
                      {formatRs(day.dayCost)}
                    </p>
                    <p className="tabular text-xs text-ink-muted">
                      remaining {formatRs(day.remainingBudget)}
                    </p>
                  </div>
                </div>

                {day.activities.length ?
              <ul className="mt-3 space-y-1.5">
                    {day.activities.map((activity) =>
                <li
                  key={activity.name}
                  className="flex items-start justify-between gap-3 text-sm">
                  
                        <span className="flex items-start gap-1.5">
                          <SparklesIcon
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay-500"
                      aria-hidden />
                    
                          <span className="text-ink">{activity.name}</span>
                        </span>
                        <span className="tabular shrink-0 text-xs text-ink-muted">
                          {formatHours(activity.hours)} · {formatRs(activity.cost)}
                        </span>
                      </li>
                )}
                  </ul> :

              <p className="mt-3 text-sm text-ink-muted">
                    No scheduled attraction — rest, local exploration or buffer for delays.
                  </p>
              }

                <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-line pt-3 text-xs text-ink-muted">
                  <div className="flex items-center gap-1.5">
                    <ClockIcon className="h-3.5 w-3.5" aria-hidden />
                    <dt className="sr-only">Travel</dt>
                    <dd className="tabular">
                      {day.travelHours > 0 ?
                    `${formatHours(day.travelHours)} · ${day.transport}` :
                    'No transfer'}
                    </dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CoinsIcon className="h-3.5 w-3.5" aria-hidden />
                    <dt className="sr-only">Travel cost</dt>
                    <dd className="tabular">{formatRs(day.travelCost)} transport</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BedIcon className="h-3.5 w-3.5" aria-hidden />
                    <dt className="sr-only">Accommodation</dt>
                    <dd className="tabular">
                      {day.accommodation ?
                    `${formatRs(day.accommodationCost)} · ${day.accommodation}` :
                    'Departure day — no stay'}
                    </dd>
                  </div>
                </dl>
              </article>
            )}
          </CardBody>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <ButtonLink to="/compare" variant="secondary">
          Compare all candidate plans
        </ButtonLink>
        <ButtonLink to="/dashboard" variant="secondary">
          Open dashboard
        </ButtonLink>
        <ButtonLink to="/planner">Plan another trip</ButtonLink>
      </div>
    </div>);

}