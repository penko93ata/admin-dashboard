import { Folder, MessageCircle, Newspaper, User } from "lucide-react";

import DashboardCard from "~/app/_components/dashboard/DashboardCard";
import { api, HydrateClient } from "~/trpc/server";
import AnalyticsChart from "../_components/dashboard/AnalyticsChart";
import { Suspense } from "react";
import { LatestPosts } from "./posts/LatestPosts";

export default async function Home() {
  void api.post.getLatestPosts.prefetch();

  return (
    <HydrateClient>
      <div className="mb-5 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
        <DashboardCard
          title="Posts"
          count={100}
          icon={
            <Newspaper
              className="text-slate-500 dark:text-slate-200"
              size={72}
            />
          }
        />
        <DashboardCard
          title="Categories"
          count={12}
          icon={
            <Folder className="text-slate-500 dark:text-slate-200" size={72} />
          }
        />
        <DashboardCard
          title="Users"
          count={750}
          icon={
            <User className="text-slate-500 dark:text-slate-200" size={72} />
          }
        />
        <DashboardCard
          title="Comments"
          count={1200}
          icon={
            <MessageCircle
              className="text-slate-500 dark:text-slate-200"
              size={72}
            />
          }
        />
      </div>
      <AnalyticsChart />
      <Suspense fallback={<div>Loading...</div>}>
        <LatestPosts />
      </Suspense>
    </HydrateClient>
  );
}
