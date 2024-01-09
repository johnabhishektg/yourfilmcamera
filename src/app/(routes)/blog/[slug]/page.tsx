import { format } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

export const generateStaticParams = async () =>
  // eslint-disable-next-line @typescript-eslint/require-await
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: any) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return { title: post!.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  const Content = getMDXComponent(post!.body.code);

  if (!post) {
    notFound();
  }

  return (
    <div className="container max-w-3xl py-8 md:py-10 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        See all posts
      </Link>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {post.date && (
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          )}
          {post.date ? <div>•</div> : null}
        </div>
        <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">
          {post.title}
        </h1>
      </div>

      <div
        className={cn(
          "group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
        )}
      >
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
            <Content />
          </div>
        </div>
        <Link href={"/"} className="absolute inset-0">
          <span className="sr-only">View</span>
        </Link>
      </div>
      <Separator className="my-4" />
      {/* <MdxPager currentItem={post} allItems={allPosts} /> */}
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost", className: "mx-auto mt-4 w-fit" })
        )}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        See all posts
        <span className="sr-only">See all posts</span>
      </Link>
    </div>
  );
};

export default PostLayout;
