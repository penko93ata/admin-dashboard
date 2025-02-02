import { useForm } from "react-hook-form";
import { z } from "zod";
import BackButton from "~/components/BackButton";
// import { api } from "~/trpc/react";
import { api } from "~/trpc/server";
import EditPostForm from "~/app/(main)/posts/EditPostForm";
import { Suspense } from "react";

type PostEditPageProps = {
  params: {
    id: string;
  };
};

export default async function PostEditPage({ params }: PostEditPageProps) {
  const { id } = params;
  const post = await api.post.getPostById(parseInt(id));

  return (
    <>
      <BackButton text="Back To Posts" link="/posts" />
      <h3 className="mb-4 text-2xl">Edit Post</h3>
      <Suspense fallback="Loading...">
        <EditPostForm post={post} />
      </Suspense>
    </>
  );
}
