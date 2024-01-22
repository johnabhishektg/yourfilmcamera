import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Post, allPosts } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function PostCard(post: Post) {
  return (
    <div className="">
      <Link
        href={post.url}
        className=" text-blue-700 hover:text-blue-900"
        legacyBehavior
      >
        <AspectRatio ratio={16 / 9}>
          <Image
            priority
            fill
            src={post.image}
            alt={post.title}
            className="rounded-md cursor-pointer border object-cover"
          />
        </AspectRatio>
      </Link>
      <>
        <h3 className="mt-2 text-2xl font-semibold leading-none tracking-tight">
          {post.title}
        </h3>
        <time dateTime={post.date} className="block my-1 text-xs ">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <p className="text-sm text-muted-foreground">{post.description}</p>
      </>
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const poems = posts.filter((post) => post.genre == "Poem");
  const films = posts.filter((post) => post.genre == "Film");

  return (
    <div className="container md:pb-10">
      <PageHeader>
        <PageHeaderHeading>Blog</PageHeaderHeading>
        <p className="text-muted-foreground text-sm">
          Explore the latest news and updates from the community
        </p>
      </PageHeader>
      <Separator className="my-6" />

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {poems.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </section>
      <Separator className="my-6" />

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {films.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </section>
    </div>
  );
}
