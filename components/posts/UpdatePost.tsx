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
import toast from "react-hot-toast";
import axios from "axios";
import { PostType } from "@/types/post";
interface Props {
  post: PostType;
  onUpdate: () => void;
}

const UpdatePost = ({ post, onUpdate }: Props) => {
  const [title, setTitle] = useState(post?.title);
  const [summary, setSummary] = useState(post?.summary);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/post/updatePost/${post?._id}`,
        {
          title,
          summary,
        },
        {
          withCredentials: true,
        }
      );
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
        onUpdate();
        setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>Update post details</DialogDescription>
        </DialogHeader>
        <div className=" grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Summary</Label>
            <Input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
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

export default UpdatePost;
