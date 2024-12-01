import { Title } from "@tailus-ui/typography";

export function Header({ title }) {
  return (
    <header className="px-8 py-6 border border-gray-900">
      <Title as="h1" size="2xl" weight="bold">
        {title}
      </Title>
    </header>
  );
}
