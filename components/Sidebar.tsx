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
        <CommandGroup heading="Suggestions">
          <CommandItem className="text-base">
            <Link
              href={"/"}
              className="inline-flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <LayoutDashboard />
              Dashboard
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/blogpost"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <Newspaper />
              Post
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/author"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <MdAutoFixHigh />
              Author
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/admin"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <Sparkles />
              Admin
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/categories"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <ChartColumnStacked />
              Categories
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/user"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <UserPen />
              Users
            </Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
