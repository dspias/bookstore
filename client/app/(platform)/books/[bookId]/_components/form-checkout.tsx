"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Book, User } from "@/schema";
import { Fragment, useState } from "react";
import { useOrder } from "@/hooks/use-order";

export const FormCheckout = ({ book }: { book: Book }) => {
  const { user }: { user: User } = useUser();
  const { createOrder } = useOrder();

  const [errors, setErrors] = useState();

  const onSubmit = (formData: FormData) => {
    const quantity = formData.get("quantity") as string;
    const bookId = formData.get("bookId") as string;

    createOrder({
      setErrors,
      quantity,
      book_id: bookId,
    });
  };

  return (
    <form action={onSubmit}>
      <div className="flex mt-6 items-center pb-5 border-t-2 border-gray-200">
        <div className="flex items-center">
          <FormInput
            id="quantity"
            label="Quantity"
            defaultValue="1"
            type="number"
            errors={errors}
          />
          <input hidden value={book.id} name="bookId" />
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
          <Fragment>
            {book.points <= user.points && (
              <FormSubmit className="flex ml-auto bg-neutral-700 hover:bg-neutral-900 text-white">
                Checkout
              </FormSubmit>
            )}
          </Fragment>
        ) : (
          <Button size="sm" variant="outline" className="flex ml-auto" asChild>
            <Link href="/login">Login to Checkout</Link>
          </Button>
        )}
      </div>
    </form>
  );
};
