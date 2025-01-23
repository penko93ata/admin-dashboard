import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

type PostTableProps = {
  limit?: number;
  title?: string;
};

export function PostsTable({ limit, title }: PostTableProps) {
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">{title ?? "Posts"}</h3>
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
        <TableBody>{/* map through the posts */}</TableBody>
      </Table>
    </div>
  );
}
