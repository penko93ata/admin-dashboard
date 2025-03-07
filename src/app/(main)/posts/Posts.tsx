"use client";

import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export function Posts() {
  const [posts] = api.post.getPosts.useSuspenseQuery();

  if (posts.length === 0) {
    return <div>No posts found</div>;
  }

  return <DataTable columns={columns} data={posts} />;
}
