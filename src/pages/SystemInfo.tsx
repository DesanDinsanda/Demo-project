import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { ATTRACTIONS } from '../data/attractions';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TableWrap, TD, TH } from '../components/ui/Table';
import { ButtonLink } from '../components/ui/Button';
import { formatRs } from '../utils/format';

const MODULE_ROLES = [
{
  tag: 'Module 4',
  order: 'Stage 1',
  statement: 'Decides WHAT destinations are suitable.',
  detail:
  'Weights the tourist’s interests, scores every attraction, ranks with a priority queue and assembles several distinct candidate destination plans of exact attractions.'
},
{
  tag: 'Module 3',
  order: 'Stage 2',
  statement: 'Analyzes HOW those destinations are connected.',
  detail:
  'Builds one weighted graph per candidate plan with distance, travel time, transport type and cost on every edge, then measures connectivity.'
},
{
  tag: 'Module 1',
  order: 'Stage 3',
  statement: 'Finds the BEST ROUTE for each candidate plan.',
  detail:
  'Runs Dijkstra over the adjacency list and applies a TSP-style Nearest Neighbour + 2-opt search inside each plan. It never compares plans.'
},
{
  tag: 'Module 2',
  order: 'Stage 4',
  statement: 'Checks HOW resources and budget can be allocated.',
  detail:
  'Packs the route into days, prices transport, lodging, food and activities, holds the emergency reserve and tests every hard constraint.'
},
{
  tag: 'Module 5',
  order: 'Stage 5',
  statement: 'Selects the BEST COMPLETE PLAN.',
  detail:
  'Excludes infeasible plans, normalises the criteria and applies a configurable weighted sum model to rank complete itineraries.'
}];


const ALGORITHMS = [
{ tag: 'Module 4', items: ['Weighted Sum Model', 'Weighted recommendation scoring', 'Priority Queue ranking'] },
{
  tag: 'Module 3',
  items: ['Weighted Graph', 'Adjacency List', 'BFS / DFS', 'Node-degree connectivity analysis', 'Union-Find connectivity repair']
},
{ tag: 'Module 1', items: ['Dijkstra shortest path', 'TSP-style optimisation', 'Nearest Neighbour', '2-opt improvement'] },
{ tag: 'Module 2', items: ['Constraint checking', 'Dynamic Programming / 0-1 Knapsack', 'Day packing under time cap'] },
{ tag: 'Module 5', items: ['Multi-Criteria Decision Making', 'Weighted Sum Model', 'Min-max normalisation'] }];


const DATA_STRUCTURES = [
['Attraction', 'Object / Record with interest scores, cost, duration, popularity, coordinates'],
['Candidate plans', 'Array / List of CandidatePlan objects'],
['Tourism network', 'Weighted graph stored as an adjacency list'],
['Shortest path', 'Binary-heap Priority Queue driving Dijkstra'],
['Routes', 'Route arrays with totals (distance, time, cost)'],
['Resource allocation', 'ResourceAllocation object + DP table for optional activities'],
['Final plans', 'TravelPlan objects in candidatePlans[], sorted by overallScore']];


const FLOW = [
'User Input',
'Module 4 — Decision',
'Module 3 — Network',
'Module 1 — Route',
'Module 2 — Resources',
'Module 5 — Optimization',
'Final Travel Plan'];


