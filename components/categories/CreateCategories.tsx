"use client";
import React, { FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { serverUrl } from "@/config/config";

const CreateCategories = () => {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${serverUrl}/api/category/categories`, {
        name,
        isActive,
      });
      const data = res?.data;
      if (data?.success) {
        router.push("/categories/category-list");
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Categories create error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-screen-md">
      <CardHeader>
        <CardTitle>Categories List</CardTitle>
        <CardDescription>
          A category defines a group or type of content/products, with a unique
          name and slug.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name of categories"
                autoComplete="on"
                required
                value={name}
                disabled={loading}
                onChange={(e) => setName(e.target.value)}
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
                disabled={loading}
              />
            </div>
          </div>
          <Button
            className="mt-10 cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-x-1">
                <Loader2 className="mt-1 animate-spin" />
                <p>process...</p>
              </div>
            ) : (
              <p>submit</p>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCategories;
