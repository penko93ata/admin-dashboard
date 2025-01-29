import { api } from "~/trpc/server";
import { PostsTable } from "../_components/posts/PostsTable";
import { Suspense } from "react";
import BackButton from "~/components/BackButton";
import PostsPagination from "../_components/posts/PostsPagination";

export default async function PostsPage() {
  const posts = await api.post.getPosts();
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <Suspense fallback={<div>Loading...</div>}>
        <PostsTable posts={posts} />
        <PostsPagination />
      </Suspense>
    </>
  );
}
