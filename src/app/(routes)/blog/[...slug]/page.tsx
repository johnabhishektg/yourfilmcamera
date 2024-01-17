import { Mdx } from "@/app/mdx/mdx-components";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { buttonVariants } from "@/components/ui/Button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { cn, formatDate } from "@/lib/utils";
import { allAuthors, allPosts } from "contentlayer/generated";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find(
    (post) => post._raw.flattenedPath.split("/").slice(1).join("/") === slug
  );

  if (!post) {
    null;
  }

  return post;
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.split("/").slice(1).join("/").split("/"),
  }));
}

export const generateMetadata = async ({ params }: PostPageProps) => {
  const post = await getPostFromParams(params);
  return {
    title: post!.title,
    description: post!.description,
    authors: post!.author.map((author) => ({
      name: author,
    })),
  };
};

const PostLayout = async ({ params }: PostPageProps) => {
  const post = await getPostFromParams(params);

  const authors = post!.author.map((author) =>
    allAuthors.find(() => "cinemahighway101" == author.replace(/\r$/, ""))
  );

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

        <div className="mt-4 flex space-x-4">
          {authors.map((author) =>
            author ? (
              <Link
                href={`https://www.instagram.com/${author.instagram}`}
                className="flex items-center space-x-2 text-sm"
              >
                <Avatar className="rounded-full bg-white">
                  <AvatarImage
                    src={author.avatar}
                    alt={`@${author.instagram}`}
                  />
                </Avatar>
                <div className="flex-1 text-left leading-tight">
                  <p className="font-medium">{author.title}</p>
                  <p className="text-[12px] text-muted-foreground">
                    @{author.instagram}
                  </p>
                </div>
              </Link>
            ) : null
          )}

          {/* <Link
            href={`https://www.instagram.com/cinemahighway101`}
            className="flex items-center space-x-2 text-sm"
          >
            <Avatar className="rounded-full bg-white">
              <AvatarImage
                src={author.avatar}
                alt={`@${author.instagram}`}
              />
            </Avatar>
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">Shakti Iyer</p>
              <p className="text-[12px] text-muted-foreground">
                @cinemahighway101
              </p>
            </div>
          </Link> */}
        </div>
      </div>

      <Separator className="my-4" />
      {post.image && (
        <AspectRatio ratio={16 / 9}>
          <Image
            priority
            fill
            src={post.image}
            alt={post.title}
            className="rounded-md border bg-muted object-cover"
          />
        </AspectRatio>
      )}
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
