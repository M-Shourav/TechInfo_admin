"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { Author } from "@/types/author";
import { CategoryType } from "@/types/categories";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { CloudUpload, LoaderCircle } from "lucide-react";
import Image from "next/image";
import RichTextEditor from "../rich-text-editor";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { Switch } from "../ui/switch";

type SelectOption = {
  value: string;
  label: string;
};

const Select = dynamic(() => import("react-select"), { ssr: false });
const PostForm = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [post, setPost] = useState<any>("");
  const [selectAuthor, setSelectAuthor] = useState<SelectOption | null>(null);
  const [selectCategories, setSelectCategories] = useState<SelectOption[]>([]);
  const [authors, setAuthors] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);

  const router = useRouter();

  const onChange = (content: JSONContent) => {
    setPost(content);
  };

  useEffect(() => {
    const getAuthorList = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:8000/api/admin/AlAuthors",
          {
            withCredentials: true,
          }
        );
        const data = res?.data;
        if (data?.success) {
          setAuthors(data?.author);
        }
      } catch (error) {
        console.log("Author fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const getCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8000/api/category/getCategories",
          {
            withCredentials: true,
          }
        );
        const data = res?.data;
        if (data?.success) {
          setCategoriesList(data?.categories);
        }
      } catch (error) {
        console.error("Categories getting error:", error);
      } finally {
        setLoading(false);
      }
    };
    getAuthorList();
    getCategories();
  }, []);

  // Author Format options for react-select
  const option = authors?.map((author: Author) => ({
    value: author?._id,
    label: author?.name,
    email: author?.email,
    image: author?.coverImage,
  }));

  // Categories Format options for react-select
  const options = categoriesList?.map((categories: CategoryType) => ({
    value: categories?._id,
    label: categories?.name,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("isPublished", String(isActive));
      formData.append("content", JSON.stringify(post));
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }
      if (selectAuthor) {
        formData.append("author", selectAuthor.value);
      }

      selectCategories.forEach((category) => {
        formData.append("categories", category.value);
      });

      const res = await axios.post(
        "http://localhost:8000/api/post/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const data = res?.data;

      if (data?.success) {
        toast.success(data?.message);
        router.push("/blogpost/post-list");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Post submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Create Post From</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div
            className="w-32 h-32 border-dashed border-2 flex 
                items-center justify-center relative border-gray-400 rounded-md"
          >
            <Label htmlFor="cover">
              {coverImage ? (
                <Image
                  src={URL.createObjectURL(coverImage)}
                  alt="cover-image"
                  width={50}
                  height={50}
                  className="w-[120px] h-[120px] object-cover"
                />
              ) : (
                <div
                  className=" absolute top-0 left-0 w-full h-full flex items-center 
                      justify-center cursor-pointer"
                >
                  <CloudUpload size={75} />
                </div>
              )}
              <Input
                hidden
                type="file"
                accept="image/*"
                id="cover"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setCoverImage(e.target.files?.[0]);
                  }
                }}
              />
            </Label>
          </div>
          <div className=" space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              cols={1}
              rows={6}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Body</Label>
            <RichTextEditor content={post} onChange={onChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Select
              id="author"
              options={option}
              value={selectAuthor}
              onChange={(val) => setSelectAuthor(val as SelectOption)}
              placeholder="Select Author"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <Select
              id="categories"
              isMulti
              options={options}
              value={selectCategories}
              onChange={(val) => setSelectCategories(val as SelectOption[])}
              placeholder="select Categories"
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
              onCheckedChange={(checked: boolean) => setIsActive(checked)}
              disabled={loading}
            />
          </div>
          <Button disabled={loading} type="submit" className="cursor-pointer">
            {loading ? (
              <div className="flex items-center space-x-2">
                <LoaderCircle className="mt-1 animate-spin" />
                <p>processing...</p>
              </div>
            ) : (
              <p> Create Post</p>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
