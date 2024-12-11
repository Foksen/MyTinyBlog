import { Text, Title } from "@tailus-ui/typography";
import Card from "@tailus-ui/Card";
import clsx from "clsx";
import { parseMarkdownText } from "../../utils/parse-markdown";

export function PostCard({ className, title, content, id }) {
  return (
    <Card
      variant="outlined"
      className={clsx(
        "relative p-5 bg-gray-900 border-gray-800 hover:bg-gray-925 transition-colors",
        className
      )}
      href={`/posts/${id}`}
    >
      <Title as="h4" className="line-clamp-2 mb-2">
        {title}
      </Title>
      {parseMarkdownText({
        className: "space-y-[2px] overflow-hidden line-clamp-3",
        text: content,
        includeEmptyStrings: false,
        applyStyling: false,
      })}
    </Card>
  );
}
