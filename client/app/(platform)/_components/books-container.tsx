"use client";

import { Book } from "@/schema";
import { BooksAside } from "./books-aside";
import { BookItem } from "./book-item";
import { useBook } from "@/hooks/use-book";

export const BooksContainer = () => {
  const { books } = useBook();

  return (
    <div className="flex-1 pt-24">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <div className="hidden md:block">
          <BooksAside />
        </div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customers also purchased
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {!books ? (
                <BookItem.Skeleton />
              ) : (
                <>
                  {books.map((book: Book) => (
                    <BookItem key={book.id} book={book} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
