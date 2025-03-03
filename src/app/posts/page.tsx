import { api } from "~/trpc/server";
import { Suspense } from "react";
import BackButton from "~/components/BackButton";
import { DataTable } from "../(main)/posts/data-table";
import { columns } from "../(main)/posts/columns";

export default async function PostsPage() {
  const posts = await api.post.getPosts();
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={posts} />
      </Suspense>
    </>
  );
}
