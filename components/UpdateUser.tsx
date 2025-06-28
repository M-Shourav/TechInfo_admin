"use client";
import { User } from "@/types/user";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Eye, EyeClosed, EyeOff, LoaderCircle, Pencil } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import axios from "axios";
interface Props {
  user: User;
  onUpdate: () => void;
}

const UpdateUser = ({ user, onUpdate }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, SetCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newShowPass, setNewShowPass] = useState(false);
  const [confirmShowPass, setConfirmShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleUpdate = async () => {
    if (!name) {
      toast.error("Name are required.");
      return;
    }
    if (!email) {
      toast.error("Email are required.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/user/update/${user?._id}`,
        {
          name,
          email,
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      if (data.success) {
        toast.success(data?.message);
        onUpdate(); // refresh user list
        setOpen(false);
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      toast.error("Error updating user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-xs px-3 cursor-pointer"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          <Pencil size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user's name or role.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2 relative">
            <Label>Current Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => SetCurrentPassword(e.target.value)}
              className="py-0"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8 right-3 cursor-pointer h-full"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
          </div>
          <div className="space-y-2 relative">
            <Label>New Password</Label>
            <Input
              type={newShowPass ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              onClick={() => setNewShowPass(!newShowPass)}
              className="absolute top-8 right-3 cursor-pointer h-full"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
          </div>
          <div className="space-y-2 relative">
            <Label>Retype New Password</Label>
            <Input
              type={confirmShowPass ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              onClick={() => setConfirmShowPass(!confirmShowPass)}
              className="absolute top-8 right-3 cursor-pointer h-full"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full mt-2 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <LoaderCircle className="animate-spin mt-1" />
                <p>Updating...</p>
              </div>
            ) : (
              <p>Update</p>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUser;
