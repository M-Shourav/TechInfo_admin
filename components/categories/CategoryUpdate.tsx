"use client";
import { CategoryType } from "@/types/categories";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Switch } from "../ui/switch";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "@/config/config";

interface Props {
  category: CategoryType;
  onUpdate: () => void;
}

const CategoryUpdate = ({ category, onUpdate }: Props) => {
  const [name, setName] = useState(category?.name);
  const [isActive, setIsActive] = useState(category?.isActive);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${serverUrl}/api/category/update/${category?._id}`,
        {
          name,
          isActive,
        },
        {
          withCredentials: true,
        }
      );
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
        onUpdate();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Categories update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer hover:bg-green-400 hover:text-white">
          <Pencil size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Categories</DialogTitle>
          <DialogDescription>
            Make changes to your categories here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2.5">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex items-center space-x-2 p-2 group">
            <Label
              htmlFor="isActive"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Is Active
            </Label>
            <Switch
              id="isActive"
              className="cursor-pointer"
              checked={isActive}
              onCheckedChange={() => setIsActive(!isActive)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="cursor-pointer"
            onClick={handleUpdate}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryUpdate;
