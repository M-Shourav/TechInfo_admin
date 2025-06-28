"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      const data = response?.data;
      if (data?.success) {
        router.push("/auth");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DropdownMenuItem>
      <span className="cursor-pointer" onClick={handleLogout}>
        Logout
      </span>
    </DropdownMenuItem>
  );
};

export default LogoutButton;
