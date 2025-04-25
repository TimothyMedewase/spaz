"use client";

import React from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

type TimePeriod = "4 weeks" | "6 months" | "12 months";

interface FilterProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export const Filter: React.FC<FilterProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  const timePeriods: TimePeriod[] = ["4 weeks", "6 months", "12 months"];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            {timePeriods.map((period) => (
              <Button
                key={period}
                onClick={() => onPeriodChange(period)}
                //variant={selectedPeriod === period ? "default" : "outline"}
                className={`py-2 px-4 text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-primary hover:bg-muted"
                }`}
              >
                {period}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
