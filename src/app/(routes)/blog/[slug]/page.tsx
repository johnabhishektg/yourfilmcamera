import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Mdx } from "@/app/mdx/mdx-components";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: any) => {
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
        </div>
        <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 pt-4">
          <Link
            // href={`https://twitter.com/${author.twitter}`}
            href={`https://www.instagram.com/cinemahighway101/`}
            className="flex items-center space-x-2 text-sm"
          >
            <Avatar className="rounded-full bg-white" />
            {/* <img width={40} height={40} className="rounded-full bg-white" /> */}
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{post.author}</p>
              <p className="text-[12px] text-muted-foreground">
                @cinemahighway
              </p>
            </div>
          </Link>
        </div>
      </div>

      <Separator className="my-4" />
      {/* {post.image && (
          <AspectRatio ratio={16 / 9}>
          <Image
          src={post.image}
            alt={post.title}
            fill
            className="rounded-md border bg-muted"
            priority
          />
        </AspectRatio>
      )} */}
      <div>
        <Mdx code={post!.body.code} />
      </div>

      {/* <MdxPager currentItem={post} allItems={allPosts} /> */}
      <div className="flex justify-center items-center">
        <Link
          href="/blog"
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "mx-auto mt-4 w-fit",
            })
          )}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          See all posts
          <span className="sr-only">See all posts</span>
        </Link>
      </div>
    </div>
  );
};

export default PostLayout;
