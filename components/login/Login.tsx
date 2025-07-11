"use client";
import React, { useState } from "react";
import { Tabs, TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EyeIcon, EyeOff, LoaderCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { serverUrl } from "@/config/config";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${serverUrl}/api/secure/admin/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response?.data;
      if (data?.success) {
        toast.success(data?.message);
        window.location.href = "/";
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Admin log error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-sm mx-auto px-4 sm:px-0">
      <Tabs defaultValue="account" className="w-full">
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Admin Panel</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLoginForm}>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    autoComplete="on"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className={`${loading && "cursor-not-allowed"}`}
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    autoComplete="on"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className={`${loading && "cursor-not-allowed"}`}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className=" absolute top-8 right-3 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="w-full flex flex-col items-center justify-center mt-10">
                <Button
                  disabled={loading}
                  type="submit"
                  className={`w-full cursor-pointer ${
                    loading && "cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="animate-spin mt-1" />
                      <p>process...</p>
                    </div>
                  ) : (
                    <p> Log in</p>
                  )}
                </Button>
                <div className="mt-5 flex items-center gap-x-1">
                  <p className="text-gray-500 text-[13px]">
                    Don&apos;t have an account?
                  </p>
                  <Link
                    href={"/auth/signup"}
                    className="text-[13px] font-medium hover:underline hover:underline-offset-2"
                  >
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
