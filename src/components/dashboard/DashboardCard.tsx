import { Card, CardContent } from "../ui/card";
import { Newspaper } from "lucide-react";
import { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: React.ReactNode;
  count: number;
  icon: React.ReactElement<LucideIcon>;
};

export default function DashboardCard({
  title,
  count,
  icon,
}: DashboardCardProps) {
  return (
    <Card className="bg-slate-100 p-5 pb-0 dark:bg-slate-800">
      <CardContent>
        <h3 className="mb-4 text-center text-3xl font-bold text-slate-500 dark:text-slate-200">
          {title}
        </h3>
        <div className="flex items-center justify-center gap-5">
          {icon}
          <h3 className="text-5xl font-semibold text-slate-500 dark:text-slate-200">
            {count}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}
