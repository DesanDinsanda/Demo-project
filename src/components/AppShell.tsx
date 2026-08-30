import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CompassIcon, MenuIcon, RotateCcwIcon, XIcon } from 'lucide-react';
import { PipelineIndicator } from './PipelineIndicator';
import { usePlanner } from '../contexts/PlannerContext';
import { Button, ButtonLink } from './ui/Button';

const NAV = [
{ to: '/', label: 'Home' },
{ to: '/planner', label: 'Trip Planner' },
{ to: '/dashboard', label: 'Dashboard' },
{ to: '/compare', label: 'Compare Plans' },
{ to: '/itinerary', label: 'Final Itinerary' },
{ to: '/system', label: 'System & Algorithms' }];


export function AppShell({ children }: {children: React.ReactNode;}) {
  const { result, reset, preferences } = usePlanner();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas">
      <header className="sticky top-0 z-30 border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest-700 text-white">
              <CompassIcon className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold leading-tight text-ink">
                Smart Sri Lanka Tourism
              </span>
              <span className="block font-mono text-[10px] leading-tight text-forest-500">
                Decision Support System
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out ${
              isActive ?
              'bg-forest-50 text-forest-700' :
              'text-ink-muted hover:bg-canvas hover:text-ink'}`

              }>
              
                {item.label}
              </NavLink>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            {result ?
            <span className="hidden items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-xs text-ink-muted sm:flex">
                <span className="font-semibold text-ink">{preferences.name}</span>
                <span className="tabular">
                  {preferences.days}d · Rs.{(preferences.budget / 1000).toFixed(0)}k
                </span>
              </span> :
            null}
            {result ?
            <Button variant="secondary" size="sm" onClick={reset}>
                <RotateCcwIcon className="h-3.5 w-3.5" aria-hidden />
                Reset
              </Button> :

            <ButtonLink to="/planner" size="sm">
                Start Planning
              </ButtonLink>
            }
            <button
              type="button"
              className="rounded-lg border border-line p-2 text-ink-muted lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu">
              
              {menuOpen ?
              <XIcon className="h-4 w-4" aria-hidden /> :

              <MenuIcon className="h-4 w-4" aria-hidden />
              }
            </button>
          </div>
        </div>

        {menuOpen ?
        <nav aria-label="Mobile" className="border-t border-line px-4 pb-3 pt-2 lg:hidden">
            <ul className="grid gap-1 sm:grid-cols-2">
              {NAV.map((item) =>
            <li key={item.to}>
                  <NavLink
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-forest-50 text-forest-700' : 'text-ink-muted'}`

                }>
                
                    {item.label}
                  </NavLink>
                </li>
            )}
            </ul>
          </nav> :
        null}
      </header>

      <PipelineIndicator />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-ink-muted sm:px-6">
          <p>
            Smart Sri Lanka Tourism Decision System — five-module decision-support prototype with
            local tourism data.
          </p>
          <p className="font-mono text-[11px]">
            Module 4 → Module 3 → Module 1 → Module 2 → Module 5
          </p>
        </div>
      </footer>
    </div>);

}