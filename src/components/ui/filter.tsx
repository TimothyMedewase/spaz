"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";

type TimePeriod = "4 weeks" | "6 months" | "12 months";

const pageNames: { [key: string]: string } = {
  "/tracks": "Tracks",
  "/artistes": "Artistes",
  "/genres": "Genres",
};

interface FilterProps {
  selectedPeriod: string;
  onPeriodChange: (period: TimePeriod) => void;
}

export function Filter({ selectedPeriod, onPeriodChange }: FilterProps) {
  const pathname = usePathname();

  const pageName = pageNames[pathname] || "Items";

  const periods: TimePeriod[] = ["4 weeks", "6 months", "12 months"];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Top {pageName} (last {selectedPeriod})
      </h1>
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => onPeriodChange(period)}
                className={`py-2 px-4 text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-primary hover:bg-muted"
                }`}
              >
                {period === "4 weeks" ? "last 4 weeks" : `last ${period}`}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
