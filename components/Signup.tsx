"use client";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import Image from "next/image";
import { CameraOff, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "./ui/switch";
import axios from "axios";
import { serverUrl } from "@/config/config";
import toast from "react-hot-toast";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const registerFunction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("isAdmin", String(isAdmin));
      if (imageUrl) {
        formData.append("adminAvatar", imageUrl);
      }

      const res = await axios.post(
        `${serverUrl}/api/secure/admin/register`,
        formData
      );
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
        router.push("/auth");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("admin register error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full max-w-md mx-auto flex-col gap-6 px-4 sm:px-0">
      <Card className="px-5">
        <CardHeader className="text-center">
          <CardTitle className="text-xs sm:text-sm">
            Signup in to admin panel
          </CardTitle>
          <CardDescription className="text-xs">
            Welcome Back! Please signup in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full p-0">
          <form onSubmit={registerFunction}>
            <div className="w-10 h-10 rounded-full border border-indigo-500 flex items-center justify-center relative">
              <Label htmlFor="imageUrl">
                {imageUrl ? (
                  <>
                    <Image
                      src={URL.createObjectURL(imageUrl)}
                      alt="profile-image"
                      width={10}
                      height={10}
                      priority
                      className="w-10 h-10 object-cover rounded-full cursor-pointer"
                    />
                  </>
                ) : (
                  <CameraOff size={22} className="cursor-pointer" />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  id="imageUrl"
                  name="imageUrl"
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setImageUrl(e.target.files?.[0]);
                    }
                  }}
                />
              </Label>
            </div>
            <div>
              <label htmlFor="name" className="font-semibold text-xs">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="on"
                placeholder="Enter username"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className={`w-full border outline-none h-10 px-4 rounded-md
           focus:border-blue-600 placeholder:text-[13px] ${
             loading ? "cursor-not-allowed" : ""
           }`}
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold text-xs">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="john@gmail.com"
                autoComplete="on"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className={`w-full border outline-none h-10 px-4 rounded-md
            focus:border-blue-600 placeholder:text-[13px] ${
              loading ? "cursor-not-allowed" : ""
            }`}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="font-semibold text-xs">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="off"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className={`w-full border outline-none h-10 px-4 rounded-md
            focus:border-blue-600 placeholder:text-[13px] ${
              loading ? "cursor-not-allowed" : ""
            }`}
              />
              {password && (
                <span
                  className=" absolute top-10 right-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              )}
            </div>
            <div className="flex items-center gap-x-2 my-4">
              <Label htmlFor="isAdmin" className="text-xs">
                isAdmin
              </Label>
              <Switch
                id="isAdmin"
                name="isAdmin"
                className={`cursor-pointer ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                checked={isAdmin}
                onCheckedChange={() => setIsAdmin(!isAdmin)}
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              size="icon"
              className=" cursor-pointer text-xs w-full"
            >
              {loading ? (
                <div className="flex items-center gap-x-1">
                  <Loader2 className="mt-1 animate-spin" />
                  <p>Loading...</p>
                </div>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-1">
          <p className="text-gray-500 text-[13px]">Already have an account?</p>
          <Link
            href={"/auth"}
            className="text-[13px] font-medium hover:underline hover:underline-offset-2"
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
