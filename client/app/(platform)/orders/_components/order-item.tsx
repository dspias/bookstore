import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@/schema";
import { format } from "date-fns";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOrder } from "@/hooks/use-order";

export const OrderItem = ({ order }: { order: Order }) => {
  const { cancelOrder } = useOrder();

  const onClick = () => {
    cancelOrder({ orderId: order.id });
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {order.oid}
      </th>
      <td className="px-6 py-4 capitalize">{order.book.title}</td>
      <td className="px-6 py-4">{order.quantity}</td>
      <td className="px-6 py-4">{order.points}</td>
      <td className="px-6 py-4">
        {format(new Date(order.createdAt), "MMM d, yyyy")}
      </td>
      <td className="px-6 py-4">
        {order.status === "canceled" && (
          <Badge
            variant="secondary"
            className="capitalize text-white bg-red-500"
          >
            {order.status}
          </Badge>
        )}
        {order.status === "placed" && (
          <Badge
            variant="secondary"
            className="capitalize text-white bg-gray-500"
          >
            {order.status}
          </Badge>
        )}
        {order.status === "completed" && (
          <Badge
            variant="secondary"
            className="capitalize text-white bg-green-600"
          >
            {order.status}
          </Badge>
        )}
      </td>
      {order.status === "placed" && (
        <td className="px-6 py-4 text-right">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={onClick} className="text-red-400">
                Cancel
              </TooltipTrigger>
              <TooltipContent>
                <p>Cancel your order</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </td>
      )}
    </tr>
  );
};

OrderItem.Skeleton = function SkeletonBookItem() {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Skeleton className="h-10 w-full" />
      </th>
      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Skeleton className="h-10 w-full" />
      </th>
      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Skeleton className="h-10 w-full" />
      </th>
      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Skeleton className="h-10 w-full" />
      </th>
      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Skeleton className="h-10 w-full" />
      </th>
    </tr>
  );
};
