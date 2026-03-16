import { Outlet, useLocation } from "react-router";
import { Navigation } from "./Navigation";
import { MouseTrail } from "./MouseTrail";
import { StressMeter } from "./StressMeter";
import { DailyAffirmation } from "./DailyAffirmation";
import { useEffect } from "react";

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      <MouseTrail />
      <StressMeter />
      <DailyAffirmation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}