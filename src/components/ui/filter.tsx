"use client";

import React from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { ShareButton } from "./share-button";

type TimePeriod = "4 weeks" | "6 months" | "12 months";

interface FilterProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  shareData?: Array<{
    trackName?: string;
    artistNames?: string[];
    name?: string;
    artisteName?: string;
    genre?: string;
    [key: string]: unknown;
  }>;
  shareType?: "tracks" | "artists" | "genres";
}

export const Filter: React.FC<FilterProps> = ({
  selectedPeriod,
  onPeriodChange,
  shareData,
  shareType,
}) => {
  const timePeriods: TimePeriod[] = ["4 weeks", "6 months", "12 months"];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between gap-4 mb-4">
        <Card className="flex-1">
          <CardContent className="p-0">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              {timePeriods.map((period) => (
                <Button
                  key={period}
                  onClick={() => onPeriodChange(period)}
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

        {shareData && shareType && (
          <ShareButton
            data={shareData}
            type={shareType}
            period={selectedPeriod}
          />
        )}
      </div>
    </div>
  );
};
