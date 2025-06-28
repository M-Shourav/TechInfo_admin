import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { PostType } from "@/types/post";

interface Props {
  limit?: number;
  title?: string;
  Post: PostType[];
}
const PostTable = ({ limit, title, Post }: Props) => {
  // sorting post
  // const shortestPost: Post[] = [...posts].sort(
  //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  // );

  //   filtered post
  //  const FilteredPost = limit ? shortestPost?.slice(0, limit) : shortestPost;

  const shortestPost: PostType[] = [...Post].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const FilteredPost = limit ? shortestPost?.slice(0, limit) : shortestPost;
  return (
    <div className="my-10">
      <h3 className="text-2xl font-semibold mb-4">{title ? title : "Post"}</h3>
      <Table>
        <TableCaption>A list of recent post </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Date
            </TableHead>
            <TableHead className="hidden md:table-cell">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FilteredPost?.map((post) => (
            <TableRow key={post?._id}>
              <TableCell>{post?.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                {post?.author?.name}
              </TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {new Date(post?.createdAt).toISOString().split("T")[0]}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Link href={`/blogpost/post-list`}>
                  <Button className="bg-blue-600 cursor-pointer">Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostTable;
