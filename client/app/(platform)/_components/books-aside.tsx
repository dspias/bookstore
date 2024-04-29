import { ScrollArea } from "@/components/ui/scroll-area";
import { Tag, Writer } from "@/schema";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTag } from "@/hooks/use-tag";
import { useWriter } from "@/hooks/use-writer";

export const BooksAside = () => {
  const { tags } = useTag();
  const { writers } = useWriter();

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
                    <Link
                      key={tag.id}
                      className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground capitalize"
                      href="/docs"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                  Writers
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  {writers.map((writer: Writer) => (
                    <Link
                      key={writer.id}
                      className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground capitalize"
                      href="/docs"
                    >
                      {writer.name}
                    </Link>
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
