"use client";
import CategoryUpdate from "@/components/categories/CategoryUpdate";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { serverUrl } from "@/config/config";
import { CategoryType } from "@/types/categories";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoryListPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategoriesList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${serverUrl}/api/category/getCategories`, {
        withCredentials: true,
      });
      const data = res.data;
      if (data?.success) {
        setCategoryList(data?.categories);
      }
    } catch (error) {
      console.error("Categories getting error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategoriesList();
  }, []);

  const handleRemove = async (_id: string) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/category/delete/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
        setCategoryList((prev) =>
          prev.filter((cat: CategoryType) => cat._id !== _id)
        );
        await getCategoriesList();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Category removed error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center py-20 space-x-1">
          <Loader2 size={15} className="mt-1 animate-spin" />
          <p className="text-sm text-gray-500">Loading categories...</p>
        </div>
      ) : categoryList.length ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell text-right">
                  IsActive
                </TableHead>
                <TableHead className="hidden md:table-cell text-right">
                  Delete
                </TableHead>
                <TableHead className="text-center">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryList?.map((category: CategoryType) => (
                <TableRow key={category?._id}>
                  <TableCell className=" capitalize">
                    {category?.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">
                    {category?.isActive ? "true" : "false"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="cursor-pointer hover:bg-red-600 hover:text-white duration-300"
                          size="icon"
                        >
                          <Trash2 size={10} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="cursor-pointer"
                            onClick={() => handleRemove(category?._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                  <TableCell className="text-center">
                    <CategoryUpdate
                      category={category}
                      onUpdate={getCategoriesList}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 mt-10 md:mt-20">
          <h3 className="text-2xl md:text-3xl font-semibold">
            No Categories here
          </h3>
          <p className="max-w-xl text-center text-xs md:text-sm text-primary">
            You haven't added any categories yet. Categories help you organize
            your content or products more efficiently, making it easier for
            users to browse and find what they're looking for. Get started by
            creating your first category now.
          </p>
          <Button className="mt-2">
            <Link href={"/categories"}>Create Categories</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;
