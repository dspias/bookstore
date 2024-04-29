"use client";
import { useBook } from "@/hooks/use-book";
import { Book, User, Writer } from "@/schema";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FormCheckout } from "./form-checkout";

export const BookDetails = ({ bookId }: { bookId: number }) => {
  const { book }: { book: Book } = useBook({ bookId });

  if (!book) {
    return (
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Skeleton className="w-1/2 h-96" />
            <div className="lg:w-1/2 w-full lg:pl-10 grid grid-flow-row gap-y-2 auto-rows-max">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={book.coverImage}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 mb-5">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {book.title}
            </h1>
            <p className="leading-relaxed">
              <b>Written by </b>
              {book.writers.map((writer: Writer, index: number) => (
                <React.Fragment key={writer.id}>
                  {writer.name}
                  {index !== book.writers.length - 1 && <>{", "}</>}
                </React.Fragment>
              ))}
            </p>
            <div className="mt-1 text-sm text-gray-500">
              {book.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="mr-1 mb-1 uppercase"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
            <FormCheckout book={book} />
          </div>
        </div>
      </div>
    </section>
  );
};
