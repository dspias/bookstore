"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tag, Writer } from "@/schema";
import React, { useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTag } from "@/hooks/use-tag";
import { useWriter } from "@/hooks/use-writer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export const BooksAside = () => {
  const { tags } = useTag();
  const { writers } = useWriter();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  if (!tags || !writers) {
    return (
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea dir="ltr" className="relative overflow-hidden h-4/5 pr-6">
          <div className="h-full w-full rounded-[inherit]">
            <div style={{ minWidth: "100%", display: "table" }}>
              <div className="w-full">
                <div className="pb-4">
                  <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                    Tags
                  </h4>
                  <div className="grid grid-flow-row gap-y-2 auto-rows-max text-sm">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="pb-4">
                  <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                    Writers
                  </h4>
                  <div className="grid grid-flow-row gap-y-2 auto-rows-max text-sm">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>
    );
  }

  return (
    <aside className="fixed top-14 z-30 -ml-2 h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky">
      <ScrollArea dir="ltr" className="relative overflow-hidden h-4/5 pr-6">
        <div className="h-full w-full rounded-[inherit]">
          <div style={{ minWidth: "100%", display: "table" }}>
            <div className="w-full">
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                  Tags
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  {tags.map((tag: Tag) => (
                    <p
                      key={tag.id}
                      onClick={() => {
                        router.push(
                          pathname +
                            "?" +
                            createQueryString("tag", tag.id.toString())
                        );
                      }}
                      className={cn(
                        "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground capitalize cursor-pointer",
                        searchParams.get("tag") === tag.id.toString() &&
                          "text-green-500"
                      )}
                    >
                      {tag.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                  Writers
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  {writers.map((writer: Writer) => (
                    <p
                      key={writer.id}
                      onClick={() => {
                        router.push(
                          pathname +
                            "?" +
                            createQueryString("writer", writer.id.toString())
                        );
                      }}
                      className={cn(
                        "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground capitalize cursor-pointer",
                        searchParams.get("writer") === writer.id.toString() &&
                          "text-green-500"
                      )}
                    >
                      {writer.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
