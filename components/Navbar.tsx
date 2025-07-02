"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThemToggler from "./ThemToggler";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";
import { AdminType } from "@/types/adminType";
import axios from "axios";
import { serverUrl } from "@/config/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Navbar = () => {
  const [adminData, setAdminData] = useState<AdminType | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/secure/admin/me`, {
          withCredentials: true,
        });
        const data = res?.data;
        if (data?.success) {
          setAdminData(data?.admin);
          router?.refresh();
        }
      } catch (error) {
        console.log("fetch Admin error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [router]);
  return (
    <div className="bg-primary dark:bg-slate-700 text-white px-5 py-5 flex items-center justify-between">
      <Link href={"/"}>TechInfo</Link>
      <div className="flex items-center gap-5">
        <ThemToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className=" cursor-pointer focus:outline-none">
            {adminData?.adminAvatar ? (
              <Image
                src={adminData?.adminAvatar?.url}
                alt={adminData?.name}
                width={50}
                height={50}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className=" cursor-pointer">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
