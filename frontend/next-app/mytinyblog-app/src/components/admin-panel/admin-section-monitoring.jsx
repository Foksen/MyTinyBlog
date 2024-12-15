import { Title } from "@tailus-ui/typography";
import Card from "@tailus-ui/Card";

export function AdminSectionMonitoring() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <Title as="h1" size="2xl" weight="bold">
          Мониторинг
        </Title>
      </div>
      <Card variant="soft" className="mt-8 bg-gray-900 border border-gray-800">
        <div className="">
          <Title as="h1" size="xl" weight="semibold">
            Посещаемость сайта
          </Title>
        </div>
      </Card>
    </section>
  );
}
