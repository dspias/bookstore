"use client";

import { useAuth } from "@/hooks/auth";

const OrdersLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth({ middleware: "auth" });

  return <div>{children}</div>;
};

export default OrdersLayout;
