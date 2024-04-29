"use client";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient= new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
