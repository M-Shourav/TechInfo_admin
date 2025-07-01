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
import { Button } from "../ui/button";
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
import { Trash2 } from "lucide-react";
import { User } from "@/types/user";
import UpdateUser from "../UpdateUser";
import { serverUrl } from "@/config/config";

const UserList = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const getUserList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}user/users`, {
        withCredentials: true,
      });
      const data = response?.data;
      if (data?.success) {
        setUserList(data?.user);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("user list fetching error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserList();
  }, []);

  const handleRemoveUser = async (_id: string, isAdmin: boolean) => {
    setLoading(true);
    if (isAdmin) {
      toast.error("Admin can't deleted");
      return;
    }
    try {
      const response = await axios.post(`${serverUrl}user/remove`, {
        _id,
      });
      const data = response?.data;
      if (data?.success) {
        toast.success(data?.message);
        setUserList((prev) => prev?.filter((user) => user?._id !== _id));
        await getUserList();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("use remove error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Data is Loading</p>
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
              {userList?.map((item: User) => (
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
                            <AlertDialogTitle>Delete User</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will permanently remove the user from
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
                    <UpdateUser user={item} onUpdate={getUserList} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UserList;
