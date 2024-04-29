"use client";
import { useBook } from "@/hooks/use-book";
import { Book, User, Writer } from "@/schema";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const BookDetails = ({ bookId }: { bookId: number }) => {
  const { book }: { book: Book } = useBook({ bookId });
  const { user }: { user: User } = useUser();
  const [fieldErrors, setFieldErrors] = useState();

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
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
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
            <form>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex items-center">
                  <FormInput
                    id="quantity"
                    label="Quantity"
                    defaultValue="1"
                    type="number"
                    errors={fieldErrors}
                  />
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-xl text-gray-900">
                  ${book.points} points
                  {user && (
                    <>
                      <br />
                      <span
                        className={cn(
                          "text-sm",
                          book.points <= user.points
                            ? "text-neutral-500"
                            : "text-red-500"
                        )}
                      >
                        You have ${user.points} points
                      </span>
                    </>
                  )}
                </span>
                {user ? (
                  <React.Fragment>
                    {book.points <= user.points && (
                      <FormSubmit className="flex ml-auto bg-neutral-700 hover:bg-neutral-900 text-white">
                        Checkout
                      </FormSubmit>
                    )}
                  </React.Fragment>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex ml-auto"
                    asChild
                  >
                    <Link href="/login">Login to Checkout</Link>
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