export function SystemInfo() {
  return (
    <div className="space-y-8">
      <header>
        <Badge tone="forest" mono>
          SYSTEM EXPLANATION
        </Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          How the decision system works
        </h1>
        <p className="mt-2 max-w-3xl text-base text-ink-muted">
          The five modules run in a fixed order, each consuming only the previous module’s output.
          This page documents the responsibilities, algorithms, data structures and tourism data
          behind the prototype.
        </p>
      </header>

      <section aria-labelledby="flow-heading">
        <h2 id="flow-heading" className="text-lg font-semibold text-ink">
          Execution flow
        </h2>
        <ol className="mt-4 flex flex-wrap items-center gap-2">
          {FLOW.map((stage, index) =>
          <li key={stage} className="flex items-center gap-2">
              <span
              className={`rounded-xl border px-3.5 py-2 text-sm font-medium ${
              index === 0 ?
              'border-clay-300 bg-clay-50 text-clay-600' :
              index === FLOW.length - 1 ?
              'border-forest-500 bg-forest-700 text-white' :
              'border-line bg-surface text-ink'}`
              }>
              
                {stage}
              </span>
              {index < FLOW.length - 1 ?
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-ink-soft" aria-hidden /> :
            null}
            </li>
          )}
        </ol>
      </section>

      <section aria-labelledby="roles-heading">
        <h2 id="roles-heading" className="text-lg font-semibold text-ink">
          Module responsibilities
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MODULE_ROLES.map((role) =>
          <Card as="li" key={role.tag}>
              <CardBody>
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="forest" mono>
                    {role.tag}
                  </Badge>
                  <span className="font-mono text-[10px] text-ink-soft">{role.order}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-ink">{role.statement}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{role.detail}</p>
              </CardBody>
            </Card>
          )}
        </ul>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="ALGORITHMS USED" title="Per-module algorithm inventory" />
          <CardBody>
            <ul className="space-y-3">
              {ALGORITHMS.map((group) =>
              <li key={group.tag} className="rounded-xl border border-line p-3">
                  <p className="font-mono text-[11px] text-forest-500">{group.tag}</p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {group.items.map((item) =>
                  <li
                    key={item}
                    className="rounded-md border border-line bg-canvas px-2 py-1 text-xs text-ink-muted">
                    
                        {item}
                      </li>
                  )}
                  </ul>
                </li>
              )}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader eyebrow="DATA STRUCTURES USED" title="Representation choices" />
          <CardBody className="px-0 py-0">
            <TableWrap>
              <thead>
                <tr>
                  <TH>Concept</TH>
                  <TH>Structure</TH>
                </tr>
              </thead>
              <tbody>
                {DATA_STRUCTURES.map(([concept, structure]) =>
                <tr key={concept}>
                    <TD>
                      <span className="font-medium text-ink">{concept}</span>
                    </TD>
                    <TD className="text-ink-muted">{structure}</TD>
                  </tr>
                )}
              </tbody>
            </TableWrap>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          eyebrow="TOURISM DATA MODEL"
          title={`${ATTRACTIONS.length} attractions in the local database`}
          subtitle="Interest scores are 1–5. Activity costs and visit durations are deliberately non-uniform." />
        
        <CardBody className="px-0 py-0">
          <TableWrap>
            <thead>
              <tr>
                <TH>Attraction</TH>
                <TH>District</TH>
                <TH>Province</TH>
                <TH align="center">Nat</TH>
                <TH align="center">Wild</TH>
                <TH align="center">Cult</TH>
                <TH align="center">Adv</TH>
                <TH align="center">Beach</TH>
                <TH align="center">Hist</TH>
                <TH align="right">Activity cost</TH>
                <TH align="right">Visit</TH>
                <TH align="right">Pop.</TH>
                <TH>Season</TH>
              </tr>
            </thead>
            <tbody>
              {ATTRACTIONS.map((attraction) =>
              <tr key={attraction.id} className="hover:bg-canvas">
                  <TD>
                    <span className="font-medium text-ink">{attraction.name}</span>
                  </TD>
                  <TD className="text-ink-muted">{attraction.city}</TD>
                  <TD className="text-ink-muted">{attraction.province}</TD>
                  <TD align="center" mono>
                    {attraction.scores.nature}
                  </TD>
                  <TD align="center" mono>
                    {attraction.scores.wildlife}
                  </TD>
                  <TD align="center" mono>
                    {attraction.scores.culture}
                  </TD>
                  <TD align="center" mono>
                    {attraction.scores.adventure}
                  </TD>
                  <TD align="center" mono>
                    {attraction.scores.beach}
                  </TD>
                  <TD align="center" mono>
                    {attraction.scores.history}
                  </TD>
                  <TD align="right" mono>
                    {formatRs(attraction.activityCost)}
                  </TD>
                  <TD align="right" mono>
                    {attraction.visitDuration}h
                  </TD>
                  <TD align="right" mono className="text-ink-muted">
                    {attraction.popularity}
                  </TD>
                  <TD className="text-xs text-ink-muted">{attraction.recommendedSeason}</TD>
                </tr>
              )}
            </tbody>
          </TableWrap>
        </CardBody>
      </Card>

      <section className="rounded-2xl border border-forest-200 bg-forest-50 p-6">
        <h2 className="text-lg font-semibold text-forest-800">Run it end to end</h2>
        <p className="mt-1.5 max-w-2xl text-sm text-forest-700">
          Change any preference and follow the pipeline module by module — each page shows its input,
          processing, output and the data handed to the next stage.
        </p>
        <ButtonLink to="/planner" className="mt-4">
          Open Trip Planner
          <ArrowRightIcon className="h-4 w-4" aria-hidden />
        </ButtonLink>
      </section>
    </div>);

}