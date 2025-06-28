"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import data from "@/data/analytics";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const AnalyticsChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient ? (
        <div className="hidden md:inline-block">
          <Card className="mt-10">
            <CardHeader>
              <CardTitle>Analytics For This Year</CardTitle>
              <CardDescription>Views Per Month</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 300 }}>
                <LineChart width={1000} height={300} data={data}>
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    isAnimationActive={false}
                  />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </LineChart>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p>Prerendered</p>
      )}
    </>
  );
};

export default AnalyticsChart;
