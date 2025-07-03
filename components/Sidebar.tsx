import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import {
  ChartColumnStacked,
  CreditCard,
  LayoutDashboard,
  Newspaper,
  Settings,
  Sparkles,
  User,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import { MdAutoFixHigh } from "react-icons/md";

const Sidebar = () => {
  return (
    <Command className="min-h-screen bg-secondary">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="scroll">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions" className="text-[8px]">
          <CommandItem className="text-base">
            <Link
              href={"/"}
              className="inline-flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <LayoutDashboard />
              <p className="hidden sm:inline-flex">Dashboard</p>
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/blogpost"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <Newspaper />
              <p className="hidden sm:inline-flex"> Post</p>
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/author"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <MdAutoFixHigh />
              <p className="hidden sm:inline-flex">Author</p>
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/admin"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <Sparkles />
              <p className="hidden sm:inline-flex">Admin</p>
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/categories"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <ChartColumnStacked />
              <p className="hidden sm:inline-flex"> Categories</p>
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/user"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <UserPen />
              <p className="hidden sm:inline-flex">Users</p>
            </Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            <span className="hidden sm:inline-flex">Profile</span>
            <CommandShortcut className="hidden sm:inline-flex">
              ⌘P
            </CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span className="hidden sm:inline-flex">Billing</span>
            <CommandShortcut className="hidden sm:inline-flex">
              ⌘B
            </CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span className="hidden sm:inline-flex">Settings</span>
            <CommandShortcut className="hidden sm:inline-flex">
              ⌘S
            </CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
