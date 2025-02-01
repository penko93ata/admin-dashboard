"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { updatePostSchema } from "~/schema/updatePost.schema";
import { api } from "~/trpc/react";
import { SelectPost } from "~/types/posts";

export default function EditPostForm({ post }: { post: SelectPost | null }) {
  const form = useForm<z.infer<typeof updatePostSchema>>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      title: post?.title ?? "",
      body: post?.body ?? "",
      //   author: post?.author?.name ?? "",
      //   date: post?.createdAt ?? new Date(),
    },
  });

  const { mutate: updatePost, isPending } = api.post.updatePost.useMutation({
    onSuccess: (data) =>
      toast.success("Post has updated successfully", {
        description: `Updated on ${data[0]?.updatedAt?.toDateString()}`,
      }),
  });

  const onSubmit = (data: z.infer<typeof updatePostSchema>) => {
    updatePost({ id: post!.id, ...data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  className="focus:visible:ring-0 border-0 bg-slate-100 text-black focus-visible:ring-offset-0 dark:bg-slate-500 dark:text-white"
                  placeholder="Enter Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Body
              </FormLabel>
              <FormControl>
                <Textarea
                  className="focus:visible:ring-0 border-0 bg-slate-100 text-black focus-visible:ring-offset-0 dark:bg-slate-500 dark:text-white"
                  placeholder="Enter Body"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  className="focus:visible:ring-0 border-0 bg-slate-100 text-black focus-visible:ring-offset-0 dark:bg-slate-500 dark:text-white"
                  placeholder="Enter Author"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button
          disabled={isPending}
          className="w-full dark:bg-slate-800 dark:text-white"
        >
          Update Post
        </Button>
      </form>
    </Form>
  );
}
