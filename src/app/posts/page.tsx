import { api, HydrateClient } from "~/trpc/server";
import { Suspense } from "react";
import BackButton from "~/components/BackButton";
import { Posts } from "../(main)/posts/Posts";

export default async function PostsPage() {
  void api.post.getPosts.prefetch();

  return (
    <HydrateClient>
      <BackButton text="Go Back" link="/" />
      <Suspense fallback={<div>Loading...</div>}>
        <Posts />
      </Suspense>
    </HydrateClient>
  );
}
