"use client";

import { Logo } from "@/components/logo";
import { MobileSidebar } from "./mobile-sidebar";
import { UserButton } from "./user-button";

export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm flex items-center border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="md:container flex h-14 max-w-screen-2xl items-center">
        <MobileSidebar />
        <div className="flex items-center gap-x-4">
          <Logo />
        </div>
        <div className="hidden md:flex ml-auto items-center gap-x-2">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
