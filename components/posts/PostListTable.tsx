"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { PostType } from "@/types/post";
import UpdatePost from "./UpdatePost";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

const PostListTable = () => {
  const [loading, setLoading] = useState(false);
  const [PostList, setPostList] = useState([]);

  const getPostList = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/post/posts", {
        withCredentials: true,
      });
      const data = response?.data;
      if (data?.success) {
        setPostList(data?.post);
      }
    } catch (error) {
      console.log("user list fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (_id: string) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8000/api/post/deletePost/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      const data = res?.data;
      if (data?.message) {
        toast.success(data?.message);
        setPostList((prev) =>
          prev?.filter((post: PostType) => post?._id !== _id)
        );
        await getPostList();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Post delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-20 space-x-1">
          <Loader2 size={15} className="mt-1 animate-spin" />
          <p className="text-sm text-gray-500">Loading post list...</p>
        </div>
      ) : PostList.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead className=" hidden md:table-cell">Title</TableHead>
              <TableHead className=" hidden md:table-cell">
                Author Name
              </TableHead>
              <TableHead className="hidden md:table-cell text-center">
                Action
              </TableHead>
              <TableHead className="text-center">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PostList?.map((post: PostType) => (
              <TableRow key={post?._id}>
                <TableCell>
                  {post?.coverImage?.url && (
                    <Image
                      src={post?.coverImage?.url}
                      alt="cover-image"
                      width={50}
                      height={50}
                    />
                  )}
                </TableCell>
                <TableCell className=" hidden md:table-cell capitalize font-semibold text-xs md:text-sm">
                  {post?.title}
                </TableCell>
                <TableCell className="hidden md:table-cell lowercase font-semibold text-xs md:text-sm">
                  {post?.author.name}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure want to delete this post
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will permanently remove the post from the
                          system. Are you sure?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className=" cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className=" cursor-pointer"
                          onClick={() => handleRemove(post?._id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
                <TableCell className="text-center">
                  <UpdatePost post={post} onUpdate={getPostList} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 mt-10 md:mt-20">
          <h3 className="text-2xl md:text-3xl font-semibold">No Post here</h3>
          <p className="max-w-xl text-center text-xs md:text-sm text-primary">
            You haven't added any post yet. Post help you organize your content
            or products more efficiently, making it easier for users to browse
            and find what they're looking for. Get started by creating your
            first post now.
          </p>
          <Button className="mt-2">
            <Link href={"/blogpost"}>Create post</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default PostListTable;
