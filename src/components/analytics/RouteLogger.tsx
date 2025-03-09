"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function RouteLoggerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const logRouteChange = () => {
      const performance = window.performance;
      const navigationEntry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType("paint");

      console.log("Route Performance:", {
        route: pathname + searchParams.toString(),
        timing: {
          ttfb: navigationEntry.responseStart - navigationEntry.requestStart,
          fcp: paintEntries.find(
            (entry) => entry.name === "first-contentful-paint"
          )?.startTime,
          load: navigationEntry.loadEventEnd - navigationEntry.startTime,
        },
      });
    };

    logRouteChange();
  }, [pathname, searchParams]);

  return null;
}

export function RouteLogger() {
  return (
    <Suspense>
      <RouteLoggerInner />
    </Suspense>
  );
}
