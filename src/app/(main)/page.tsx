import {
  Folder,
  MessageCircle,
  Newspaper,
  NewspaperIcon,
  User,
} from "lucide-react";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import DashboardCard from "~/app/_components/dashboard/DashboardCard";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import AnalyticsChart from "../_components/dashboard/AnalyticsChart";
import { PostsTable } from "./posts/PostsTable";
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
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main> */}
    </HydrateClient>
  );
}
