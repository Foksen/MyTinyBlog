import { Display } from "@tailus-ui/typography";
import Card from "@tailus-ui/Card";
import { parseMarkdownText } from "../utils/parse-markdown";

export function SectionContent({ post }) {
  console.log(post);
  return (
    <section className="mx-10 px-8">
      <Card
        variant="outlined"
        className="mx-auto max-w-screen-lg px-12 py-10 bg-gray-900 border-gray-800"
      >
        <div className="flex flex-col gap-5">
          <Display as="h1" size="4xl" className="my-0 mb-2">
            {post.title}
          </Display>
          {parseMarkdownText({
            text: post.content,
          })}
        </div>
      </Card>
    </section>
  );
}

export function LayoutPost({ post }) {
  return (
    <main className="min-h-screen w-full py-10">
      <SectionContent post={post} />
    </main>
  );
}
