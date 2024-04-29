import { Toaster } from "sonner";
import { Navbar } from "./_components/navbar";
import { QueryProvider } from "@/components/providers/query-provider";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>
        <Toaster />
        <div className="h-full">
          <Navbar />
          <div className="flex-1 pt-24">
            <div className="container flex-1 items-start">{children}</div>
          </div>
        </div>
      </QueryProvider>
    </>
  );
};

export default PlatformLayout;
