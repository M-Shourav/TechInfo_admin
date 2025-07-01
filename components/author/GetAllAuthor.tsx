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
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

import { Author } from "@/types/author";
import Image from "next/image";

import UpdateAuthor from "./UpdateAuthor";
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
import { serverUrl } from "@/config/config";

const GetAllAuthor = () => {
  const [authorList, setAuthorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getAuthorList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serverUrl}/api/admin/AlAuthors`, {
        withCredentials: true,
      });
      const data = response?.data;
      if (data?.success) {
        setAuthorList(data?.author);
      }
    } catch (error) {
      console.log("user list fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  const AuthorRemove = async (_id: string) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/admin/deleteAuhtor/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
        setAuthorList((prev) =>
          prev.filter((author: Author) => author?._id !== _id)
        );
        await getAuthorList();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Author remove error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      return router.push("/auth");
    }
    getAuthorList();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center py-20 space-x-1">
          <Loader2 size={15} className="mt-1 animate-spin" />
          <p className="text-sm text-gray-500">Loading Author list...</p>
        </div>
      ) : authorList.length ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead className=" hidden md:table-cell">Name</TableHead>
                <TableHead className=" hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell text-center">
                  Action
                </TableHead>
                <TableHead className="text-center">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authorList?.map((author: Author) => (
                <TableRow key={author?._id}>
                  <TableCell>
                    {author?.coverImage?.url && (
                      <Image
                        src={author?.coverImage.url}
                        alt="author-image"
                        width={50}
                        height={50}
                        unoptimized
                      />
                    )}
                  </TableCell>
                  <TableCell className=" hidden md:table-cell capitalize font-semibold text-xs md:text-sm">
                    {author?.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell lowercase font-semibold text-xs md:text-sm">
                    {author?.email}
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="cursor-pointer bg-transparent text-black hover:text-white"
                          variant={"destructive"}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete User</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will permanently remove the author from
                            the system. Are you sure?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => AuthorRemove(author?._id)}
                            className=" cursor-pointer"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                  <TableCell className="text-center">
                    <UpdateAuthor author={author} onUpdate={getAuthorList} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 mt-10 md:mt-20">
          <h3 className="text-2xl md:text-3xl font-semibold">No Author here</h3>
          <p className="max-w-xl text-center text-xs md:text-sm text-primary">
            You haven't added any author yet. Auhtor help you organize your
            content or products more efficiently, making it easier for users to
            browse and find what they're looking for. Get started by creating
            your first author now.
          </p>
          <Button className="mt-2">
            <Link href={"/author"}>Create Author</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default GetAllAuthor;
