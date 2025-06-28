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
  Calculator,
  Calendar,
  CreditCard,
  LayoutDashboard,
  Newspaper,
  Settings,
  Smile,
  User,
  Wand,
} from "lucide-react";
import Link from "next/link";
import { MdAutoFixHigh, MdCategory, MdDashboard } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";

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
              <MdDashboard className="text-black" />
              Dashboard
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/blogpost"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <Newspaper className="text-black" />
              Post
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/author"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <MdAutoFixHigh className="text-black" />
              Author
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/categories"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <MdCategory className="text-black" />
              Categories
            </Link>
          </CommandItem>
          <CommandItem className="text-base">
            <Link
              href={"/user"}
              className="flex items-center justify-center md:justify-normal gap-3 font-semibold"
            >
              <PiUserListBold className="text-black" />
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
