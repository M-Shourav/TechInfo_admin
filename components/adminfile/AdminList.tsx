"use client";
import { serverUrl } from "@/config/config";
import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
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
import UpdateAdmin from "./UpdateAdmin";

const AdminList = () => {
  const [adminList, setAdminList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const getAdminList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${serverUrl}/api/secure/admin/getallAdmin`, {
        withCredentials: true,
      });

      const data = res?.data;
      if (data?.success) {
        setAdminList(data?.admin);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Fetching Admin list error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAdminList();
  }, []);
  const handleRemoveUser = async (_id: string, isAdmin: boolean) => {
    setLoading(true);
    if (isAdmin) {
      toast.error("Admin can't deleted");
      return;
    }
    try {
      const response = await axios.post(
        `${serverUrl}/api/secure/admin/remove//${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      const data = response?.data;
      if (data?.success) {
        toast.success(data?.message);
        setAdminList((prev) => prev?.filter((admin) => admin?._id !== _id));
        await getAdminList();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("admin remove error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="mt-10">
          <Loading />
        </div>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Admin</TableHead>
                <TableHead className="hidden md:table-cell text-center">
                  Action
                </TableHead>
                <TableHead className="text-center">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminList?.map((item: User) => (
                <TableRow key={item?._id}>
                  <TableCell className="hidden md:table-cell capitalize font-semibold">
                    {item?.name}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm font-semibold">
                    {item?.email}
                  </TableCell>
                  <TableCell
                    className={`$ {
                      item?.isAdmin && "text-green-600 font-bold"
                    } hidden md:table-cell capitalize font-semibold`}
                  >
                    {item?.isAdmin ? "Admin" : "User"}
                  </TableCell>
                  <TableCell className="hidden md:flex items-center justify-center">
                    {item?.isAdmin ? (
                      <Button
                        variant="destructive"
                        className="cursor-not-allowed bg-transparent text-black hover:text-black"
                        onClick={() => toast.error("Admin can't be deleted.")}
                      >
                        <Trash2 size={18} />
                      </Button>
                    ) : (
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
                            <AlertDialogTitle>Delete Admin</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will permanently remove the Admin from
                              the system. Are you sure?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleRemoveUser(item?._id, item?.isAdmin)
                              }
                              className=" cursor-pointer"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <UpdateAdmin admin={item} onUpdate={getAdminList} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default AdminList;
