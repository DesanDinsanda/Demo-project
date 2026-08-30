import React from 'react';
import {
  BrainCircuitIcon,
  CoinsIcon,
  NetworkIcon,
  RouteIcon,
  TrophyIcon,
  ArrowRightIcon } from
'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody } from '../components/ui/Card';

const HERO_IMAGE = "/13d15398-6125-4175-bec9-94ef84dc5ca2.jpg";


const MODULES = [
{
  tag: 'Module 4',
  order: 'Runs 1st',
  title: 'Intelligent Decision',
  description:
  'Scores every attraction against the tourist’s weighted interests and generates multiple candidate destination plans.',
  icon: <BrainCircuitIcon className="h-5 w-5" aria-hidden />
},
{
  tag: 'Module 3',
  order: 'Runs 2nd',
  title: 'Tourism Network Analysis',
  description:
  'Builds a weighted graph per candidate plan with distance, time and cost on every connection.',
  icon: <NetworkIcon className="h-5 w-5" aria-hidden />
},
{
  tag: 'Module 1',
  order: 'Runs 3rd',
  title: 'Route Optimization',
  description:
  'Finds the best visiting order inside each plan using Dijkstra plus a TSP-style heuristic.',
  icon: <RouteIcon className="h-5 w-5" aria-hidden />
},
{
  tag: 'Module 2',
  order: 'Runs 4th',
  title: 'Resource Allocation',
  description:
  'Allocates transport, lodging, food, activities and reserve, then tests budget and time feasibility.',
  icon: <CoinsIcon className="h-5 w-5" aria-hidden />
},
{
  tag: 'Module 5',
  order: 'Runs 5th',
  title: 'Overall Optimization',
  description:
  'Removes infeasible plans and ranks the rest with a configurable multi-criteria weighted sum.',
  icon: <TrophyIcon className="h-5 w-5" aria-hidden />
}];


const PIPELINE = [
'Tourist Preferences',
'Candidate Plans',
'Tourism Network',
'Best Routes',
'Resource Feasibility',
'Final Optimized Trip'];


export function Home() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="p-6 sm:p-10">
            <Badge tone="forest" mono>
              FIVE-MODULE DECISION SUPPORT SYSTEM
            </Badge>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-[2.6rem]">
              Smart Sri Lanka Tourism Decision System
            </h1>
            <p className="mt-4 max-w-xl text-base text-ink-muted sm:text-lg">
              Plan your Sri Lankan journey using intelligent destination recommendation, tourism
              network analysis, route optimization and resource allocation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/planner" size="lg">
                Start Planning
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink to="/system" variant="secondary" size="lg">
                View How It Works
              </ButtonLink>
            </div>
            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {[
              ['22', 'Attractions modelled'],
              ['5', 'Candidate plans per run'],
              ['5', 'Decision modules']].
              map(([value, label]) =>
              <div key={label}>
                  <dt className="tabular text-2xl font-semibold text-forest-700">{value}</dt>
                  <dd className="mt-0.5 text-xs text-ink-muted">{label}</dd>
                </div>
              )}
            </dl>
          </div>
          <div className="relative min-h-[260px]">
            <img
              src={HERO_IMAGE}
              alt="Sri Lankan hill-country tea slopes with a rock fortress and southern coastline"
              className="h-full w-full object-cover" />
            
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/30 bg-ink/60 px-4 py-3 backdrop-blur">
              <p className="font-mono text-[11px] text-white/70">EXAMPLE TOURIST</p>
              <p className="text-sm font-semibold text-white">
                John · United Kingdom · 7 days · Rs.150,000
              </p>
              <p className="text-xs text-white/75">
                Nature High · Wildlife High · Culture High · Adventure Medium · Train + Bus
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="pipeline-heading">
        <h2 id="pipeline-heading" className="text-xl font-semibold tracking-tight text-ink">
          The decision pipeline
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          Data flows in one direction. Each stage consumes only what the previous stage produced.
        </p>
        <ol className="mt-5 flex flex-wrap items-stretch gap-2">
          {PIPELINE.map((stage, index) =>
          <li key={stage} className="flex items-center gap-2">
              <span
              className={`flex h-full flex-col justify-center rounded-xl border px-3.5 py-2.5 ${
              index === PIPELINE.length - 1 ?
              'border-forest-500 bg-forest-700 text-white' :
              'border-line bg-surface text-ink'}`
              }>
              
                <span className="font-mono text-[10px] opacity-70">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium">{stage}</span>
              </span>
              {index < PIPELINE.length - 1 ?
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-ink-soft" aria-hidden /> :
            null}
            </li>
          )}
        </ol>
      </section>

      <section aria-labelledby="modules-heading">
        <h2 id="modules-heading" className="text-xl font-semibold tracking-tight text-ink">
          Five intelligent modules
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          The module numbers are project identifiers — the execution order below is what the system
          follows.
        </p>
        <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module, index) =>
          <Card
            as="li"
            key={module.tag}
            className={index === 0 ? 'lg:col-span-2' : undefined}>
            
              <CardBody>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-50 text-forest-600">
                    {module.icon}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <Badge tone="forest" mono>
                      {module.tag}
                    </Badge>
                    <span className="font-mono text-[10px] text-ink-soft">{module.order}</span>
                  </div>
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{module.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{module.description}</p>
              </CardBody>
            </Card>
          )}
        </ul>
      </section>

      <section className="rounded-2xl border border-forest-200 bg-forest-50 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold text-forest-800">
              Run the full pipeline on the example tourist
            </h2>
            <p className="mt-1.5 text-sm text-forest-700">
              John’s profile is pre-loaded. Generate candidate plans and step through every module to
              see the exact input, processing and output at each stage.
            </p>
          </div>
          <ButtonLink to="/planner" size="lg">
            Open Trip Planner
            <ArrowRightIcon className="h-4 w-4" aria-hidden />
          </ButtonLink>
        </div>
      </section>
    </div>);

}