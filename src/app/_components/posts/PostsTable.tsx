"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";

type PostTableProps = {
  limit?: number;
  title?: string;
};

export function PostsTable({ limit, title }: PostTableProps) {
  const { data: posts = [], isFetching } = api.post.getPosts.useQuery();

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">{title ?? "Posts"}</h3>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableCaption>A list of recent posts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden text-right md:table-cell">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {post.author.name}
                </TableCell>
                <TableCell className="hidden text-right md:table-cell">
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link href={`/posts/edit/${post.id}`}>
                    <Button size="sm">Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
