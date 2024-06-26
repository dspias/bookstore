import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const headingFont = localFont({ src: "../public/fonts/font.woff2" });

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 flex">
        <Image src="/logo.svg" alt="Logo" height={40} width={40} />
        <p className={cn("text-2xl text-neutral-700", headingFont.className)}>
          {process.env.NEXT_PUBLIC_APP_NAME}
        </p>
      </div>
    </Link>
  );
};
