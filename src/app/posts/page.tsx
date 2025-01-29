import { api } from "~/trpc/server";
import { PostsTable } from "../_components/posts/PostsTable";
import { Suspense } from "react";

export default async function PostsPage() {
  const posts = await api.post.getPosts();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostsTable posts={posts} />
    </Suspense>
  );
}
