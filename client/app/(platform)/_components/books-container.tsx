"use client";

import { siteConfig } from "@/config/site";
import { BooksAside } from "./books-aside";
import { InfinityScroll } from "./infinity-scroll";

export const BooksContainer = () => {
  return (
    <>
      <div className="hidden md:block">
        <BooksAside />
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Books at {siteConfig.name}
          </h2>
          <InfinityScroll />
        </div>
      </div>
    </>
  );
};
