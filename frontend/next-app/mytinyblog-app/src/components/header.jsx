import { Title } from "@tailus-ui/typography";
import Link from "next/link";

export function Header({ title }) {
  return (
    <header className="px-8 py-6 border border-gray-900">
      <Link href="/" className="inline-block">
        <Title as="h1" size="2xl" weight="bold" href="/">
          {title}
        </Title>
      </Link>
    </header>
  );
}
