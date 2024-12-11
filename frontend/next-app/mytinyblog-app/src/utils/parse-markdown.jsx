import { Text } from "@tailus-ui/typography";
import clsx from "clsx";

function countLeadingHashes(str) {
  const match = str.match(/^(#{1,3})\s/);
  if (match) {
    return match[1].length;
  }
  return 0;
}

export function parseParagraph(paragraph, id, applyStyling) {
  const headerLevel = countLeadingHashes(paragraph);
  const text = paragraph.replace(/^(#+)?\s*/, "");
  return (
    <Text
      className={clsx(
        "m-0",
        applyStyling && headerLevel == 1 && "text-2xl font-bold text-white",
        applyStyling && headerLevel == 2 && "text-xl font-bold text-white",
        applyStyling && headerLevel == 3 && "text-lg font-semibold text-white",
        text == "" && "text-sm"
      )}
      key={id ?? null}
    >
      {text || "⠀"}
    </Text>
  );
}

export function parseMarkdownText({
  className,
  text,
  includeEmptyStrings = true,
  applyStyling = true,
}) {
  if (text == null) {
    return <div className={className}></div>;
  }

  const lines = text.split("\n");
  const trimmedLines = lines
    .filter((line) => includeEmptyStrings || line != "")
    .map((line) => line.trim());
  return (
    <div className={className}>
      {Array.from(trimmedLines).map((line, index) =>
        parseParagraph(line, index, applyStyling)
      )}
    </div>
  );
}
