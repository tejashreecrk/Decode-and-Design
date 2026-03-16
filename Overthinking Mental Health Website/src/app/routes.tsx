import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { TheNightBegins } from "./pages/TheNightBegins";
import { InsideTheMind } from "./pages/InsideTheMind";
import { TheSpiral } from "./pages/TheSpiral";
import { EffectsOfOverthinking } from "./pages/EffectsOfOverthinking";
import { BreakingPoint } from "./pages/BreakingPoint";
import { Journal } from "./pages/Journal";
import { BreathingMeditation } from "./pages/BreathingMeditation";
import { FindingCalm } from "./pages/FindingCalm";
import { NewBeginning } from "./pages/NewBeginning";
import { ThoughtCatcher } from "./pages/ThoughtCatcher";
import { MoodCalendar } from "./pages/MoodCalendar";
import { Dashboard } from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "the-night-begins", Component: TheNightBegins },
      { path: "inside-the-mind", Component: InsideTheMind },
      { path: "the-spiral", Component: TheSpiral },
      { path: "effects", Component: EffectsOfOverthinking },
      { path: "breaking-point", Component: BreakingPoint },
      { path: "journal", Component: Journal },
      { path: "breathing-meditation", Component: BreathingMeditation },
      { path: "finding-calm", Component: FindingCalm },
      { path: "new-beginning", Component: NewBeginning },
      { path: "thought-catcher", Component: ThoughtCatcher },
      { path: "mood-calendar", Component: MoodCalendar },
      { path: "dashboard", Component: Dashboard },
    ],
  },
]);