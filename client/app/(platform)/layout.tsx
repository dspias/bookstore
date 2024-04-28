import { Toaster } from "sonner";
import { Navbar } from "./_components/navbar";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <div className="h-full">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default PlatformLayout;
