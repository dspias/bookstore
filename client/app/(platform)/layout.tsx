import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      {children}
    </>
  );
};

export default PlatformLayout;
