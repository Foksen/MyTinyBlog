import Image from "next/image";
import { Title, Text } from "@tailus-ui/typography";
import { Info, X } from "lucide-react";
import Popover from "@tailus-ui/Popover";
import Button from "@tailus-ui/Button";
import Card from "@tailus-ui/Card";
import Badge from "@tailus-ui/Badge";
import { PostCard } from "../components/index/post-card";
import { useEffect, useState } from "react";
import { requestGetPosts } from "../service/api";

function AccountPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button.Root
          variant="ghost"
          intent="gray"
          className="absolute right-4 top-4"
        >
          <Button.Icon type="only">
            <Info />
          </Button.Icon>
        </Button.Root>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content mixed className="max-w-xs bg-gray-925 border-gray-800">
          <Title size="base" as="div" weight="medium">
            Статистика
          </Title>
          <Text className="mt-2 mb-0">Просмотры: 0</Text>
          <Text className="mt-2 mb-0">Мне нравится: 2</Text>
          <Popover.Close asChild>
            <Button.Root variant="ghost" intent="gray" size="sm">
              <Button.Icon type="only">
                <X />
              </Button.Icon>
            </Button.Root>
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function SectionAccount() {
  return (
    <section className="mx-10 px-8">
      <Card
        variant="outlined"
        gradient="true"
        className="relative mx-auto max-w-7xl bg-gray-900 border-gray-800"
      >
        <div className="flex gap-10 items-center">
          <Image
            src="/images/AvatarExample.jpg"
            width="144"
            height="144"
            className="min-w-36 rounded-full border border-gray-800"
          />
          <div>
            <div className="flex gap-6 items-center">
              <Title as="h3" size="2xl" weight="bold" className="m-0">
                Игорь Жолобов
              </Title>
              <Badge size="sm" intent="accent" className="h-fit">
                Активный автор
              </Badge>
            </div>
            <Text className="max-w-2xl m-0 mt-3 line-clamp-3">
              Договор добросовестно использует судебный осциллятор. Погранслой
              арендует термодинамический поток. Тело искажает вексель. Сервитут
              устойчиво обязывает резонатор. Волна показательна.
            </Text>
            <AccountPopover />
          </div>
        </div>
      </Card>
    </section>
  );
}

function SectionPosts({ posts }) {
  return (
    <section className="mx-10 mt-10 px-8">
      <div className="mx-auto max-w-7xl grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {Array.from(posts).map((post, index) => (
          <PostCard
            key={index}
            title={post.title}
            content={post.content}
            id={post.id}
          />
        ))}
      </div>
    </section>
  );
}

export function LayoutIndex() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const data = await requestGetPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="min-h-screen w-full py-10">
      <SectionAccount />
      <SectionPosts posts={posts} />
    </main>
  );
}
