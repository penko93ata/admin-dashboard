import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type SelectPost } from "~/types/posts";

type PostTableProps = {
  title?: string;
  posts: SelectPost[];
};

export function PostsTable({ title, posts }: PostTableProps) {
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">{title ?? "Posts"}</h3>
      <Table>
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
    </div>
  );
}
