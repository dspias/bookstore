import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Book } from "@/schema";
import Link from "next/link";
import React from "react";

export const BookItem = ({
  book,
  innerRef,
}: {
  book: Book;
  innerRef?: (node?: Element | null | undefined) => void;
}) => {
  return (
    <>
      <div className="group relative" ref={innerRef}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-900 capitalize">
              <Link href={`/books/${book.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {book.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              <b>Writers: </b>
              {book.writers && book.writers.map((writer, index) => (
                <React.Fragment key={writer.id}>
                  {writer.name}
                  {index !== book.writers.length - 1 && <>{", "}</>}
                </React.Fragment>
              ))}
            </p>
            <div className="mt-1 text-sm text-gray-500">
              {book.tags && book.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="mr-1 mb-1">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          <p className="text-sm font-medium text-gray-900">${book.points}</p>
        </div>
      </div>
    </>
  );
};

BookItem.Skeleton = function SkeletonBookItem() {
  return (
    <div className="grid grid-flow-row gap-y-2 auto-rows-max">
      <Skeleton className="h-72 w-full" />
    </div>
  );
};
