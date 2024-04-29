import Link from "next/link";
import AuthCard from "@/app/(auth)/AuthCard";
import { Logo } from "@/components/logo";

export const metadata = {
  title: "Laravel",
};

const Layout = ({ children }) => {
  return (
    <div>
      <div className="font-sans text-gray-900 antialiased">
        <AuthCard logo={<Logo />}>{children}</AuthCard>
      </div>
    </div>
  );
};

export default Layout;
