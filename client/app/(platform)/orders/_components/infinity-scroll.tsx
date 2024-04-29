"use client";

import { useState, Fragment, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

import { useUIDSeed } from "react-uid";
import type { GetServerSideProps } from "next";
import { axios } from "@/lib/axios";
import { Order } from "@/schema";
import { OrderItem } from "./order-item";

interface OrderProps {
  orders?: {
    pages: [
      {
        posts: [Order];
      }
    ];
    pageParams: [number | undefined];
  };
}

const getMoreOrders = async ({ pageParam = 1 }) => {
  const res = await axios(`/api/orders?page=${pageParam}`);
  return res.data;
};

export const InfinityScroll = ({ orders }: OrderProps) => {
  const seed = useUIDSeed();

  const [tagIds, setTagIds] = useState([]);

  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    [tagIds],
    getMoreOrders,
    {
      getNextPageParam: (page) =>
        page.meta.current_page === page.meta.last_page
          ? undefined
          : page.meta.current_page + 1,
    },
    { initialData: orders }
  );

  const loadMoreRef = useRef<HTMLDivElement>();

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <>
      <tbody>
        {isSuccess &&
          data?.pages?.map((page) => (
            <Fragment key={seed(page)}>
              {page.data.map((order: Order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </Fragment>
          ))}
      {isFetchingNextPage && (
        <>
          <OrderItem.Skeleton />
          <OrderItem.Skeleton />
          <OrderItem.Skeleton />
          <OrderItem.Skeleton />
        </>
      )}
      {isLoading && (
        <>
          <OrderItem.Skeleton />
          <OrderItem.Skeleton />
          <OrderItem.Skeleton />
          <OrderItem.Skeleton />
        </>
      )}
      </tbody>

    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await axios("/api/orders").then((res) => res.json());

  const orders = {
    pages: [{ data }],
    pageParams: [null],
  };

  return {
    props: {
      orders,
    },
  };
};
