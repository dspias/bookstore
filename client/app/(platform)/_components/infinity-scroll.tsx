"use client";

import { useState, Fragment, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

import { useUIDSeed } from "react-uid";
import type { GetServerSideProps } from "next";
import { axios } from "@/lib/axios";
import { Book } from "@/schema";
import { BookItem } from "./book-item";
import { useSearchParams } from "next/navigation";

interface BookProps {
  books?: {
    pages: [
      {
        posts: [Book];
      }
    ];
    pageParams: [number | undefined];
  };
}

const getMoreBooks = async ({ pageParam = 1 }) => {
  const res = await axios(`/api/books?page=${pageParam}`);
  return res.data;
};

export const InfinityScroll = ({ books }: BookProps) => {
  const seed = useUIDSeed();

  const [tagIds, setTagIds] = useState([]);

  const searchParams = useSearchParams();
  const qtag = searchParams.get("tag");
  const qwriter = searchParams.get("writer");

  const filteredItems = (items: Array<Book>) => {
    return items.filter((item: Book) => {
      const tagIds = item?.tags?.map(tag => tag.id) || [];
      const writerIds = item?.writers?.map(writer => writer.id) || [];
      const hasTag = qtag ? tagIds.includes(Number(qtag)) : true;
      const hasWriter = qwriter ? writerIds.includes(Number(qwriter)) : true;
      return (hasTag && hasWriter);
    });
  };

  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    [tagIds],
    getMoreBooks,
    {
      getNextPageParam: (page) =>
        page.meta.current_page === page.meta.last_page
          ? undefined
          : page.meta.current_page + 1,
    },
    { initialData: books }
  );

  const loadMoreRef = useRef<HTMLDivElement>();

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {isSuccess &&
          data?.pages?.map((page) => (
            <Fragment key={seed(page)}>
              {filteredItems(page.data).map((book: Book) => (
                <BookItem key={book.id} book={book} />
              ))}
            </Fragment>
          ))}
      </div>

      <div ref={loadMoreRef} className={`${!hasNextPage ? "hidden" : ""}`}>
        {isFetchingNextPage && (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <BookItem.Skeleton />
            <BookItem.Skeleton />
            <BookItem.Skeleton />
            <BookItem.Skeleton />
          </div>
        )}
      </div>
      {isLoading && (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <BookItem.Skeleton />
          <BookItem.Skeleton />
          <BookItem.Skeleton />
          <BookItem.Skeleton />
          <BookItem.Skeleton />
          <BookItem.Skeleton />
          <BookItem.Skeleton />
          <BookItem.Skeleton />
        </div>
      )}

      {!hasNextPage && !isLoading && (
        <div className="text-center bg-gray-50 p-8 rounded-md text-gray-400 text-xl mt-14">
          Congrats! You have scrolled through all the books
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await axios("/api/books").then((res) => res.json());

  const books = {
    pages: [{ data }],
    pageParams: [null],
  };

  return {
    props: {
      books,
    },
  };
};
