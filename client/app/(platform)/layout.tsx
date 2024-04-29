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
          {children}
        </div>
      </QueryProvider>
    </>
  );
};

export default PlatformLayout;
