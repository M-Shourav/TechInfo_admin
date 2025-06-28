import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ThemToggler from "./ThemToggler";
import UserInfo from "./UserInfo";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <div className="bg-primary dark:bg-slate-700 text-white px-5 py-5 flex items-center justify-between">
      <Link href={"/"}>CoderCraft</Link>
      <div className="flex items-center gap-5">
        <ThemToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className=" cursor-pointer focus:outline-none">
            <UserInfo />
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
