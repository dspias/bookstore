import { Skeleton } from "@/components/ui/skeleton";
import { Book } from "@/schema";
import React from "react";

export const BookItem = ({ book }: { book: Book }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={`/books/${book.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {book.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{book.points}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{book.points}</p>
      </div>
    </div>
  );
};

BookItem.Skeleton = function SkeletonBookItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
