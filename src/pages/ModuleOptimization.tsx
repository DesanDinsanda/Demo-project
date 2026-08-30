import React, { useEffect } from 'react';
import { TrophyIcon, XCircleIcon } from 'lucide-react';
import { usePlanner } from '../contexts/PlannerContext';
import { EmptyPipelineState } from '../components/EmptyPipelineState';
import { IOPanel, ModuleHeader, StepNav } from '../components/ModuleShell';
import { PipelineIssueNotice } from '../components/PipelineIssueNotice';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { TableWrap, TD, TH } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/Metrics';
import { RangeField } from '../components/ui/Fields';
import { Button } from '../components/ui/Button';
import { DEFAULT_WEIGHTS } from '../data/defaultPreferences';
import { formatHours, formatPct, formatRs } from '../utils/format';
import { normaliseWeights } from '../utils/module5Optimization';

export function ModuleOptimization() {
  const { result, weights, setWeights, markCompleted, preferences } = usePlanner();

  useEffect(() => {
    if (result) {
      ;(['decision', 'network', 'route', 'resources', 'optimization'] as const).forEach(
        markCompleted
      );
    }
  }, [result, markCompleted]);

  if (!result) return <EmptyPipelineState moduleName="Module 5 — Overall Optimization" />;

  const normalised = normaliseWeights(weights);
  const recommended = result.plans.find((p) => p.id === result.recommendedPlanId) ?? null;
  const excluded = result.plans.filter((p) => p.excluded);

  return (
    <div>
      <ModuleHeader
        moduleTag="MODULE 5"
        pipelinePosition="Stage 5 of 5 · final decision module"
        title="Overall Travel Optimization"
        purpose="Among all feasible candidate plans, which complete itinerary provides the best overall experience for this tourist? Module 5 reuses the outputs of Modules 4, 3, 1 and 2 — it never recomputes routes or costs."
        algorithms={['Multi-Criteria Decision Making', 'Weighted Sum Model', 'Min-max normalisation']} />
      

      {result.issue && !recommended ? <PipelineIssueNotice issue={result.issue} /> : null}

      <IOPanel
        input={[
        { label: 'From Module 4', value: `${result.plans.length} candidate plans` },
        { label: 'From Module 3', value: 'Connectivity per plan' },
        { label: 'From Module 1', value: 'Best route, distance, time, cost' },
        { label: 'From Module 2', value: 'Total cost & feasibility flags' },
        { label: 'From user', value: `${preferences.days}d · ${formatRs(preferences.budget)}` }]
        }
        processing={[
        'Remove every plan that failed a budget, duration or daily-travel constraint.',
        'Min-max normalise interest, budget efficiency (interest per rupee), travel time and day fit.',
        'Apply the configurable weighted sum model to produce an overall score per plan.',
        'Sort by overall score; the highest feasible score becomes the recommended plan.']
        }
        output={[
        {
          label: 'Plans scored',
          value: `${result.plans.length - excluded.length} of ${result.plans.length}`
        },
        { label: 'Excluded', value: `${excluded.length}` },
        { label: 'Recommended', value: recommended ? recommended.label : 'none' },
        {
          label: 'Overall score',
          value: recommended?.score ? formatPct(recommended.score.overallScore) : '—'
        }]
        }
        handoff="The winning TravelPlan object drives the final personalised itinerary page." />
      

      <div className="mt-6 grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card>
          <CardHeader
            eyebrow="MCDM WEIGHTS"
            title="Criteria weights"
            subtitle="Adjust to demonstrate how the decision changes. Weights are re-normalised to 100%." />
          
          <CardBody className="space-y-4">
            <RangeField
              id="w-interest"
              label="Interest satisfaction"
              value={weights.interest}
              min={0}
              max={1}
              step={0.05}
              display={formatPct(normalised.interest)}
              onChange={(interest) => setWeights({ ...weights, interest })} />
            
            <RangeField
              id="w-budget"
              label="Budget efficiency"
              value={weights.budget}
              min={0}
              max={1}
              step={0.05}
              display={formatPct(normalised.budget)}
              onChange={(budget) => setWeights({ ...weights, budget })} />
            
            <RangeField
              id="w-travel"
              label="Travel efficiency"
              value={weights.travel}
              min={0}
              max={1}
              step={0.05}
              display={formatPct(normalised.travel)}
              onChange={(travel) => setWeights({ ...weights, travel })} />
            
            <RangeField
              id="w-time"
              label="Time suitability"
              value={weights.time}
              min={0}
              max={1}
              step={0.05}
              display={formatPct(normalised.time)}
              onChange={(time) => setWeights({ ...weights, time })} />
            
            <Button variant="secondary" size="sm" onClick={() => setWeights(DEFAULT_WEIGHTS)}>
              Reset to 40 / 25 / 20 / 15
            </Button>
            <p className="rounded-xl bg-canvas p-3 font-mono text-[11px] leading-relaxed text-ink-muted">
              score = {normalised.interest.toFixed(2)}·interest +{' '}
              {normalised.budget.toFixed(2)}·budget + {normalised.travel.toFixed(2)}·travel +{' '}
              {normalised.time.toFixed(2)}·time
            </p>
          </CardBody>
        </Card>

        <div className="space-y-4">
          {recommended ?
          <Card className="border-forest-500 ring-1 ring-forest-500">
              <CardBody className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-mono text-[11px] text-forest-600">
                    <TrophyIcon className="h-3.5 w-3.5" aria-hidden /> RECOMMENDED PLAN
                  </p>
                  <h2 className="mt-1.5 text-xl font-semibold text-ink">
                    {recommended.label} · {recommended.strategy}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    {recommended.attractionIds.length} attractions ·{' '}
                    {formatRs(recommended.resources.totalCost)} ·{' '}
                    {formatHours(recommended.route.totalTravelHours)} travel ·{' '}
                    {recommended.resources.daysRequired} days
                  </p>
                </div>
                <div className="text-right">
                  <p className="tabular text-3xl font-semibold text-forest-700">
                    {recommended.score ? formatPct(recommended.score.overallScore) : '—'}
                  </p>
                  <p className="text-xs text-ink-muted">overall score</p>
                </div>
              </CardBody>
            </Card> :
          null}

          <Card>
            <CardHeader
              eyebrow="DECISION TABLE"
              title="Complete plan comparison"
              subtitle="Infeasible plans are excluded before scoring and can never be recommended." />
            
            <CardBody className="px-0 py-0">
              <TableWrap>
                <thead>
                  <tr>
                    <TH>Plan</TH>
                    <TH align="right">Interest</TH>
                    <TH align="right">Travel time</TH>
                    <TH align="right">Total cost</TH>
                    <TH align="center">Budget status</TH>
                    <TH align="right">Overall score</TH>
                  </tr>
                </thead>
                <tbody>
                  {result.plans.map((plan) =>
                  <tr
                    key={plan.id}
                    className={
                    plan.id === result.recommendedPlanId ?
                    'bg-forest-50/70' :
                    plan.excluded ?
                    'bg-alert-50/40' :
                    ''
                    }>
                    
                      <TD>
                        <span className="font-semibold text-ink">{plan.label}</span>
                        <span className="block text-xs text-ink-muted">{plan.rankNote}</span>
                      </TD>
                      <TD align="right" mono>
                        {plan.interestScore}%
                      </TD>
                      <TD align="right" mono>
                        {formatHours(plan.route.totalTravelHours)}
                      </TD>
                      <TD align="right" mono>
                        {formatRs(plan.resources.totalCost)}
                      </TD>
                      <TD align="center">
                        {plan.resources.budgetFeasible ?
                      <Badge tone="forest">Feasible</Badge> :

                      <Badge tone="alert">Over budget</Badge>
                      }
                      </TD>
                      <TD align="right">
                        {plan.excluded || !plan.score ?
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-alert-600">
                            <XCircleIcon className="h-3.5 w-3.5" aria-hidden /> Excluded
                          </span> :

                      <span className="flex items-center justify-end gap-2">
                            <span className="hidden w-20 sm:block">
                              <ProgressBar
                            value={plan.score.overallScore * 100}
                            height={6}
                            tone={plan.id === result.recommendedPlanId ? 'forest' : 'soft'}
                            label="overall score" />
                          
                            </span>
                            <span className="tabular font-semibold text-ink">
                              {formatPct(plan.score.overallScore)}
                            </span>
                          </span>
                      }
                      </TD>
                    </tr>
                  )}
                </tbody>
              </TableWrap>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              eyebrow="CRITERIA BREAKDOWN"
              title="Normalised criterion scores per feasible plan" />
            
            <CardBody className="px-0 py-0">
              <TableWrap>
                <thead>
                  <tr>
                    <TH>Plan</TH>
                    <TH align="right">Interest</TH>
                    <TH align="right">Budget eff.</TH>
                    <TH align="right">Travel eff.</TH>
                    <TH align="right">Time fit</TH>
                    <TH align="right">Weighted total</TH>
                  </tr>
                </thead>
                <tbody>
                  {result.plans.
                  filter((plan) => plan.score).
                  map((plan) =>
                  <tr key={plan.id}>
                        <TD>
                          <span className="font-medium text-ink">{plan.label}</span>
                        </TD>
                        <TD align="right" mono>
                          {formatPct(plan.score?.interestSatisfaction ?? 0)}
                        </TD>
                        <TD align="right" mono>
                          {formatPct(plan.score?.budgetEfficiency ?? 0)}
                        </TD>
                        <TD align="right" mono>
                          {formatPct(plan.score?.travelEfficiency ?? 0)}
                        </TD>
                        <TD align="right" mono>
                          {formatPct(plan.score?.timeSuitability ?? 0)}
                        </TD>
                        <TD align="right" mono className="font-semibold">
                          {formatPct(plan.score?.overallScore ?? 0)}
                        </TD>
                      </tr>
                  )}
                </tbody>
              </TableWrap>
            </CardBody>
          </Card>
        </div>
      </div>

      <StepNav
        backTo="/resources"
        backLabel="Back to Module 2"
        nextTo="/itinerary"
        nextLabel="View Final Itinerary"
        note="Next: the personalised plan the tourist actually receives." />
      
    </div>);

}