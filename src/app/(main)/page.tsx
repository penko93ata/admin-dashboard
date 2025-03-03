import { Folder, MessageCircle, Newspaper, User } from "lucide-react";

import DashboardCard from "~/app/_components/dashboard/DashboardCard";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import AnalyticsChart from "../_components/dashboard/AnalyticsChart";
import { DataTable } from "./posts/data-table";
import { columns } from "./posts/columns";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  const USER_ID = "2e297f9a-63f5-41e1-a970-b18099f81358";
  const USER_ID_2 = "6b7a8a0b-0fbb-4708-b7f8-a040551f5366";

  // void api.post.getLatest.prefetch();
  // void api.post.getPosts.prefetch();
  const posts = await api.post.getLatestPosts();

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
      <DataTable columns={columns} data={posts} />
    </HydrateClient>
  );
}
