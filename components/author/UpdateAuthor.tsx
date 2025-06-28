import { Author } from "@/types/author";
import React, { useState } from "react";
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
import { LoaderCircle, Pencil } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
interface Props {
  author: Author;
  onUpdate: () => void;
}

const UpdateAuthor = ({ author, onUpdate }: Props) => {
  const [name, setName] = useState(author?.name);
  const [email, setEmail] = useState(author?.email);
  const [bio, setBio] = useState(author?.bio);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/admin/updateAuthor/${author?._id}`,
        {
          name,
          email,
          bio,
        },
        {
          withCredentials: true,
        }
      );
      const data = res?.data;
      if (data?.success) {
        onUpdate();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Author Update error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Author</DialogTitle>
          <DialogDescription>Update author details</DialogDescription>
        </DialogHeader>
        <div className=" grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className=" space-y-2">
            <Label>Edit Bio</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="resize-none"
              rows={5}
              cols={33}
            />
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

export default UpdateAuthor;
