import { ArrowRightIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const HERO_IMAGE = "/13d15398-6125-4175-bec9-94ef84dc5ca2.jpg";


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
                ['450', 'Attractions modelled'],
                ['5', 'Candidate plans per run'],
                ['5', 'Decision modules']
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="tabular text-2xl font-semibold text-forest-700">{value}</dt>
                  <dd className="mt-0.5 text-xs text-ink-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[260px]">
            <img
              src={HERO_IMAGE}
              alt="Sri Lankan hill-country tea slopes with a rock fortress and southern coastline"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/30 bg-ink/60 px-4 py-3 backdrop-blur">
              <p className="font-mono text-[11px] text-white/70">EXAMPLE TOURIST</p>
              <p className="text-sm font-semibold text-white">
                John · United Kingdom · 7 days · Rs.150,000
              </p>
              <p className="text-xs text-white/75">
                Nature High · Wildlife High · Culture High · Adventure Medium · Public Transport
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}