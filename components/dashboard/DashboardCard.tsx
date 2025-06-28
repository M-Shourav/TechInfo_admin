import React from "react";
import { Card, CardContent } from "../ui/card";
import { LucideIcon } from "lucide-react";
interface Props {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
}

const DashboardCard = ({ title, count, icon }: Props) => {
  return (
    <Card className="bg-slate-100 dark:bg-slate-800">
      <CardContent>
        <h3
          className="text-2xl font-bold text-center text-slate-500
         dark:text-slate-200 mb-2"
        >
          {title}
        </h3>
        <div className="flex items-center justify-center gap-3">
          {icon}
          <p className="text-4xl font-bold text-slate-500 dark:text-slate-200">
            {count ? count : "0"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
