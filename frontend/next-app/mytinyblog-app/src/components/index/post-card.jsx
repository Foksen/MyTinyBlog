import { Text, Title } from "@tailus-ui/typography";
import Card from "@tailus-ui/Card";
import clsx from "clsx";

export function PostCard({ className, title, content, id }) {
  return (
    <Card
      variant="outlined"
      className={clsx(
        "relative bg-gray-900 border-gray-800 hover:bg-gray-925 transition-colors",
        className
      )}
      href={`/posts/${id}`}
    >
      <Title as="h4" className="line-clamp-3">
        {title}
      </Title>
      <Text className="my-0 mt-3 line-clamp-4">{content}</Text>
    </Card>
  );
}
