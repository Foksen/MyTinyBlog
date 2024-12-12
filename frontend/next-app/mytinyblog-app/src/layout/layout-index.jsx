import Image from "next/image";
import { Title, Text } from "@tailus-ui/typography";
import { Info, X } from "lucide-react";
import Popover from "@tailus-ui/Popover";
import Button from "@tailus-ui/Button";
import Card from "@tailus-ui/Card";
import Badge from "@tailus-ui/Badge";
import { PostCard } from "../components/index/post-card";
import { useEffect, useRef, useState } from "react";
import { requestCreateSubscription, requestGetPosts } from "../service/api";
import { IconMail } from "../../public/icons/icon-mail";
import { IconThumbUp } from "../../public/icons/icon-thumb-up";
import clsx from "clsx";
import Dialog from "@tailus-ui/Dialog";
import Label from "@tailus-ui/Label";
import Input from "@tailus-ui/Input";
import { validateEmail } from "../utils/validate-email";
import { parseMarkdownText } from "../utils/parse-markdown";

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
          <Text className="mt-2 mb-0">Понравилось: 0</Text>
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

function AccountActions({ className }) {
  const closeCreateDialog = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
  });

  const createSubscription = async (postRequest) => {
    try {
      let res = await requestCreateSubscription(postRequest);
      if (closeCreateDialog.current) {
        closeCreateDialog.current.dispatchEvent(
          new Event("click", { bubbles: true })
        );
      }
      setFormData({
        email: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(formData.email)) {
      createSubscription(JSON.stringify(formData));
    } else {
      alert("Неверный email");
    }
  };

  return (
    <div className={clsx("flex flex-col gap-3", className)}>
      <Image
        src="/images/1.jpg"
        width="192"
        height="192"
        className="mb-2 min-w-48 border border-gray-800 rounded-lg"
        alt="blog image"
      />

      <Button.Root
        variant="outlined"
        intent="primary"
        className="outline-transparent gap-2"
      >
        <Button.Icon size="sm" type="leading">
          <IconThumbUp strokeWidth="4" />
        </Button.Icon>
        <Button.Label>Мне нравится</Button.Label>
      </Button.Root>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button.Root
            variant="outlined"
            intent="secondary"
            className="outline-transparent gap-2"
          >
            <Button.Icon size="sm" type="leading">
              <IconMail strokeWidth="4" />
            </Button.Icon>
            <Button.Label>Подписаться</Button.Label>
          </Button.Root>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="z-40 bg-gray-950/20" />
          <Dialog.Content
            className="z-50 p-8 max-w-lg bg-gray-900 border border-gray-800"
            onPointerDownOutside={(e) => e.preventDefault()}
            fancy
          >
            <Dialog.Title className="text-2xl mb-4">Подписаться</Dialog.Title>

            <Text className="m-0 mb-4">
              Подписавшись на блог, вы сможете получать на указанную почту
              сообщения о новых постах
            </Text>

            <form onSubmit={handleSubmit}>
              <div className="space-y-2.5">
                <Label size="md" htmlFor="title">
                  Ваша почта
                </Label>
                <Input
                  variant="soft"
                  className="bg-gray-800 transition-colors"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>

            <Dialog.Actions className="-mx-[--card-padding] px-[--card-padding]">
              <Dialog.Close asChild>
                <Button.Root
                  variant="outlined"
                  intent="gray"
                  size="sm"
                  className="outline-transparent"
                  onClick={() => {
                    setFormData({
                      email: "",
                    });
                  }}
                  ref={closeCreateDialog}
                >
                  <Button.Label>Закрыть</Button.Label>
                </Button.Root>
              </Dialog.Close>
              <Button.Root
                variant="solid"
                intent="primary"
                size="sm"
                type="submit"
                className="outline-transparent"
                onClick={handleSubmit}
              >
                <Button.Label>Подписаться</Button.Label>
              </Button.Root>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function SectionAccount() {
  let text = `## О блоге\nПривет, меня зовут Игорь, мне 20 лет. В этом блоге я буду делиться своими мыслями, идеями и опытом из мира кода. Здесь вы найдете заметки о новых технологиях, лайфхаки по написанию кода и, конечно же, мои размышления о жизни и не только\n## Почему я решил вести этот блог?\nЯ верю, что делиться знаниями и опытом — это отличный способ не только помочь другим, но и самому расти. Надеюсь, что мои записи будут полезны и интересны для вас`;

  return (
    <section className="mx-10 px-8">
      <div className="flex gap-10 mx-auto max-w-7xl">
        <AccountActions className="min-w-48" />

        <Card
          variant="outlined"
          gradient="true"
          className="relative w-full h-min bg-gray-900 border-gray-800"
        >
          <div className="flex gap-5 items-center mb-4">
            <Title as="h1" size="2xl" weight="bold" className="m-0 ">
              Мой маленький блог
            </Title>
            <Badge size="sm" intent="accent" className="h-fit mt-1">
              Разное
            </Badge>
          </div>
          {parseMarkdownText({ text: text, className: "space-y-3" })}
          <AccountPopover />
        </Card>
      </div>
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
