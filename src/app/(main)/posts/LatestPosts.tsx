"use client";
import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export function LatestPosts() {
  const [posts] = api.post.getLatestPosts.useSuspenseQuery();
  return <DataTable columns={columns} data={posts} />;
}
