import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

function PostCard(post: Post) {
  return (
    <Link
      href={post.url}
      className=" text-blue-700 hover:text-blue-900"
      legacyBehavior
    >
      <Card className="p-6 cursor-pointer">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <time
            dateTime={post.date}
            className="block mb-2 text-xs text-gray-600"
          >
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <CardDescription>{post.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="container md:pb-10">
      <PageHeader>
        <PageHeaderHeading>Blog</PageHeaderHeading>
        <p className="text-muted-foreground font-medium ">
          Explore the latest news and updates from the community
        </p>
      </PageHeader>
      <Separator className="my-6" />
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </section>
    </div>
  );
}
