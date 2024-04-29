import React from "react";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/hooks/use-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListOrdered, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const UserButton = () => {
  const { logout } = useAuth();
  const { user } = useUser();

  return (
    <div className="ml-auto flex items-center gap-x-2">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="cursor-pointer"
            >
              <span>
                {user?.name}
                <User className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/orders" className="flex">
                <ListOrdered className="mr-2 h-4 w-4" />
                <span>My orders</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">
              Get {process.env.NEXT_PUBLIC_APP_NAME} free
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
