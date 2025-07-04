"use client";
import { serverUrl } from "@/config/config";
import { AdminType } from "@/types/adminType";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const Profile = () => {
  const [adminData, setAdminData] = useState<AdminType | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/secure/admin/me`, {
          withCredentials: true,
        });
        if (res.data?.success) {
          setAdminData(res.data.admin);
          setName(res.data.admin.name);
        }
      } catch (err) {
        console.log("Error loading admin:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!adminData?._id) {
        console.error("Admin ID not found");
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      const res = await axios.put(
        `${serverUrl}/api/secure/admin/update/${adminData?._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        alert("Profile updated!");
        setAdminData(res.data.admin);
      }
    } catch (err) {
      console.log("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>My Account</CardTitle>
          <CardDescription>
            {" "}
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate}>
            <div className="w-20 h-20 flex items-center justify-center rounded-full">
              {adminData?.adminAvatar && (
                <Image
                  src={adminData?.adminAvatar?.url}
                  alt="profile-image"
                  width={50}
                  height={50}
                  className="w-20 h-20 object-cover rounded-full"
                />
              )}
            </div>
            <div>
              <label className="block mb-2 text-xs sm:text-sm font-medium">
                Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`mb-4 ${loading ? "cursor-not-allowed" : ""}`}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-2 text-xs sm:text-sm font-medium">
                Email (read only)
              </label>
              <Input
                type="email"
                value={adminData?.email}
                disabled
                className="mb-4"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full text-xs cursor-pointer`}
            >
              {loading ? (
                <div className="flex items-center gap-x-1">
                  <Loader2 className="mt-1 animate-spin" />
                  <p>Process...</p>
                </div>
              ) : (
                <p>Update Profile</p>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
